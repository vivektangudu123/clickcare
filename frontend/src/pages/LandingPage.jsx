import React from "react";
import TitleLogo from "../assets/DoctorIcon.svg";
import DoctorLogo from "../assets/DoctorLogo.svg";
import PatientLogo from "../assets/PatientLogo.svg";
import { Link } from "react-router-dom";
import { verify_jwt } from "../apicalls/axiosInstance";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      console.log("Found a JWT token");
      const response = verify_jwt(token);

      if (response != "1" && response != "2") {
        navigate("/Home");
      }
    }
  }, []);
   
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <img src={TitleLogo} className="img-fluid mb-4" alt="Clik Care Logo" />
      <h2 className="mb-4">Login as</h2>
      <div className="row">
        <div className="col text-center">
          <button style={{ padding: "0", borderWidth: "0", background: "none" }}>
            <Link to="/doctorlogin">
                <img src={DoctorLogo} className="img-fluid" alt="Doctor Logo" />
            </Link>
          </button>
        </div>
        <div className="col text-center">
          <Link to="/patientLogin">
            <button style={{ padding: "0", borderWidth: "0", background: "none" }}>
              <img src={PatientLogo} className="img-fluid" alt="Patient Logo" />
            </button>
          </Link>
        </div>
      </div>
      <p className="card-text mb-3 g-10 text-center mt-5"> {/* Added mt-5 class for margin-top */}
        Don't have an account?{" "}
      </p>
      <div style={{display:'flex'}}>
        <Link style={{marginRight:'20px'}}to="/doctorRegister" className="card-link">
          <span>Register as Doctor</span>
        </Link>
        <Link to="/patientRegister" className="card-link">
        <span>Register as Patient</span>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
