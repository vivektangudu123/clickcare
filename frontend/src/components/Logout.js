import React from "react";
import { Link } from "react-router-dom";
import { verify_jwt } from "../apicalls/axiosInstance";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { set_status } from "../apicalls/doctor";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
      const response = set_status("false")
      localStorage.clear();
      navigate('/LandingPage');
  };

  const handleNo = () => {
      navigate('/home');
      window.location.reload(); // Refresh the page
  };

  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '60px', color: '#007bff' }}>Are you sure you want to logout?</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <button style={{ flex: '1', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }} onClick={handleLogout}>Yes</button>
                  <button style={{ flex: '1', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }} onClick={handleNo}>No</button>
              </div>
          </div>
      </div>
  );
}

export default Logout;