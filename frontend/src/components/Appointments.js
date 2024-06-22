
import React, { useEffect, useState } from 'react';
import { get_all_doctors } from '../apicalls/doctor';
import document from "../assets/Document.svg";
import view from "../assets/View.svg"
import xmlJs from 'xml-js'
import { useNavigate } from "react-router-dom";
import { get_all_appointments } from '../apicalls/appointment';
import { verify_jwt } from "../apicalls/axiosInstance";
const Appointment = () => {
  const [appointment_list, setappointment_list] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem('JWT');
        if (token) {
          console.log("Found a JWT token");
          const respon = verify_jwt(token);
    
          if (respon === "1" || respon === "2") {
            navigator("/LandingPage")
            return 
          }
        } else {
          navigator("/LandingPage")
          return
        }
        const response = await get_all_appointments();
        console.log(response)
        if (response === "1") {
          console.log(response)
          localStorage.removeItem("JWT")
          navigator("/Landingpage");
          return 
        }
        const json = xmlJs.xml2js(response, { compact: true, spaces: 2 });
        let items = [];

        if (json.ArrayList && json.ArrayList.item) {
          if (Array.isArray(json.ArrayList.item)) {
            items = json.ArrayList.item;
          } else {
            items = [json.ArrayList.item];
          }
        }
        setappointment_list(items);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };
    fetchData();
  }, []);

  // const handleReportClick = (index) => {
  //   setSelectedDoctorIndex(index);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleTimeChange = (time) => {
  //   setAppointmentTime(time);
  // };

  // const handleBookAppointment = async () => {
  //   console.log("Doctor ID:", appointment_list[selectedDoctorIndex].doctorId._text);
  //   console.log("Appointment Date:", selectedDate);
  //   console.log("Appointment Time:", appointmentTime);
  //   if (selectedDate && appointmentTime) {

  //     const appointmentDateTime = new Date(`${selectedDate}T${appointmentTime}`);
  //     try {

  //         const response = await AddAppointment(appointment_list[selectedDoctorIndex].doctorId._text, appointmentDateTime); 
  //         console.log('Appointment response:', response);
  //     } catch (error) {
  //         console.error('Error making appointment:', error);
  //     }
  // } else {
  //     console.error("Please select a date and time for the appointment.");
  // }
  // };

  return (
    <div>
      <div style={{ paddingTop: "20px", marginLeft: "25px", fontWeight: "600", fontSize: "30px" }}>Appointment</div>
      {appointment_list.map((doctor, index) => (
        <div key={index} className='ReportItem' style={{ display: 'flex', alignItems: 'center', padding: '10px', marginLeft: "25px", border: "10px", backgroundColor: "white", marginTop: "30px", marginRight: "25px" }}>
          <div>
            <img src={document} alt="Document" style={{ alignSelf: 'flex-start', height: 'auto', borderRadius: '5px', marginLeft: '5px', marginRight: '10px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ marginBottom: '10px' }}>
            <p style={{ marginBottom: '3px', fontWeight: 'bold' }}>Doctorid: {doctor.doctorId._text}</p>
              <p style={{ marginBottom: '3px', fontWeight: 'bold' }}>startTime: {doctor.startTime._text}</p>
              {/* <p style={{ fontWeight: 'bold' }}>durationMinutes: {doctor.durationMinutes}</p> */}
            </div>
          </div>
          {/* <div style={{ display: 'flex' }}>
            <button onClick={() => handleReportClick(index)} style={{ borderWidth: "2px", backgroundColor: "#FFFFFF", padding: "15px", borderRadius: "30px", fontWeight: "600", fontSize: "14px", borderColor: "#3F38FF", marginRight: "20px", color: "#3F38FF", display: "flex" }}><img src={view} style={{ marginRight: "4px" }} alt="View" /><span style={{ paddingTop: "5px" }}>Get an Appointment</span></button>
          </div> */}
        </div>
      ))}
    </div>
  );
};




export default Appointment
