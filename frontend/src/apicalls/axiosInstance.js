// import axios from 'axios';

// export const axiosInstance = axios.create({
//     headers: {
//         authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
// });

export const verify_jwt = async (token) => {

    await fetch("http://localhost:5001" + '/api/auth/jwt', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(token)
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if (data === "1")
            {
                return "1";
            } else if (
                data==="2"
            )
            {
                return "2";
            }
            else 
                return "0"
        })
        .catch(error => {
            console.log(error)
        });
};