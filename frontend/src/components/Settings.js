import React, { useEffect, useState } from 'react';
import { get_all_records, get_all_records_doctor } from '../apicalls/records';
import xmlJs from 'xml-js';
import { get_all_doctors, record_access } from '../apicalls/doctor';
import { useNavigate } from "react-router-dom";
import DoctorListPopup from '../pages/DoctorListPopup';

const Settings = () => {
  const [reports, setReports] = useState([]);
  const [selectedReportIndex, setSelectedReportIndex] = useState(null);
  const [showDoctorList, setDoctorsList] = useState(false);
  const [doctorsList, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('JWT');
        if (!token) {
          navigate("/LandingPage");
          return;
        }

        const response = await (localStorage.getItem("type") === "patient" ? get_all_records() : get_all_records_doctor());
        const json = xmlJs.xml2js(response, { compact: true, spaces: 2 });
        const items = Array.isArray(json.ArrayList.item) ? json.ArrayList.item : [json.ArrayList.item];
        setReports(items);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };
    fetchData();
  }, []);

  const handleReportClick = (index) => {
    setSelectedReportIndex(index);
  };

  const handleRevokeAccessClick = async (index) => {
    try {
      const response = await get_all_doctors();
      const json = xmlJs.xml2js(response, { compact: true, spaces: 2 });
      const items = Array.isArray(json.List.item) ? json.List.item : [json.List.item];
      setDoctors(items);
      setSelectedReportIndex(index);
      setDoctorsList(true);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const handleDoctorSelection = async (doctorIndex) => {
    setDoctorsList(false);
    const response = await record_access(doctorsList[doctorIndex].doctorId._text, reports[selectedReportIndex].recordId._text);
    console.log(response);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontWeight: "600", fontSize: "30px", color: "#333" }}>Settings</h1>
      <div>
        {reports.map((report, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", padding: "15px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: "#333" }}>Report Name: {report.recordId._text}</p>
              <p style={{ marginBottom: '5px', fontSize: '12.5px', color: "#666" }}>Patient ID: {report.patientId._text}</p>
              <p style={{ fontSize: '12.5px', color: "#333" }}>Description: {report.description._text}</p>
            </div>
            <div style={{ display: 'flex' }}>
              <button onClick={() => handleReportClick(index)} style={{ background: "none", borderWidth: "2px", backgroundColor: "#fff", padding: "10px 20px", borderRadius: "30px", fontWeight: "600", fontSize: "14px", borderColor: "#3F38FF", marginRight: "10px", color: "#3F38FF", cursor: "pointer", transition: "background-color 0.3s", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                Delete
              </button>
              <button onClick={() => handleRevokeAccessClick(index)} style={{ background: "none", borderWidth: "2px", backgroundColor: "#fff", padding: "10px 20px", borderRadius: "30px", fontWeight: "600", fontSize: "14px", borderColor: "#3F38FF", marginRight: "10px", color: "#3F38FF", cursor: "pointer", transition: "background-color 0.3s", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                Revoke Access
              </button>
            </div>
          </div>
        ))}
      </div>
      {showDoctorList && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <DoctorListPopup
            doctors={doctorsList}
            onSelectDoctor={handleDoctorSelection}
            onClose={() => setDoctorsList(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Settings;
