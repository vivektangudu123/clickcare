const baseUrl = process.env.REACT_APP_BASE_URL;

export const get_all_doctors = async () => {


    try {
        const response = await fetch("http://localhost:5001" + '/doctors/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

        if (response.ok) {

            const data = await response.text();
            console.log(data)
            return data
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const set_status = async (value) => {
    const token = localStorage.getItem('JWT');
    const formData = new FormData();
    formData.append('status',value); 
    try {
        const response = await fetch("http://localhost:5001" + '/doctors/set_status', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {

            const data = await response.text();
            console.log(data)
            return data
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const get_queue_number = async (doctorId) => {
    const token = localStorage.getItem('JWT');
    const formData = new FormData();
    console.log(doctorId)
    formData.append('doctorId',doctorId); 
    try {
        const response = await fetch("http://localhost:5001" + '/doctors/get_queue_number', {
            method: 'POST',
            headers: {
                
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorId })
        });

        if (response.ok) {

            const data = await response.text();
            console.log(data)
            return data
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const get_online_doct = async () => {
    const token = localStorage.getItem('JWT');
    try {
        const response = await fetch("http://localhost:5001" + '/doctors/get_online_doc', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
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
export const record_access = async (doctorId,recordId) => {
    const formData = new FormData();
    formData.append('doctorId', doctorId); 
    formData.append('recordId', recordId); 

    try {
        const response = await fetch("http://localhost:5001" + '/doctors/record_access', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: formData
        });

        if (response.ok) {

            const data = await response.text();
            console.log(data)
            return data
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const send_patient_id = async (doctorId) => {
    const token = localStorage.getItem('JWT');

    try {
        const response = await fetch("http://localhost:5001/doctors/set_queue_status", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' ,// Set content type to JSON
            },
            body: JSON.stringify({ doctorId }) // Send doctorId as JSON
        });

        if (response.ok) {
            const data = await response.text(); // Parse response as JSON
            console.log(data);
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


export const cancel_appointment =  async(doctorId)=>{
    const token = localStorage.getItem('JWT');
    const formData = new FormData();
    formData.append('doctorId', doctorId);
    try {
        const response = await fetch("http://localhost:5001" + '/doctors/update_queue_status', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorId })
        });

        if (response.ok) {

            const data = await response.text();
            console.log(data)
            return data
        } else {
            console.log("Request failed with status:", response.status);
            return "error";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const update_patient_status = async (doctorId) => {
    const token = localStorage.getItem('JWT');

    try {
        const response = await fetch("http://localhost:5001/doctors/set_patient_onlinestatus", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' ,// Set content type to JSON
            },
            body: JSON.stringify({ doctorId }) // Send doctorId as JSON
        });

        if (response.ok) {
            const data = await response.text(); // Parse response as JSON
            console.log(data);
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




// export const Login_Patient = async (payload) => {
//     try {
//         console.log(payload)
//         const response = await axiosInstance.post(baseUrl + "/api/users/login", payload);
//         console.log(response)
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };