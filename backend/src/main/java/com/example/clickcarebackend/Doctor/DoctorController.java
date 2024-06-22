package com.example.clickcarebackend.Doctor;

import com.example.clickcarebackend.Patient.PatientService;
import com.example.clickcarebackend.authentication.AuthenticationController;
import com.example.clickcarebackend.authentication.UniqueIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private PatientService patientService;

    @Autowired
    private AuthenticationController authenticationController;

    private HashMap<String, Boolean> maap= new HashMap<>();
    private final Map<String, Deque<String>> doctorQueueMap = new HashMap<>();
    private HashMap<String, Boolean> patient_joined= new HashMap<>();

    @PostMapping("/create")
    public String createDoctor(@RequestBody Doctor npr) {
        if(patientService.isMobileNumberExists(npr.getPhoneNumber()) || doctorService.isMobileNumberExists(npr.getPhoneNumber())){
            return "Mobile number already exsists";
        }
        if(patientService.isemailExists(npr.getEmail()) || doctorService.isEmailExists(npr.getEmail()))
        {
            return "email already exsists";
        }
        String uniqueId = UniqueIdGenerator.generateUniqueId(8);
        npr.setDoctorId(uniqueId);
        Doctor a=doctorService.saveDoctor(npr);
        return "Success";
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @PostMapping("/record_access")
    public  ResponseEntity<?>give_record_access(@RequestParam("doctorId") String doctorId,@RequestParam("recordId") String recordId) {
        Doctor a=doctorService.findByDoctorId(doctorId);
        List<String> ls=a.getList_of_records();
        ls.add(recordId);
        a.setList_of_records(ls);
        return new ResponseEntity<>(doctorService.saveDoctor(a), HttpStatus.OK);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("doctorId") String id) {
        Doctor doctor = doctorService.findByDoctorId(id);
        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @DeleteMapping("/{doctorId}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable("doctorId") String id) {
        doctorService.deleteDoctor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/set_status")
    public ResponseEntity<?> set_doctor_status(@RequestParam("status") String status,@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId = authenticationController.get_username_using_jwt(jwtToken);

        // Validate the status parameter
        if (!status.equals("true") && !status.equals("false")) {
            return new ResponseEntity<>("Invalid status parameter", HttpStatus.BAD_REQUEST);
        }
        if(patientId.equals("1")){
            return new ResponseEntity<>("Invalid status parameter", HttpStatus.BAD_REQUEST);
        }
        String aa="" ;
        if(status.equals("true")){
            aa="Online";
        }else{
            aa="Offline";
        }

        Doctor a=doctorService.findByDoctorId(patientId);
        a.setStatus(aa);
        doctorService.saveDoctor(a);
        // Return the updated status
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
    
    @PostMapping("/set_queue_status")
    public ResponseEntity<?> storePatientIds(@RequestBody Map<String, String> request, @RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId = authenticationController.get_username_using_jwt(jwtToken);
        String doctorId = request.get("doctorId");
        System.out.println(doctorId);
        Deque<String> patientIds = doctorQueueMap.getOrDefault(doctorId, new LinkedList<>());

        if (!patientIds.contains(patientId)) {
                patientIds.add(patientId);
        }

        // Update the map with the updated deque
        doctorQueueMap.put(doctorId, patientIds);
        return new ResponseEntity<>(doctorQueueMap, HttpStatus.OK);
    }

    @PostMapping("/set_patient_onlinestatus")
    public ResponseEntity<?> patient_call(@RequestBody Map<String, String> request, @RequestHeader("Authorization") String authorizationHeader) {
        String doctorId = request.get("doctorId");
        System.out.println(doctorId);
        patient_joined.put(doctorId, true);
        return new ResponseEntity<>(patient_joined, HttpStatus.OK);
    }

    @PostMapping("/update_queue_status")
    public ResponseEntity<?> updatePatientIds(@RequestBody Map<String, String> request,@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId = authenticationController.get_username_using_jwt(jwtToken);
        String doctorId = request.get("doctorId");
        System.out.println(doctorId);
        Deque<String> patientIds = doctorQueueMap.get(doctorId);
        
        if (patientIds == null) {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }
        
        // Remove the patientId from the deque
        boolean removed = patientIds.remove(patientId);
        
        if (!removed) {
            return new ResponseEntity<>("Patient not found in doctor's queue", HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<>("Patient ID removed successfully from doctor's queue", HttpStatus.OK);
        
        // return new ResponseEntity<>("Patient IDs stored successfully", HttpStatus.OK);
    }
    @PostMapping("/get_queue_number")
    public ResponseEntity<?> get_queue_number(@RequestBody Map<String, String> request,@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId = authenticationController.get_username_using_jwt(jwtToken);
        String doctorId = request.get("doctorId");
        System.out.println(doctorId);
        Deque<String> deque = doctorQueueMap.get(doctorId);
        int queue_number=0;
        if (deque != null) {
            int index = 0;
            for (String str : deque) {
                if (str.equals(patientId)) {
                    break;
                }
            index++;
            }
            queue_number = index;
            System.out.println(queue_number);
            System.out.println("Size of the Deque for key '" + doctorId + "': " + queue_number);
        } else {
            System.out.println("No Deque found for key '" + doctorId + "'");
        }

        return new ResponseEntity<>(queue_number, HttpStatus.OK);
        
        // return new ResponseEntity<>("Patient IDs stored successfully", HttpStatus.OK);
    }
    @GetMapping("/get_online_doc")
    public ResponseEntity<?> get_doctor_status() {
        List<String> trueKeys = new ArrayList<>();
        for (Map.Entry<String, Boolean> entry : maap.entrySet()) {
            if (entry.getValue()) {
                trueKeys.add(entry.getKey());
            }
        }
        return new ResponseEntity<>(trueKeys, HttpStatus.OK);
    }
    
}