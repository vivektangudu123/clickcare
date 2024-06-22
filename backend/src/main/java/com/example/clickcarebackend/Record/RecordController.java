package com.example.clickcarebackend.Record;

import com.example.clickcarebackend.Doctor.Doctor;
import com.example.clickcarebackend.Doctor.DoctorService;
import com.example.clickcarebackend.authentication.AuthenticationController;
import com.example.clickcarebackend.authentication.UniqueIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.Doc;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    private RecordService recordService;

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private AuthenticationController authenticationController;

    @PostMapping("/add")
    public ResponseEntity<String> addRecord(@RequestParam("file") MultipartFile file,
                                            @RequestHeader("Authorization") String authorizationHeader,
                                            @RequestParam("description") String description) throws IOException {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId=authenticationController.get_username_using_jwt(jwtToken);
        System.out.println(patientId);
        if(patientId.equals("1"))
            return ResponseEntity.ok().body("1");
        String recordId= UniqueIdGenerator.generateUniqueId(8);
        recordService.addRecord(file, patientId, description,recordId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Record added successfully");
    }

    @GetMapping("/view/{recordId}")
    public ResponseEntity<Resource> viewRecord(@PathVariable("recordId") String recordId) {
        Record record = recordService.getRecordById(recordId);
        ByteArrayResource resource = new ByteArrayResource(record.getFileData());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + recordId + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping("/download/{recordId}")
    public ResponseEntity<Resource> downloadRecord(@PathVariable("recordId") String recordId) {
        Record record = recordService.getRecordById(recordId);
        ByteArrayResource resource = new ByteArrayResource(record.getFileData());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recordId + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @PutMapping("/{recordId}/add-doctor")
    public ResponseEntity<String> addDoctorToRecord(@PathVariable("recordId") String recordId,
                                                    @RequestParam("doctorId") String doctorId) {
        recordService.addDoctorToRecord(recordId, doctorId);
        return ResponseEntity.ok().body("Doctor added to the record successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRecordsByPatientId(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId=authenticationController.get_username_using_jwt(jwtToken);
        if(patientId.equals("1")){
            return ResponseEntity.ok().body("1");}

        List<Record> records = recordService.getAllRecordsByPatientId(patientId);
        System.out.println(records.size());
        return ResponseEntity.ok().body(records);
    }
    @GetMapping("/all_doctor")
    public ResponseEntity<?> getAllRecordsByDoctorID(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        String patientId=authenticationController.get_username_using_jwt(jwtToken);
        if(patientId.equals("1")){
            return ResponseEntity.ok().body("1");}

        Doctor doc=doctorService.findByDoctorId(patientId);
        List<String >a=doc.getList_of_records();
        List<Record> rec=new ArrayList<Record>();;
        for(int i=0;i<a.size();i++)
        {
            rec.add(recordService.getRecordById(a.get(i)));
        }
        System.out.println(rec.size());
        return ResponseEntity.ok().body(rec);
    }
}
