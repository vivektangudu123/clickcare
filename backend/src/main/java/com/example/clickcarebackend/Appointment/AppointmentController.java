package com.example.clickcarebackend.Appointment;

import com.example.clickcarebackend.Patient.PatientService;
import com.example.clickcarebackend.authentication.AuthenticationController;
import com.example.clickcarebackend.authentication.UniqueIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private PatientService patientService;

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestParam("doctorId") String doctorId,@RequestParam("date") String date,@RequestParam("time") String time,
                                               @RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId = authenticationController.get_username_using_jwt(jwtToken);

        if (patientId.equals("1")) {
            return ResponseEntity.ok().body("1");
        }

        // Create Appointment object
        String dateTimeString = date + " " + time;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(dateTimeString, formatter);
        String formattedDateTimeString = dateTime.format(formatter);
        String appointmentId = UniqueIdGenerator.generateUniqueId(8);
        Appointment appointment = new Appointment(appointmentId,patientId,doctorId,formattedDateTimeString);
        appointmentService.createAppointment(appointment);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAppointmentsByPatientId(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId = authenticationController.get_username_using_jwt(jwtToken);

        if (patientId.equals("1")) {
            return ResponseEntity.ok().body("1");
        }

        if(patientService.ispatientIdExists(patientId)){
            return ResponseEntity.ok().body(appointmentService.getAppointmentsByPatientId(patientId));
        }
        else{
            return ResponseEntity.ok().body(appointmentService.getAppointmentsByDoctorId(patientId));
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctorId(@PathVariable String doctorId) {
        return appointmentService.getAppointmentsByDoctorId(doctorId);
    }

    @PutMapping("/{appointmentId}/setRecord")
    public Appointment setRecord(@PathVariable String appointmentId, @RequestParam String recordId) {
        return appointmentService.setRecord(appointmentId, recordId);
    }

    @PutMapping("/{appointmentId}/setFollowUp")
    public Appointment setFollowUp(@PathVariable String appointmentId, @RequestParam boolean followUp) {
        return appointmentService.setFollowUp(appointmentId, followUp);
    }
}
