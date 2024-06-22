package com.example.clickcarebackend.Patient;


import jakarta.persistence.*;


@Entity
@Table(name = "patients")
public class Patient {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(name = "patient_id", unique = true, nullable = false)
        private String patientId;

        @Column(name = "patientName", nullable = false)
        private String patientName;

        @Column(name = "email", unique = true, nullable = false)
        private String email;

        @Column(name = "gender", nullable = false)
        private String gender;

        @Column(name = "blood_group", nullable = false)
        private String bloodGroup;

        @Column(name = "dob", nullable = false)
        private String dateOfBirth;

        @Column(name = "phone_number", unique = true, nullable = false, length = 10)
        private String phoneNumber;

        @Column(name = "status", nullable = false)
        private String status;

        // Setters and Getters
        public String getstatus() {
                return status;
        }
        public void setstatus(String  status) {
                this.status=status;
        }
        public String getPatientId() {
                return patientId;
        }

        public void setPatientId(String patientId) {
                this.patientId = patientId;
        }

        public String getPatientName() {
                return patientName;
        }

        public void setPatientName(String patientName) {
                this.patientName = patientName;
        }

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public String getGender() {
                return gender;
        }

        public void setGender(String gender) {
                this.gender = gender;
        }

        public String getBloodGroup() {
                return bloodGroup;
        }

        public void setBloodGroup(String bloodGroup) {
                this.bloodGroup = bloodGroup;
        }

        public String getDateOfBirth() {
                return dateOfBirth;
        }

        public void setDateOfBirth(String dateOfBirth) {
                this.dateOfBirth = dateOfBirth;
        }

        public String getPhoneNumber() {
                return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
                this.phoneNumber = phoneNumber;
        }
}