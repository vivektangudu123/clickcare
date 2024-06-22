package com.example.clickcarebackend.Record;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, String> {
    List<Record> findByPatientId(String patientId);
    Record findByRecordId(String recordId);
}
