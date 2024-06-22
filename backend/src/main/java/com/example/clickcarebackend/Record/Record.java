package com.example.clickcarebackend.Record;
import com.example.clickcarebackend.authentication.StringCryptoConverter;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "records")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "recordId", unique = true, nullable = false)
    private String recordId;

    @Column(name = "patientId", nullable = false)
    private String patientId;

    @Column(name = "Listofdoctors")
    private List<String> doctors;

    @Column(name = "description")
    @Convert(converter = StringCryptoConverter.class)
    private String description="No Description";

    @Lob
    @Column(name = "fileData", columnDefinition="MEDIUMBLOB")
    private byte[] fileData;

    // Constructors, Getters, and Setters

    public Record() {
    }

    public Record(String patientId, String description, byte[] fileData,String recordId) {
        this.patientId = patientId;
        this.description = description;
        this.fileData = fileData;
        this.recordId=recordId;
    }


    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public List<String> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<String> doctors) {
        this.doctors = doctors;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }
}
