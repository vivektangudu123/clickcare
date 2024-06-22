import React, { useState } from "react";
import PatientIcon from "../assets/PatientIcon.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Login_OTP, Login_Patient } from "../apicalls/patient";
import { verify_jwt } from "../apicalls/axiosInstance";
import { useEffect } from 'react';
function DoctorLogin() {
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
    
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [mobileNumberOtpSent, setMobileNumberOtpSent] = useState(false);
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleMobileNumberSubmit = async (e) => {
        e.preventDefault();
        if (mobileNumber.length < 10) {
            alert("Enter a valid mobile number to login");
            return;
        }
        // Send OTP logic here
        console.log("OTP sent for mobile number:", mobileNumber);

        try {
            const response = await Login_Patient(mobileNumber, "doctor");
            console.log(response)
            if (response == "pending") {
                setMobileNumberOtpSent(true);
            } else if (response === "User Not Found") {
                alert("User Not Found")
            }
            else {
                alert("Error!!, Please Try again")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        if (otp.length < 6) {
            alert("Enter a six digit OTP to login");
            return;
        }
        try {
            const response = await Login_OTP(mobileNumber, otp);

            // console.log(response);
            if (response === "approved") {
                // console.log("here")
                setLoginSuccessful(true);
                navigate("/Home");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div>
            <div style={{ width: "100%" }}>
                <img src={PatientIcon} className="img-fluid" alt="Clik Care Logo" />
            </div>
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                style={{ height: "75vh" }}
            >
                <div className="center-container">
                    <div className="card-body mb-3 g-30" style={{ width: "25rem" }}>
                        <h1 className="card-title mb-5 g-10 text-center">
                            Doctor Login
                        </h1>
                        {mobileNumberOtpSent ? (
                            <form onSubmit={handleOTPSubmit}>
                                <div className="mb-5 g-10">
                                    <label htmlFor="OTP" className="form-label required">
                                        <span className="form-label-heading">Enter OTP</span>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        style={{ height: "50px" }}
                                        type="text"
                                        className="form-control"
                                        id="InputOTP"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        minLength="6"
                                        maxLength="6"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mb-3 g-10 btn btn-primary btn-lg d-block mx-auto rounded-pill"
                                    style={{ width: "90%" }}
                                >
                                    Verify OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleMobileNumberSubmit}>
                                <div className="mb-5 g-10">
                                    <label htmlFor="MobileNumber" className="form-label required">
                                        <span className="form-label-heading">Mobile Number</span>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        style={{ height: "50px" }}
                                        type="tel"
                                        className="form-control"
                                        id="InputMobileNumber"
                                        placeholder="Enter your Mobile Number"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        required
                                        minLength="10"
                                        maxLength="10"
                                        onInput={(e) => {
                                            const inputValue = e.target.value;
                                            const numericValue = inputValue.replace(/\D/g, "");
                                            e.target.value = numericValue;
                                            setMobileNumber(numericValue);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mb-3 g-10 btn btn-primary btn-lg d-block mx-auto rounded-pill"
                                    style={{ width: "90%" }}
                                >
                                    Send OTP
                                </button>
                                <p className="card-text mb-3 g-10 text-center">
                                    Don't have an account?{" "}
                                    <Link to="/doctorRegister" className="card-link">
                                        {" "}
                                        Create account{" "}
                                    </Link>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorLogin;
