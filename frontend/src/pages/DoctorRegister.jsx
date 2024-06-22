import React, { useState } from 'react';
// import DoctorIcon from '../assets/DoctorIcon.svg';
import PatientIcon from '../assets/PatientIcon.svg';
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios library
import { useNavigate } from "react-router-dom";
import { verify_jwt } from "../apicalls/axiosInstance";
import { useEffect } from 'react';

function DoctorRegistration() {
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
    const [doctorName, setDoctorName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [experience, setExperience] = useState('');
    const [agreedTerms, setAgreedTerms] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted:', {
            doctorName,
            gender,
            age,
            phoneNumber,
            email,
            specialization,
            experience,
            agreedTerms
        });

        try {
            // Send doctor details to backend server
            const response = await axios.post('http://localhost:5001/doctors/create', {
                'doctorName': doctorName,
                'gender': gender,
                'age': age,
                'phoneNumber': phoneNumber,
                'email': email,
                'specialization': specialization,
                'experience': experience,
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
                navigate("/Home");
                setDoctorName('');
                setGender('');
                setAge('');
                setMobileNumber('');
                setEmail('');
                setSpecialization('');
                setExperience('');
                setAgreedTerms(false);
            }
            else {
                alert(response.data);
            }

        } catch (error) {
            console.error('Error registering doctor:', error);
            alert('Error registering doctor. Please try again later.');
        }
    };

    return (
        <div>
            <div style={{ width: "100%" }}>
                <img src={PatientIcon} className="img-fluid" alt="Doctor Icon" ></img>
            </div>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="center-container">
                    <div className="card-body mb-3 g-30" style={{ width: '30rem' }}>
                        <h1 className="card-title mb-3 g-10 text-center text-primary">Doctor Registration</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 g-10">
                                <label htmlFor="DoctorName" className="form-label required"><span className="form-label-heading">Full Name <span className="text-danger">*</span></span></label>
                                <input type="text" className="form-control" id="InputDoctorName" placeholder="Enter Doctor's Full Name" required onChange={(e) => { setDoctorName(e.target.value); }} />
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
                                        <label htmlFor="Age" className="form-label required"><span className="form-label-heading">Age <span className="text-danger">*</span></span></label>
                                        <input type="number" className="form-control" id="InputAge" placeholder="Enter Doctor's Age" required onChange={(e) => { setAge(e.target.value); }} />
                                    </div>
                                </div>
                            </div>


                            <div className="mb-3 g-10">
                                <label htmlFor="MobileNumber" className="form-label required"><span className="form-label-heading">Mobile Number <span className="text-danger">*</span></span></label>
                                <input type="tel" pattern="[0-9]{10}" inputMode="numeric" className="form-control" id="InputMobileNumber" placeholder="Enter Doctor's Mobile Number" required minLength="10" maxLength="10" onInput={(e) => { const inputValue = e.target.value; const numericValue = inputValue.replace(/\D/g, ''); e.target.value = numericValue; setMobileNumber(numericValue); }} onChange={(e) => { setMobileNumber(e.target.value); }} />
                            </div>

                            <div className="mb-3 g-10">
                                <label htmlFor="Email" className="form-label required"><span className="form-label-heading">Email <span className="text-danger">*</span></span></label>
                                <input type="email" className="form-control" id="InputEmail" placeholder="Enter Doctor's Email" required onChange={(e) => { setEmail(e.target.value); }} />
                            </div>

                            <div className="mb-3 g-10">
                                <label htmlFor="Specialization" className="form-label required"><span className="form-label-heading">Specialization <span className="text-danger">*</span></span></label>
                                <input type="text" className="form-control" id="InputSpecialization" placeholder="Enter Doctor's Specialization" required onChange={(e) => { setSpecialization(e.target.value); }} />
                            </div>

                            <div className="mb-3 g-10">
                                <label htmlFor="Experience" className="form-label required"><span className="form-label-heading">Experience <span className="text-danger">*</span></span></label>
                                <input type="number" className="form-control" id="InputExperience" placeholder="Enter Doctor's Experience (in years)" required onChange={(e) => { setExperience(e.target.value); }} />
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

export default DoctorRegistration;
