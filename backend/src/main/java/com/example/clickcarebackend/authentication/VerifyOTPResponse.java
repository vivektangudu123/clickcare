package com.example.clickcarebackend.authentication;

import com.example.clickcarebackend.Doctor.Doctor;
import com.example.clickcarebackend.Patient.Patient;

import javax.print.Doc;

public class VerifyOTPResponse {
    private String status;
    private String jwtToken;
    private Patient user;
    private Doctor doc;
    private String type;

    // Constructors, getters, and setters
    public VerifyOTPResponse(String status, String jwtToken, Patient user,Doctor doc,String type) {
        this.status = status;
        this.jwtToken = jwtToken;
        this.user = user;
        this.doc=doc;
        this.type=type;
    }

    // Getters and setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }


    public Doctor getDoc() {
        return doc;
    }

    public void setDoc(Doctor user) {
        this.doc = doc;
    }
    public String  getType() {
        return type;
    }

    public void setType(String  user) {
        this.type = user;
    }
}
