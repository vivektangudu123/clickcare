package com.example.clickcarebackend.Doctor;

import com.example.clickcarebackend.Patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, String> {
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmail(String email);
    Doctor findByPhoneNumber(String phoneNumber);
    Doctor findByDoctorId(String doctorId);

}
