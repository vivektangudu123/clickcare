import { Navigate } from "react-router-dom";
export const get_all_records = async () => {
    try {
        const token = localStorage.getItem('JWT');
        const response = await fetch("http://localhost:5001" + '/records/all', {
            
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
export const get_all_records_doctor = async () => {
    try {
        const token = localStorage.getItem('JWT');
        const response = await fetch("http://localhost:5001" + '/records/all_doctor', {
            
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
export const uploadReport = async (selectedFile, description) => {
    try {
        const token = localStorage.getItem('JWT');
        const formData = new FormData();
        formData.append('file', selectedFile); 
        formData.append('description', description); 
        console.log("injd")
        const response = await fetch("http://localhost:5001" + '/records/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData 
        });
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
