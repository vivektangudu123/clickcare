package com.example.clickcarebackend.Appointment;

import jakarta.persistence.*;


@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String appointmentId;

    @Column(name = "patientId", nullable = false)
    private String patientId;

    @Column(name = "doctorId", nullable = false)
    private String doctorId;

    @Column(name = "startTime", nullable = false)
    private String startTime;

    @Column(name = "durationMinutes")
    private int durationMinutes;
    @Column(name = "followUp")
    private boolean followUp = false;

    @Column(name = "recordId")
    private String recordId;

    public Appointment(String appointmentId, String patientId, String doctorId, String startTime) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.startTime = startTime;
    }
    public Appointment() {
    }
    // Setters and Getters
    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public boolean isFollowUp() {
        return followUp;
    }

    public void setFollowUp(boolean followUp) {
        this.followUp = followUp;
    }

    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }
}
