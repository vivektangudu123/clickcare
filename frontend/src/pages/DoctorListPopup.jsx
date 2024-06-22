import React from 'react';
import './DoctorListPopup.css'; // Import CSS file for styling

const DoctorListPopup = ({ doctors, onSelectDoctor, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="doctor-list-popup">
        <div className="doctor-list">
          {doctors.map((doctor, index) => (
            <button
              key={index}
              className="doctor-button"
              onClick={() => onSelectDoctor(index)}
            >
              <div style={{ marginBottom: '10px' }}>
                <p style={{ marginBottom: '3px', fontWeight: 'bold' }}>Doctor name: {doctor.doctorName._text}</p>
                <p style={{ marginBottom: '3px', fontWeight: 'bold' }}>Specialization: {doctor.specialization._text}</p>
              </div>
            </button>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DoctorListPopup;
