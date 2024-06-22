import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cancel_appointment, get_queue_number, update_patient_status } from '../apicalls/doctor';




function WaitingPage() {
    const navigator = useNavigate();
    const [queueCount, setQueueCount] = useState(-1);
    const location = useLocation();
    const doctorId = location.state.doctorId;
    const healthTips = [
        "Stay hydrated by drinking plenty of water.",
        "Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.",
        "Engage in regular physical activity to keep your body strong and fit.",
        "Prioritize sleep by aiming for 7-9 hours of quality rest each night.",
        "Practice mindfulness and stress-reduction techniques such as meditation or yoga.",
        "Maintain good posture to prevent muscle strain and promote spinal health.",
        "Limit processed foods, sugary snacks, and excessive salt intake for better overall health.",
        "Schedule regular check-ups with your healthcare provider for preventive care.",
        "Practice proper hand hygiene by washing your hands frequently, especially before meals.",
        "Protect your skin from the sun's harmful rays by using sunscreen and wearing protective clothing.",
        "Take breaks from screens to reduce eye strain and mental fatigue.",
        "Incorporate relaxation activities into your routine, such as reading or listening to music.",
        "Find enjoyable hobbies or activities to reduce stress and promote mental well-being.",
        "Nurture positive relationships with friends and family for emotional support and social connection.",
        "Listen to your body's signals and seek medical attention if you experience persistent symptoms or discomfort.",
    ];
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        // Fetch queue number initially
        fetchQueueNumber();

        // Fetch queue number periodically (every 5 seconds)
        const intervalId = setInterval(fetchQueueNumber, 5000);

        // Fetch health tip index periodically (every 10 seconds)
        const tipIntervalId = setInterval(() => {
            setCurrentTipIndex(prevIndex => (prevIndex + 1) % healthTips.length);
        }, 10000);

        // Cleanup function to clear the intervals
        return () => {
            clearInterval(intervalId);
            clearInterval(tipIntervalId);
        };
    }, [doctorId]); // Run effect whenever doctorId changes

    async function update_call_status() {
        if (queueCount === 0) {
            await update_patient_status(doctorId);
        }
    }

    useEffect(() => {
        if (queueCount === 0) {
            update_call_status();
            const timer = setTimeout(() => {
                navigator("/PatientCall", { state: { doctorId: doctorId } });
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [queueCount]);


    const fetchQueueNumber = async () => {
        try {
            const xmlString = await get_queue_number(doctorId);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            const integerString = xmlDoc.getElementsByTagName("Integer")[0].textContent;
            const queueNumber = parseInt(integerString, 10);
            setQueueCount(queueNumber);
        } catch (error) {
            console.error('Error fetching queue number:', error);
            // Handle error if needed
        }
    };

    const cancelAppointment = async () => {
        try {
            await cancel_appointment(doctorId);
            navigator("/Home");
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            // Handle error if needed
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '36px', color: '#333' }}>Waiting Room</h1>
                </div>
                <div style={{ marginBottom: '40px' }}>
                    <h1>{queueCount}</h1>
                    <p> People ahead of you </p>
                </div>
                <div style={{ marginTop: '40px', marginBottom: '60px'}}>
                    <h2 style={{ fontSize: '24px', color: '#333' }}>Health Tips</h2>
                    <p style={{ fontSize: '18px', color: '#666' }}>{healthTips[currentTipIndex]}</p>
                </div>
                <div style={{ marginBottom: '40px' }}>
                    <button style={{ backgroundColor: '#FF686B', color: '#FFF', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }} onClick={cancelAppointment}>Cancel Appointment</button>
                </div>
            </div>
        </div>
    );
}

export default WaitingPage;
