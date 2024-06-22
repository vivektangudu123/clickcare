// import React, { useEffect, useState } from 'react';
// import { useLocation,useNavigate } from 'react-router-dom';
// import { cancel_appointment, get_queue_number } from '../apicalls/doctor';
// import * as AgoraRTM from "../agora-rtm-sdk-1.5.1";
// import mic_icon from '../icons/mic.png';
// import cam_icon from '../icons/camera.png';
// import { useSearchParams,createSearchParams } from 'react-router-dom';
// function PatientCall() {
//     const navigator = useNavigate();
//     const location = useLocation();
//     const doctorId = location.state.doctorId;
//     console.log(doctorId)
    
    
//     const Cancelcall = async () => {
//         try {
//             await cancel_appointment(doctorId);
//             navigator("/Home");
//         } catch (error) {
//             console.error('Error cancelling appointment:', error);
//         }
//     };
//     return(
//         <div style={{ marginBottom: '40px' }}>
//             <button style={{ backgroundColor: '#FF686B', color: '#FFF', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }} onClick={Cancelcall}>End Call</button>
//         </div>
//     )
// }
// export default PatientCall;

import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import * as AgoraRTM from "../agora-rtm-sdk-1.5.1";
import '../style/vc.css'
import '../style/PatientCall.css'
import mic_icon from '../style/mic.png'
import cam_icon from '../style/camera.png'
import VideoCall from "../components/Videocall";

function PatientCall() {
    const navigator = useNavigate();
    const location = useLocation();
    const doctorId = location.state.doctorId;
    console.log(doctorId)
    return (
        <div>
            <VideoCall doctorId={doctorId} />
        </div>
    );
}
export default PatientCall;