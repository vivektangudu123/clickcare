package com.example.clickcarebackend.authentication;

import com.example.clickcarebackend.Doctor.Doctor;
import com.example.clickcarebackend.Doctor.DoctorService;
import com.example.clickcarebackend.Patient.Patient;
import com.example.clickcarebackend.Patient.PatientService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping(value = "/api/auth")
@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtUtils jwtUtils;
    @Autowired
    private PatientService patientService;
    @Autowired
    private DoctorService doctorService;

    private String type;

    @ModelAttribute
    public void setResponseHeader(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    public AuthenticationController(AuthenticationService authenticationService, JwtUtils jwtUtils) {
        this.authenticationService = authenticationService;
        this.jwtUtils = jwtUtils;
    }

    record send_otp_body(String mobile_number,String type) {
    }

    record verify_otp_body(String mobile_number, String otp) {
    }
    record send_jwt(String jwt){

    }

    @CrossOrigin
    @PostMapping("/send_otp")
    public String send_otp(@RequestBody send_otp_body send_otp_rec) {
//        return authenticationService.send_otp(send_otp_rec.mobile_number);
        if(send_otp_rec.type.equals("patient"))
        {
            if(patientService.isMobileNumberExists(send_otp_rec.mobile_number))
            {
                this.type=send_otp_rec.type;
//                String au=authenticationService.send_otp(send_otp_rec.mobile_number);
//                if(au.equals("pending"))return "pending";
//                else{
//                    return "Try again, Error occured";
//                }
                return "pending";
            }
            else{
                return "User Not Found";
            }
        }else if(send_otp_rec.type.equals("doctor"))
        {
            if(doctorService.isMobileNumberExists(send_otp_rec.mobile_number))
            {
                this.type=send_otp_rec.type;
//                String au=authenticationService.send_otp(send_otp_rec.mobile_number);
//                if(au.equals("pending"))return "pending";
//                else{
//                    return "Try again, Error occured";
//                }
                return "pending";
            }
            else{
                return "User Not Found";
            }
        }
        System.out.println(this.type);
        return "error";
    }
    @CrossOrigin
    @PostMapping("/jwt")
    public ResponseEntity<?> verify_jwt(@RequestBody String JWT) {
        JWT = JWT.substring(1, JWT.length() - 1);
        System.out.println(JWT);
        String username=get_username_using_jwt(JWT);
        System.out.println(username);
        return ResponseEntity.ok().body(username);
    }

    @CrossOrigin
    @PostMapping("/verify_otp")
    public ResponseEntity<?> verify_otp(@RequestBody verify_otp_body verify_otp_rec) {
        String status = "approved"; // Assuming status is approved for simplicity

        if (status.equals("approved") && this.type.equals("patient")) {
            if (patientService.isMobileNumberExists(verify_otp_rec.mobile_number)) {
                Patient user = patientService.getUserByPhoneNumber(verify_otp_rec.mobile_number);
                String jwtToken = jwtUtils.generateToken(user.getPatientId());
                String userType = "patient";

                Map<String, Object> response = new HashMap<>();
                String statuss=status;
                response.put("statuss", statuss);
                response.put("jwtToken", jwtToken);
                response.put("user", user);
                response.put("userType", userType);

                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.ok().body("User Not Found");
            }
        } else if (status.equals("approved") && this.type.equals("doctor")) {
            if (doctorService.isMobileNumberExists(verify_otp_rec.mobile_number)) {
                Doctor user = doctorService.getDoctorByPhoneNumber(verify_otp_rec.mobile_number);
                String jwtToken = jwtUtils.generateToken(user.getDoctorId());
                String userType = "doctor";

                Map<String, Object> response = new HashMap<>();
                String statuss=status;
                response.put("statuss", statuss);
                response.put("jwtToken", jwtToken);
                response.put("user", user);
                response.put("userType", userType);

                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.ok().body("User Not Found");
            }
        } else {
            return ResponseEntity.ok().body("nope");
        }
    }


    public String get_username_using_jwt(String token) {
        try {
            return jwtUtils.extractUsername(token);
        } catch (ExpiredJwtException ex) {
            return "1";
        } catch (MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {

            return"2";
        }
    }

}