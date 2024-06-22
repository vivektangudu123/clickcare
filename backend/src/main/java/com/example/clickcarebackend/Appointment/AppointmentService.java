package com.example.clickcarebackend.Appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctorId(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public Appointment setRecord(String appointmentId, String recordId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            appointment.setRecordId(recordId);
            return appointmentRepository.save(appointment);
        }
        return null; // Or throw an exception if needed
    }

    public Appointment setFollowUp(String appointmentId, boolean followUp) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            appointment.setFollowUp(followUp);
            return appointmentRepository.save(appointment);
        }
        return null; // Or throw an exception if needed
    }
}
