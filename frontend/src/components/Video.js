// // import React from 'react';
// // import { useSpring, animated } from 'react-spring';
// // import { get_all_records } from '../apicalls/records';
// // const HomePage = () => {
// //   // Define animations using useSpring hook
// //   // const response = get_all_records();
// //   console.log(response);
// //   const fadeIn = useSpring({
// //     from: { opacity: 0 },
// //     to: { opacity: 1 },
// //     config: { duration: 1000 }
// //   });

// //   const slideIn = useSpring({
// //     from: { transform: 'translateY(100px)' },
// //     to: { transform: 'translateY(0px)' },
// //     config: { duration: 1000 }
// //   });

// //   return (
// //     <div className="home-page">
// //       <animated.h1 style={fadeIn}>Welcome to records page by patient</animated.h1>
// //     </div>
// //   );
// // }

// // export default HomePage;
import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import "./video.css";

const ConnectionStatus = {
  OFFERING: 0,
  RECEIVING: 1,
  CONNECTED: 2,
};

const webSocketConnection = new WebSocket("ws://localhost:5001/videochat");

export const Video = () => {
  const videoSelf = useRef(null);
  const videoCaller = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [offerSignal, setOfferSignal] = useState();
  const [simplePeer, setSimplePeer] = useState();

  useEffect(() => {
    webSocketConnection.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      if (payload?.type === "offer") {
        setOfferSignal(payload);
        setConnectionStatus(ConnectionStatus.RECEIVING);
      } else if (payload?.type === "answer") simplePeer?.signal(payload);
    };
  }, [simplePeer]);

  const sendOrAcceptInvitation = (isInitiator, offer) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
      const video = videoSelf.current;
      video.srcObject = mediaStream;
      video.play();

      const sp = new SimplePeer({
        trickle: false,
        initiator: isInitiator,
        stream: mediaStream,
      });

      if (isInitiator) setConnectionStatus(ConnectionStatus.OFFERING);
      else offer && sp.signal(offer);

      sp.on("signal", (data) => webSocketConnection.send(JSON.stringify(data)));
      sp.on("connect", () => setConnectionStatus(ConnectionStatus.CONNECTED));
      sp.on("stream", (stream) => {
        const video = videoCaller.current;
        video.srcObject = stream;
        video.play();
      });
      setSimplePeer(sp);
    });
  };

  return (
    <div className="web-rtc-page">
      {connectionStatus === null && <button onClick={() => sendOrAcceptInvitation(true)}>CALL</button>}
      {connectionStatus === ConnectionStatus.OFFERING && <div className="loader"></div>}
      {connectionStatus === ConnectionStatus.RECEIVING && (
        <button onClick={() => sendOrAcceptInvitation(false, offerSignal)}>ANSWER CALL</button>
      )}
      <div className="video-container">
        <video ref={videoSelf} className="video-block" />
        <video ref={videoCaller} className="video-block" />
      </div>
    </div>
  );
};
export default Video;