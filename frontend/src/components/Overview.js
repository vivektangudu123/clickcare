import React, { useEffect, useState } from 'react';
import { get_all_doctors,set_status, send_patient_id } from '../apicalls/doctor';
import document from "../assets/Document.svg";
import view from "../assets/View.svg"
import xmlJs from 'xml-js'
import { AddAppointment } from '../apicalls/appointment';
import { verify_jwt } from "../apicalls/axiosInstance";
import { useNavigate } from "react-router-dom";
import ToggleButton from 'react-toggle-button'
const HashMap = require('hashmap');



const Overview = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const type = localStorage.getItem("type")
  const patientName = localStorage.getItem("name")
  console.log(patientName);
  const navigator = useNavigate();
  const Id=localStorage.getItem("Id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('JWT');
        const temp = localStorage.getItem("status");
        if (temp === "true") {
          setOnlineStatus(true);
        }
        else {
          setOnlineStatus(false);
        }
        if (token) {
          console.log("Found a JWT token");
          console.log(token)
          const respon = verify_jwt(token);
          console.log(respon)
          if (respon === "1" || respon === "2") {
            navigator("/LandingPage")
            return;
          }
        } else {
          navigator("/LandingPage")
          return;
        }
        const response = await get_all_doctors();
        let regex = /<item>(.*?)<\/item>/g;
        let arrayResult = [];
        
        let hashMap = new HashMap();
        for (let i = 0; i < arrayResult.length; i++) {
          hashMap.set(arrayResult[i], true);
      }
        if (response === "1") {
          localStorage.removeItem("JWT")
         
          return
        }
        const json = xmlJs.xml2js(response, { compact: true, spaces: 2 });
        let items = [];
  
        if (json.List && json.List.item) {
          if (Array.isArray(json.List.item)) {
            items = json.List.item;
          } else {
            items = [json.List.item];
          }
        }
        setDoctorsList(items);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  // const handleReportClick = async(index) => {
  //   setSelectedDoctorIndex(index);
  //   const response= send_patient_id(doctorsList[index].doctorId._text);
  //   navigator("/WaitingPage")
    
  // };
  const handleReportClick = async(index) => {
    setSelectedDoctorIndex(index);
    const doctorId = doctorsList[index].doctorId._text;
    await send_patient_id(doctorId); // Wait for send_patient_id to complete
    navigator("/WaitingPage", { state: { doctorId: doctorId } });
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setAppointmentTime(time);
  };
  const handleOnlineStatusChange = (value) => {
    setOnlineStatus(value);
    if (value === false) {
      setOnlineStatus(true)
      localStorage.setItem("status", true);
      const response = set_status("true")
      console.log(response)
    } else {
      setOnlineStatus(false)
      localStorage.setItem("status", false);
      const response = set_status("false")
      console.log(response)
    }
  };
  
  const handleBookAppointment = async () => {
    console.log("Doctor ID:", doctorsList[selectedDoctorIndex].doctorId._text);
    console.log("Appointment Date:", selectedDate);
    console.log("Appointment Time:", appointmentTime);
    if (selectedDate && appointmentTime) {

      try {

        const response = await AddAppointment(doctorsList[selectedDoctorIndex].doctorId._text, selectedDate, appointmentTime);
        if (response === 1) {
          console.log("moveeeeee")
          navigator("/LandingPage")
          return;
        }
        console.log('Appointment response:', response);
      } catch (error) {
        console.error('Error making appointment:', error);
      }
    } else {
      console.error("Please select a date and time for the appointment.");
    }
  };

  const ConsultPatients = async () => {
    navigator("/PatientCall", { state: { doctorId: Id } });
  }





  if (localStorage.getItem("type") === "patient") {
    return (
      <div>
        <div style={{ paddingTop: "20px", marginLeft: "25px", fontWeight: "600", fontSize: "30px", color: "#333" }}>Welcome {patientName}!</div>
        {doctorsList.map((doctor, index) => {
          const statusColor = doctor.status._text === "Online" ? "#0a0" : "#f00";
          
          return (
            <div key={index} className='report-item' style={{paddingTop:'3px', display: 'flex', alignItems: 'center', marginLeft: "25px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#fff", marginTop: "30px", marginRight: "25px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
              <div>
                <img src={document} alt="Document" style={{ height: '70px', borderRadius: '5px', marginRight: '20px', paddingLeft: '15px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <p style={{ marginBottom: '1px', marginTop: '8px', fontWeight: 'bold', fontSize: '14px', color: "#333" }}>Doctor: {doctor.doctorName._text}</p>
                  <p style={{ marginBottom: '1px', fontSize: '12.5px', color: "#666" }}>Specialization: {doctor.specialization._text}</p>
                  <p style={{ marginBottom: '3px', fontSize: '12.5px', color: "#666" }}>Experience: {doctor.experience._text}</p>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: statusColor }}>{doctor.status._text}</p>
                </div>
              </div>
              <div>
                {doctor.status._text === "Online" && (
                  <button onClick={() => handleReportClick(index)} style={{ marginRight:'20px', backgroundColor: "#3F38FF", color: "#fff", padding: "15px 25px", borderRadius: "20px", border: "none", cursor: "pointer", position: "relative", right: "20px", transition: "background-color 0.3s", zIndex: "1", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                    Consult Doctor
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {/* Appointment popup */}
        {selectedDoctorIndex !== null && (
          <div className="appointment-popup" style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="date" style={{ color: "#333", marginRight: "10px" }}>Select Date:</label>
              <input type="date" id="date" onChange={(e) => handleDateChange(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
            </div>
            {selectedDate && (
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="time" style={{ color: "#333", marginRight: "10px" }}>Select Time:</label>
                <select id="time" onChange={(e) => handleTimeChange(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                </select>
              </div>
            )}
            <button onClick={handleBookAppointment} style={{ backgroundColor: "#3F38FF", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Book Appointment
            </button>
          </div>
        )}
      </div>
    );
    
    
    
  } else if (localStorage.getItem("type") === "doctor") {
    return (       
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <ToggleButton
        value={onlineStatus}
        onToggle={(value) => handleOnlineStatusChange(value)}
      />
      <p>{onlineStatus ? "Online" : "Offline"}</p>

      <button onClick={ConsultPatients} style={{ backgroundColor: "#3F38FF", color: "#fff", margin : "20px 20px ", padding: "10px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Start Consulting
      </button>

    </div>
    )
  }
}

export default Overview;
