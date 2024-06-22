import { axiosInstance } from "./axiosInstance";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const Login_Patient = async (mobile_number,type) => {

    const send_otp_body = {
        'mobile_number': mobile_number,
        "type":type
    }
    try {
        const response = await fetch("http://localhost:5001" + '/api/auth/send_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(send_otp_body)
        });

        if (response.ok) {

            const data = await response.text();
            // console.log(data)
            if (data === "pending") {
                return "pending";
            }
            else {
                return data;
            }
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const Login_OTP = async (mobile_number, otp) => {
    console.log(mobile_number);
    console.log(otp);

    const verify_otp_body = {
        'mobile_number': mobile_number,
        'otp': otp
    };

    try {
        const response = await fetch("http://localhost:5001/api/auth/verify_otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(verify_otp_body)
        });

        if (response.ok) {
            const data = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');

            const jwtToken = xmlDoc.querySelector('jwtToken')?.textContent || '';
            const userType = xmlDoc.querySelector('userType')?.textContent || '';
            const statuss = xmlDoc.querySelector('statuss')?.textContent || '';

            let user = null;
            const userNode = xmlDoc.querySelector('user');
            if (userType === "patient") {
                user = userNode ? {
                    patientId: userNode.querySelector('patientId')?.textContent || '',
                    name: userNode.querySelector('patientName')?.textContent || '',
                    email: userNode.querySelector('email')?.textContent || '',
                    gender: userNode.querySelector('gender')?.textContent || '',
                    bloodGroup: userNode.querySelector('bloodGroup')?.textContent || '',
                    dateOfBirth: userNode.querySelector('dateOfBirth')?.textContent || '',
                    phoneNumber: userNode.querySelector('phoneNumber')?.textContent || '',
                    // status: userNode.querySelector('status')?.textContent || ''
                } : {};
            }
            if (userType === "doctor") {
                user = userNode ? {
                    patientId: userNode.querySelector('doctorId')?.textContent || '',
                    name: userNode.querySelector('doctorName')?.textContent || '',
                    email: userNode.querySelector('email')?.textContent || '',
                    gender: userNode.querySelector('gender')?.textContent || '',
                    phoneNumber: userNode.querySelector('phoneNumber')?.textContent || '',
                    // status: userNode.querySelector('status')?.textContent || ''
                } : {};
            }
            localStorage.setItem("Id", user.patientId);
            localStorage.setItem('JWT', jwtToken);
            localStorage.setItem("type", userType);
            localStorage.setItem("name",user.name)
            if (statuss === "approved") {
                return "approved";
            } else {
                return "invalid";
            }
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};