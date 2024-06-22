// import React, { useState } from 'react';
// import PatientIcon from '../assets/PatientIcon.svg';
// import { Link } from "react-router-dom";
// function PatientRegistrationTest() {
//     const [patientName, setPatientName] = useState('');
//     const [dateOfBirth, setDateOfBirth] = useState('');
//     const [gender, setGender] = useState('');
//     const [bloodGroup, setBloodGroup] = useState('');
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [agreedTerms, setAgreedTerms] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         console.log('Form submitted:', {
//             patientName,
//             dateOfBirth,
//             gender,
//             bloodGroup,
//             mobileNumber,
//             email,
//             agreedTerms
//         });
//         alert("Registration is succesfully done!");
//         setPatientName('');
//         setDateOfBirth('');
//         setGender('');
//         setBloodGroup('');
//         setMobileNumber('');
//         setEmail('');
//         setAgreedTerms(false);
//     };
//     const [phonenumberotp, setphonenumberotp] = useState("");
//     const [emailotp, setemailotp] = useState("");
//     const [phonenumberotpSent, setphonenumberotpSent] = useState(false);
//     const [emailotpSent, setemailotpSent] = useState(false);
//     const [isphonenumberverified, setisphonenumberverified] = useState(false);
//     const [isemailverified, setisemailverified] = useState(false);
//     const sendphonenumberotp = () => {
//         if (mobileNumber.length != 10) {
//             alert("Enter a Valid Mobile Number");
//             return;
//         }
//         // Logic to send OTP to the provided phone number
//         setphonenumberotpSent(true);
//     }
//     const verifyphonenumberotp = () => {
//         if (phonenumberotp.length < 6) {
//             alert("Enter a Valid Otp to verify your Mobile Number");
//             return;
//         }
//         // Logic to verify phone number OTP
//         setisphonenumberverified(true);
//         setphonenumberotpSent(false);
//     }
//     const sendemailotp = () => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             alert("Invalid email address. Please enter a valid email address.");
//             return;
//         }

//         // Logic to send OTP to the provided email
//         setemailotpSent(true);
//     }

//     const verifyemailotp = () => {

//         if (emailotp.length < 6) {
//             alert("Enter a Valid OTP to verify your Email address");
//             return;
//         }
//         //logic to verify email by otp
//         setisemailverified(true);
//         setemailotpSent(false);
//     }
//     return (
//         <div>
//             <div style={{ width: "100%" }}>
//                 <img src={PatientIcon} className="img-fluid" alt="Clik Care Logo" ></img>
//             </div>
//             <div className="container-fluid d-flex justify-content-center align-items-center">
//                 <div className="center-container">
//                     <div className="card-body mb-3 g-30" style={{ width: '30rem' }}>
//                         <h1 className="card-title mb-3 g-10 text-center text-primary">Patient Registration</h1>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3 g-10">
//                                 <label htmlFor="PatientName" className="form-label required"><span className="form-label-heading">Full Name <span className="text-danger">*</span></span></label>
//                                 <input type="text" className="form-control" id="InputPatientName" placeholder="Enter your Full Name" required minLength="2" maxLength="20" onChange={(e) => { setPatientName(e.target.value); }} />
//                             </div>

//                             <div className="mb-3 g-10">
//                                 <label htmlFor="DateOfBirth" className="form-label required"><span className="form-label-heading">Date of Birth <span className="text-danger">*</span></span></label>
//                                 <input type="date" className="form-control" id="InputDateOfBirth" placeholder="Select your Date of Birth" required onChange={(e) => { setDateOfBirth(e.target.value); }} />
//                             </div>

//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="mb-3 g-10">
//                                         <label htmlFor="Gender" className="form-label required"><span className="form-label-heading" >Gender <span className="text-danger">*</span></span></label>
//                                         <select className="form-select" data-toggle="dropdown" required id="InputGender" onChange={(e) => { setGender(e.target.value); }}>
//                                             <option value="">Select</option>
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                             <option value="prefer_not_to_say">Prefer not to say</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3 g-10">
//                                         <label htmlFor="BloodGroup" className="form-label required"><span className="form-label-heading">Blood Group <span className="text-danger">*</span></span></label>
//                                         <select className="form-select" data-toggle="dropdown" id="InputBloodGroup" onChange={(e) => { setBloodGroup(e.target.value); }}>
//                                             <option value="">Select</option>
//                                             <option value="A+">A RhD positive (A+)</option>
//                                             <option value="A-">A RhD negative (A-)</option>
//                                             <option value="B+">B RhD positive (B+)</option>
//                                             <option value="B-">B RhD negative (B-)</option>
//                                             <option value="O+">O RhD positive (O+)</option>
//                                             <option value="O-">O RhD negative (O-)</option>
//                                             <option value="AB+">AB RhD positive (AB+)</option>
//                                             <option value="AB-">AB RhD negative (AB-)</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mb-3 g-10">
//                                 <label htmlFor="MobileNumber" className="form-label required"><span className="form-label-heading">Mobile Number <span className="text-danger">*</span></span></label>
//                                 <div class="row">
//                                     <input class="col-md-9" style={{ width: '70%', marginLeft: '2%' }} type="tel" pattern="[0-9]{10}" inputMode="numeric" className="form-control" id="InputMobileNumber" placeholder="Enter your Mobile Number" required minLength="10" maxLength="10" onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setMobileNumber(numericValue); }} onChange={(e) => { setMobileNumber(e.target.value); }} />
//                                     <button className={`col-md-2 offset-md-1 btn ${isphonenumberverified ? "btn-success" : "btn-primary"}`} onClick={isphonenumberverified ? null : sendphonenumberotp}> {isphonenumberverified ? "Verified" : "Verify"} </button>
//                                 </div>

//                                 {phonenumberotpSent &&
//                                     <div className="mb-3 g-10">
//                                         <div className="form-text mb-3 g-10">We have sent 6 digit code to your mobile number.</div>

//                                         <div className="mb-3 g-10">
//                                             <label htmlFor="MobileOtpVerification" className="form-label required"><span className="form-label-heading"> Enter the otp for complete verification<span className="text-danger">*</span></span></label>
//                                             <div class="row">
//                                                 <input onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setMobileNumber(numericValue); }} type="text" class="col-md-9" minLength={6} maxLength={6} style={{ width: '70%', marginLeft: '2%' }} className="form-control" id="InputOTP" placeholder="Enter OTP" required onChange={(e) => { setphonenumberotp(e.target.value) }} />
//                                                 <button className="col-md-2 offset-md-1 btn btn-primary" onClick={verifyphonenumberotp}> Submit </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 }
//                             </div>

//                             <div className="mb-3 g-10">
//                                 <label htmlFor="Email" className="form-label required"><span className="form-label-heading">Email <span className="text-danger">*</span></span></label>
//                                 <div class="row ">
//                                     <input type="email" class="col-md-9" className="form-control" style={{ width: '70%', marginLeft: '2%' }} id="InputEmail" placeholder="Enter your Email" required onChange={(e) => { setEmail(e.target.value); }} />
//                                     <button className={`col-md-2 offset-md-1 btn ${isemailverified ? "btn-success" : "btn-primary"}`} onClick={isemailverified ? null : sendemailotp}> {isemailverified ? "Verified" : "Verify"} </button>
//                                 </div>
//                                 {emailotpSent &&
//                                     <div className="mb-3 g-10">
//                                         <div className="form-text mb-3 g-10">We have sent 6 digit code to your Email.</div>

//                                         <div className="mb-3 g-10">
//                                             <label htmlFor="EmailOtpVerification" className="form-label required"><span className="form-label-heading"> Enter the otp for Email verification<span className="text-danger">*</span></span></label>
//                                             <div class="row">
//                                                 <input onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setMobileNumber(numericValue); }} onChange={(e) => { setemailotp(e.target.value) }} type="text" class="col-md-9" minLength={6} maxLength={6} style={{ width: '70%', marginLeft: '2%' }} className="form-control" id="InputOTP" placeholder="Enter OTP" required />
//                                                 <button className="col-md-2 offset-md-1 btn btn-primary" onClick={verifyemailotp}> Submit </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 }

//                             </div>

//                             <div className="mb-3 g-10 form-check">
//                                 <input type="checkbox" className="form-check-input" id="exampleCheck1" required onChange={(e) => { setAgreedTerms(e.target.checked); }} />
//                                 <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
//                             </div>

//                             <button type="submit" className="mb-3 g-10 btn btn-primary btn-lg d-block mx-auto rounded-pill" style={{ width: '250px' }}> Register </button>

//                             <p className="card-text mb-3 g-10 text-center">Already Registered? <Link to="/" className="card-link"> Login </Link></p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import PatientIcon from '../assets/PatientIcon.svg';
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios library
import { Login_OTP, Login_Patient } from "../apicalls/patient";
import { useNavigate } from "react-router-dom";
import { verify_jwt } from "../apicalls/axiosInstance";
import { useEffect } from 'react';
function PatientRegistration() {
    useEffect(() => {
        const token = localStorage.getItem('JWT');
    
        if (token) {
          console.log("Found a JWT token");
          const response = verify_jwt(token);
    
          if (response !== "1" && response !== "2") {
            navigate("/Home");
          } else {
              navigate("/LandingPage")
          }
        }
    }, []);
    const [patientName, setPatientName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [agreedTerms, setAgreedTerms] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted:', {
            patientName,
            dateOfBirth,
            gender,
            bloodGroup,
            mobileNumber,
            email,
            agreedTerms
        });

        try {
            // if (!isphonenumberverified) {
            //     alert("Please verify Phone number!!");
            //     return;
            // }
            // if (!isemailverified) {
            //     alert("Please verify Email address!!");
            //     return;
            // }

            // Send patient details to backend server
            const response = await axios.post('http://localhost:5001/patients/create', {
                'patientName': patientName,
                'dateOfBirth': dateOfBirth,
                'gender': gender,
                'bloodGroup': bloodGroup,
                'phoneNumber': mobileNumber,
                'email': email,
                'status': "Active"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            console.log('Response from server:', response.data);
            if (response.data === "Success") {
                alert("Registration Done");
                navigate("/home");
                setPatientName('');
                setDateOfBirth('');
                setGender('');
                setBloodGroup('');
                setMobileNumber('');
                setEmail('');
                setAgreedTerms(false);
            }
            else {
                alert(response.data);
            }

        } catch (error) {
            console.error('Error registering patient:', error);
            alert('Error registering patient. Please try again later.');
        }
    };

    const [phonenumberotp, setphonenumberotp] = useState("");
    const [emailotp, setemailotp] = useState("");
    const [phonenumberotpSent, setphonenumberotpSent] = useState(false);
    const [emailotpSent, setemailotpSent] = useState(false);
    const [isphonenumberverified, setisphonenumberverified] = useState(false);
    const [isemailverified, setisemailverified] = useState(true);
    const sendphonenumberotp = () => {
        if (mobileNumber.length !== 10) {
            alert("Enter a Valid Mobile Number");
            return;
        }
        // Logic to send OTP to the provided phone number
        Login_Patient(mobileNumber);
        setphonenumberotpSent(true);
    }
    const verifyphonenumberotp = () => {
        if (phonenumberotp.length < 6) {
            alert("Enter a Valid Otp to verify your Mobile Number");
            return;
        }
        console.log(phonenumberotp)
        const response = Login_OTP(mobileNumber, phonenumberotp);
        if (response === "approved") {
            setisphonenumberverified(true);
            setphonenumberotpSent(false);
            navigate("/Home");
        }

    }
    const sendemailotp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email address. Please enter a valid email address.");
            return;
        }

        // Logic to send OTP to the provided email
        setemailotpSent(true);
    }

    const verifyemailotp = () => {

        if (emailotp.length < 6) {
            alert("Enter a Valid OTP to verify your Email address");
            return;
        }
        //logic to verify email by otp
        setisemailverified(true);
        setemailotpSent(false);
    }
    return (
        <div>
            <div style={{ width: "100%" }}>
                <img src={PatientIcon} className="img-fluid" alt="Clik Care Logo" ></img>
            </div>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="center-container">
                    <div className="card-body mb-3 g-30" style={{ width: '30rem' }}>
                        <h1 className="card-title mb-3 g-10 text-center text-primary">Patient Registration</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 g-10">
                                <label htmlFor="PatientName" className="form-label required"><span className="form-label-heading">Full Name <span className="text-danger">*</span></span></label>
                                <input type="text" className="form-control" id="InputPatientName" placeholder="Enter your Full Name" required minLength="2" maxLength="20" onChange={(e) => { setPatientName(e.target.value); }} />
                            </div>

                            <div className="mb-3 g-10">
                                <label htmlFor="DateOfBirth" className="form-label required"><span className="form-label-heading">Date of Birth <span className="text-danger">*</span></span></label>
                                <input type="date" className="form-control" id="InputDateOfBirth" placeholder="Select your Date of Birth" required onChange={(e) => { setDateOfBirth(e.target.value); }} />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 g-10">
                                        <label htmlFor="Gender" className="form-label required"><span className="form-label-heading" >Gender <span className="text-danger">*</span></span></label>
                                        <select className="form-select" data-toggle="dropdown" required id="InputGender" onChange={(e) => { setGender(e.target.value); }}>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="prefer_not_to_say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 g-10">
                                        <label htmlFor="BloodGroup" className="form-label required"><span className="form-label-heading">Blood Group <span className="text-danger">*</span></span></label>
                                        <select className="form-select" data-toggle="dropdown" id="InputBloodGroup" onChange={(e) => { setBloodGroup(e.target.value); }}>
                                            <option value="">Select</option>
                                            <option value="A+">A RhD positive (A+)</option>
                                            <option value="A-">A RhD negative (A-)</option>
                                            <option value="B+">B RhD positive (B+)</option>
                                            <option value="B-">B RhD negative (B-)</option>
                                            <option value="O+">O RhD positive (O+)</option>
                                            <option value="O-">O RhD negative (O-)</option>
                                            <option value="AB+">AB RhD positive (AB+)</option>
                                            <option value="AB-">AB RhD negative (AB-)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 g-10">
                                <label htmlFor="MobileNumber" className="form-label required"><span className="form-label-heading">Mobile Number <span className="text-danger">*</span></span></label>
                                <div class="row">
                                    <input class="col-md-9" style={{ width: '70%', marginLeft: '2%' }} type="tel" pattern="[0-9]{10}" inputMode="numeric" className="form-control" id="InputMobileNumber" placeholder="Enter your Mobile Number" required minLength="10" maxLength="10" onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setMobileNumber(numericValue); }} onChange={(e) => { setMobileNumber(e.target.value); }} />
                                    <button className={`col-md-2 offset-md-1 btn ${isphonenumberverified ? "btn-success" : "btn-primary"}`} onClick={isphonenumberverified ? null : sendphonenumberotp}> {isphonenumberverified ? "Verified" : "Verify"} </button>
                                </div>

                                {phonenumberotpSent &&
                                    <div className="mb-3 g-10">
                                        <div className="form-text mb-3 g-10">We have sent 6 digit code to your mobile number.</div>

                                        <div className="mb-3 g-10">
                                            <label htmlFor="MobileOtpVerification" className="form-label required"><span className="form-label-heading"> Enter the otp for complete verification<span className="text-danger">*</span></span></label>
                                            <div class="row">
                                                <input onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setphonenumberotp(numericValue); }} type="text" class="col-md-9" minLength={6} maxLength={6} style={{ width: '70%', marginLeft: '2%' }} className="form-control" id="InputOTP" placeholder="Enter OTP" required onChange={(e) => { setphonenumberotp(e.target.value) }} />
                                                <button className="col-md-2 offset-md-1 btn btn-primary" onClick={verifyphonenumberotp}> Submit </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="mb-3 g-10">
                                <label htmlFor="Email" className="form-label required"><span className="form-label-heading">Email <span className="text-danger">*</span></span></label>
                                <div class="row ">
                                    <input type="email" class="col-md-9" className="form-control" style={{ width: '70%', marginLeft: '2%' }} id="InputEmail" placeholder="Enter your Email" required onChange={(e) => { setEmail(e.target.value); }} />
                                    <button className={`col-md-2 offset-md-1 btn ${isemailverified ? "btn-success" : "btn-primary"}`} onClick={isemailverified ? null : sendemailotp}> {isemailverified ? "Verified" : "Verify"} </button>
                                </div>
                                {emailotpSent &&
                                    <div className="mb-3 g-10">
                                        <div className="form-text mb-3 g-10">We have sent 6 digit code to your Email.</div>

                                        <div className="mb-3 g-10">
                                            <label htmlFor="EmailOtpVerification" className="form-label required"><span className="form-label-heading"> Enter the otp for Email verification<span className="text-danger">*</span></span></label>
                                            <div class="row">
                                                <input onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setMobileNumber(numericValue); }} onChange={(e) => { setemailotp(e.target.value) }} type="text" class="col-md-9" minLength={6} maxLength={6} style={{ width: '70%', marginLeft: '2%' }} className="form-control" id="InputOTP" placeholder="Enter OTP" required />
                                                <button className="col-md-2 offset-md-1 btn btn-primary" onClick={verifyemailotp}> Submit </button>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>

                            <div className="mb-3 g-10 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" required onChange={(e) => { setAgreedTerms(e.target.checked); }} />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>

                            <button type="submit" className="mb-3 g-10 btn btn-primary btn-lg d-block mx-auto rounded-pill" style={{ width: '250px' }}> Register </button>

                            <p className="card-text mb-3 g-10 text-center">Already Registered? <Link to="/" className="card-link"> Login </Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientRegistration;