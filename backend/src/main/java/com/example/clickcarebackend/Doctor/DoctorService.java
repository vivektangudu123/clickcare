package com.example.clickcarebackend.Doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.clickcarebackend.Doctor.Doctor;
import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Method to save a doctor
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Method to retrieve all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Method to retrieve a doctor by ID
    public Doctor findByDoctorId(String doctorId) {
        return doctorRepository.findByDoctorId(doctorId);
    }

    // Method to delete a doctor by ID
    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }

    public boolean isMobileNumberExists(String mobileNumber) {
        return doctorRepository.existsByPhoneNumber(mobileNumber);
    }

    public boolean isEmailExists(String email) {
        return doctorRepository.existsByEmail(email);
    }


    public Doctor getDoctorByPhoneNumber(String phoneNumber) {
        return doctorRepository.findByPhoneNumber(phoneNumber);
    }
}
