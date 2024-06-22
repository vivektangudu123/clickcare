package com.example.clickcarebackend.Patient;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    boolean existsByphoneNumber(String phoneNumber);
    boolean existsByemail(String email);
    boolean existsBypatientId(String patientId);
    Patient findByPhoneNumber(String phoneNumber);
    Patient findBypatientId(String patientId);
}