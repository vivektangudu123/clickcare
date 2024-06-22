import axios from "axios";
export const AddAppointment = async (doctorid, startTime,appointment_time) => {
    const token = localStorage.getItem('JWT');
    const formData = new FormData();
    formData.append('doctorId', doctorid); 
    formData.append('date', startTime); 
    formData.append('time', appointment_time); 
    try {
        const response = await fetch('http://localhost:5001/appointments/create', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.text();
            if (data === "1") {
                return 1
            }
            return data;            
        }
        else {
            console.log(response)
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const get_all_appointments = async () => {
    try {
        const token = localStorage.getItem('JWT');
        const response = await fetch("http://localhost:5001/appointments/all", {
            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
        })
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};