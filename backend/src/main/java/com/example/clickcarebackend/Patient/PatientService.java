package com.example.clickcarebackend.Patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Method to save a patient
    public Patient savePatient(Patient patient) {

        return patientRepository.save(patient);
    }

    // Method to retrieve all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Method to retrieve a patient by ID
    public Patient findBy_patientId(String patientId) {
        return patientRepository.findBypatientId(patientId);
    }

    // Method to delete a patient by ID
    public void deletePatient(String id) {

//        String str1 = Integer.toString(id);
//        patientRepository.deleteById(str1);
    }
    public boolean isMobileNumberExists(String mobileNumber) {
        return patientRepository.existsByphoneNumber(mobileNumber);
    }
    public boolean isemailExists(String email) {
        return patientRepository.existsByemail(email);
    }
    public Patient getUserByPhoneNumber(String phoneNumber) {
        return patientRepository.findByPhoneNumber(phoneNumber);
    }

    public boolean ispatientIdExists(String patientId){
        return patientRepository.existsBypatientId(patientId);
    }
}

