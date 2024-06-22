package com.example.clickcarebackend.authentication;

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private static final String ACCOUNT_SID = "AC94d90d2c5d6a147e25a27b98447ee242";
    private static final String AUTH_TOKEN = "b9af1bfb66ceedbb7f236c121360db6d";

    public void create_service() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        com.twilio.rest.verify.v2.Service service = com.twilio.rest.verify.v2.Service.creator("My First Verify Service")
                .create();
        System.out.println("Verification Service Created!");
        System.out.println(service.getSid());
        String service_sid = service.getSid();
    }

    public String send_otp(String mobile_number) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification = Verification.creator(
                "VA57f60c42b0ddd497f5548ace5a268e92",
                "+91" + mobile_number,
                "sms")
                .create();
        System.out.println(verification.getStatus());
        return verification.getStatus();
    }

    public String verify_otp(String otp, String mobile_number) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        VerificationCheck verificationCheck = VerificationCheck.creator(
                "VA57f60c42b0ddd497f5548ace5a268e92")
                .setTo("+91" + mobile_number)
                .setCode(otp)
                .create();
        System.out.println(verificationCheck.getStatus());
        return verificationCheck.getStatus();
    }

}