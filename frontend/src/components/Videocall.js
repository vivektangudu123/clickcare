import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';
import { cancel_appointment } from '../apicalls/doctor';
import * as AgoraRTM from "../agora-rtm-sdk-1.5.1";
import cam_icon from "./icons/camera.png";
import mic_icon from "./icons/mic.png";
import leave_btn from "./icons/leave_btn.png"


const VideoCall = ({ doctorId }) => {
    const nav = useNavigate();
    const[searchParams] = useSearchParams();
    const [isRightSideBarOpen, setisRightSideBarOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    let APP_ID = "a3b2ccd686724dfb864c68e3c95ec1f7";
    let uid = String(Math.floor(Math.random() * 10000));
    let token = null;

    
    let client = useRef(null);
    let channel = useRef(null);

    let roomId = doctorId;
    console.log("Roomid")

    let localStream = useRef(null);
    let remoteStream;
    let peerConnection;

    const servers = {
        // iceServers:[
        //     {
        //         urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        //     }
        iceServers: [{
            urls: [ "stun:bn-turn1.xirsys.com" ]
         }, {
            username: "Yh4cKgXCeYNDluHkIMBH4uuYnaAlW0a_rGXKLNjDPuAoG1u_rSWbtjvxge8eN7sFAAAAAGQlFXJTcmluaXZhcw==",
            credential: "9ca7f90c-ceb6-11ed-8e86-0242ac140004",
            urls: [
                "turn:bn-turn1.xirsys.com:80?transport=udp",
                "turn:bn-turn1.xirsys.com:3478?transport=udp",
                "turn:bn-turn1.xirsys.com:80?transport=tcp",
                "turn:bn-turn1.xirsys.com:3478?transport=tcp",
                "turns:bn-turn1.xirsys.com:443?transport=tcp",
                "turns:bn-turn1.xirsys.com:5349?transport=tcp"
            ]
         }]

    }




    let constraints = {
        video:{
            width:{min:640, ideal:1920, max:1920},
            height:{min:480, ideal:1080, max:1080},
        },
        audio:true
    }

    let init = async () => {
        console.log('Started !');
        client.current = await AgoraRTM.createInstance(APP_ID)
        console.log("Agora RTM instance created successfully... ")
    
        await client.current.login({uid, token})
        console.log("Client Login successfully... ")
        
        channel.current = client.current.createChannel(roomId)
        console.log("Channel created successfully... ")
        
        await channel.current.join().then(() => {
            console.log('Joined channel', roomId);
        }).catch((err) => {
            console.log(`Error logging in to Agora RTM: ${err}`);
        });

        channel.current.on('MemberJoined', handleUserJoined)
        channel.current.on('MemberLeft', handleUserLeft)

        client.current.on('MessageFromPeer', handleMessageFromPeer)

        localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        document.getElementById('user-1').srcObject = localStream.current
        // createOffer()
    }

    let handleUserLeft = (MemberId) => {
        document.getElementById('user-2').style.display = 'none'
        document.getElementById('user-1').classList.remove('smallFrame')
        handleLeaveCall();
    }
    

    let handleMessageFromPeer = async (message, MemberId) => {

        message = JSON.parse(message.text)

        if(message.type === 'offer'){
            createAnswer(MemberId, message.offer)
        }

        if(message.type === 'answer'){
            addAnswer(message.answer)
        }

        if(message.type === 'candidate'){
            if(peerConnection){
                peerConnection.addIceCandidate(message.candidate)
                console.log("candidate: ",message.candidate)

            }
        }

        if(message.type === 'leave'){
            handleLeaveCall();
        }

    }

    let handleUserJoined = async (MemberId) => {
        console.log('A new user joined the channel:', MemberId)
        createOffer(MemberId)
    }
    
    let createPeerConnection = async (MemberId) => {
        peerConnection = new RTCPeerConnection(servers)

        remoteStream = new MediaStream()
        document.getElementById('user-2').srcObject = remoteStream
        document.getElementById('user-2').style.display = 'block'

        document.getElementById('user-1').classList.add('smallFrame')


        if(!localStream.current){
            localStream.current = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
            document.getElementById('user-1').srcObject = localStream.current
        }

        localStream.current.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream.current)
        })

        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track)
            })
        }

        peerConnection.onicecandidate = async (event) => {
            if(event.candidate){
                client.current.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
            }
        }
    }
    
    

    let createOffer = async (MemberId) => {
        await createPeerConnection(MemberId)
    
        let offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
    
        client.current.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId)
    }
    
    let createAnswer = async (MemberId, offer) => {
        await createPeerConnection(MemberId)
    
        await peerConnection.setRemoteDescription(offer)
    
        let answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

        console.log("answer, ",answer," offer: ",offer)
    
        client.current.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId)
    }
    
    
    let addAnswer = async (answer) => {
        if(!peerConnection.currentRemoteDescription){
            peerConnection.setRemoteDescription(answer)
        }
    }

    let leaveChannel = async () => {
        await channel.current.leave()
        await client.current.logout()
    }
    
        
    let toggleCamera = async () => {
        let videoTrack = localStream.current.getTracks().find(track => track.kind === 'video')

        if(videoTrack.enabled){
            videoTrack.enabled = false
            document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
        }else{
            videoTrack.enabled = true
            document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
        }
    }
        
    let toggleMic = async () => {
        let audioTrack = localStream.current.getTracks().find(track => track.kind === 'audio')

        if(audioTrack.enabled){
            audioTrack.enabled = false
            document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
        }else{
            audioTrack.enabled = true
            document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
        }
    }
          
    window.addEventListener('beforeunload', leaveChannel)

    const handleLeaveCall = async(e) => {
        await cancel_appointment(doctorId);
        await leaveChannel();

        nav('/Home');
        window.location.reload();
    }

    // useEffect(() => {
    //     init().then(()=>{
    //         console.log(localStream)
    //     });
    // },[]);
    
    init()

    return (
        <div className="video-call-pg">
            <div id="videos" style={{ height: '100vh' }}>
                <video className="video-player" id="user-1" autoPlay playsInline></video>
                <video className="video-player" id="user-2" autoPlay playsInline></video>
            </div>
            <div id="controls">
            <div onClick={handleLeaveCall} className="control-container" id="leave-btn">
                <img src={leave_btn} />
            </div>

            <div onClick={toggleCamera} className="control-container" id="camera-btn">
                <img src={cam_icon} />
            </div>
            
            <div onClick={toggleMic} className="control-container" id="mic-btn">
                <img src={mic_icon}/>
            </div>

            </div>
            
        </div>
    );
}

export default VideoCall;
