# Clickare Milestone 4

## Introduction

ClikCare is a web-based platform that makes healthcare more accessible. With
ClikCare, you can schedule appointments with healthcare providers and
connect with them through video or audio chat. Our platform removes
geographical barriers, letting you access healthcare services from wherever
you are. Say goodbye to long waits and travel time  ClikCare brings quality
healthcare right to your fingertips. Join us in revolutionizing healthcare access
with simplicity and convenience.

## Planned Scope of the project

```
Patients can initiate virtual consultations with available doctors.
The platform supports audio/video communication channels via WebRTC
technology.
Simulated incoming/outgoing calls and management of waiting/busy
conditions ensure a smooth communication experience.
Doctors can record clinical details and issue prescriptions electronically
during consultations.
Patients can upload and manage their clinical records and medical history
on the platform.
Mechanisms are in place to verify the identity of callers, particularly for
video calls.
Prescription issuance is limited to video calls or situations where the
identity of the caller can be verified.
Patients must provide consent for sharing their medical records with
healthcare providers.
```
## Functional Features

```
 Secure User Access: Implemented user authentication for Organization
Admin, System Admin, Doctors, and Patients, ensuring secure and
authorized access to the platform.
```

```
 User Profile Management: Enabled users to effortlessly manage their
profiles, providing flexibility and control over personal information.
 Smooth Communication: Integrated WebRTC technology for seamless
audio/video calls between patients and doctors, ensuring effective
communication during consultations.
 Efficient Appointment Scheduling: Implemented a queue-based
appointment system, optimizing resource allocation and minimizing patient
wait times for enhanced service efficiency.
 Online Consultation: Developed a comprehensive system for online
consultations, including secure prescription issuance, ensuring
uninterrupted healthcare delivery.
 Clinical Records Management: Provided patients with the capability to
securely upload and manage their clinical records and medical history,
promoting data completeness and accuracy.
 Informed Care Delivery: Allowed doctors (with patient consent) to access
prior medical history, facilitating informed decision-making and
personalized care delivery.
 Secure Prescription Issuance: Implemented strict authorization protocols
for prescription issuance during verified video calls, ensuring patient safety
and compliance.
 Respect for Privacy: Incorporated a consent mechanism for sharing patient
records with doctors, prioritizing patient privacy while facilitating continuity
of care.
```
## Key design documents

### UI/UX Information

Our focus was to make the user experience as good as possible, to make this
possible we have included multiple UI/UX guidelines to accommodate it. These
include using colors that have good contrast ratios, icons accompanied with
supporting text(helping the user recognize the icon easily), minimalistic design
helping the user identify elements clearly, and standard element sizes allowing
the users to navigate with ease.
**Color Contrast Ratio information:**


We have also made two different logos for Doctor and Patient to differentiate
the user interfaces

```
HAD
Created with Figma
https://www.figma.com/design/6OE1WuKwumXPe8tq
GtyB/HAD?node-id=01&t=fzxrrri2Ajf5qbN6
```
```
HAD
Created with Figma
https://www.figma.com/proto/6OE1WuKwumXPe8tq58Gt
yB/HAD?page-id=0%3A1&type=design&node-id=311&view
port=540%2C159%2C0.17&t=SPzsSgZ9glEGk84J1&scaling
=scale-down&starting-point-node-id=3%3A 11
```
### Patient Flow :

```
Contrast ratio of Primary color Contrast ratio
```
```
Logo on doctor side interface Logo on patient side interface
```
**Figma File Link**

**Prototype Link**


### Doctor Flow :

### Database Design:

In the healthcare system, patients depend on doctors for diagnosis, treatment,
and care. Appointments facilitate discussions and treatment plans between
patients and doctors. Prescriptions guide treatment, while health records track
patient history. These elements ensure informed care and wellness. Our
databases include
Patient
Doctor
Appointment
Prescription
Health Record


### Patient

```
patient_id  Ev ery patient has a patient_id with which he/she will be
uniquely identified within the table. Primary Key)
Some personal information such as name, DOB, gender, and blood group
are stored in the table.
The email and mobile number are also used to send future follow-up
notifications
from doctors.
```
### Doctor

```
doctor_id  Ev ery doctor has a doctor_id with which he/she will be uniquely
identified within the table. Primary Key)
Some personal information such as name, DOB, and gender are stored in
the table.
A few details (experience, specialization) are stored in the database to
display
them to the patient while choosing a specific doctor.
```
### Health_record

```
record_id : unique record id that was created when a new health record is
going to be created.
```

```
patient_id : patient ID will be mapped to the health record.
Description  Description given by the patient to that record.
File  The file uploaded by the patient is stored in BLOB format.
```
### Prescription

```
Prescription_id : unique record ID that was created when a new prescription
is going to create.
Appointment_id: appointment id, this was mapped from the appointment
when the meet was going on.
medicine_name : medicine name, a string given by the doctor.
Description  Description given by the doctor to that medicine.
```
### Appointment

```
app_id  Ev ery appointment has an appointment_id with which the
appointment can be uniquely identified within the table. Primary Key)
booking_time  The timestamp at which the patient clicked book
appointment.
start_time and end_time  The timestamp at which the appointment has
started and ended.
Each appointment stores both the corresponding patient_id who created
the
appointment and the doctor_id who is/will be assigned to consult the
patient in
that appointment.
The status of the patient is maintained in the table which stores whether an
the appointment is “ongoingˮ “canceledˮ “finishedˮ or “pendingˮ.
Doctors can mark a specific patient for future follow-up, which gets stored
in
the ‘mark_for_follow_upʼ at tribute.
```
## Website Flow

```
The authentication journey begins with users selecting their role—either
doctor or patient—directing them to the login page. Here, they input their
```

```
phone number for OTP verification, a crucial step in ensuring secure access
to the platform.
At the core of this verification process is the TOTPGenerator class, which
plays a central role. It utilizes HMACSHA1 hashing to generate a unique
OTP One-Time Password) based on a shared secret key and the current
time.
This OTP serves as a critical element of two-factor authentication 2FA ,
bolstering the security of the login process and safeguarding user accounts
from unauthorized access.
Upon successful validation of the OTP, users seamlessly proceed to their
respective home pages, where they can readily access platform features
tailored to their specific roles and needs.
For new users, the journey smoothly transitions to the registration process
if they have not yet signed up. Once registration details are provided and
verified, users are promptly redirected to the appropriate home page,
facilitating a streamlined onboarding experience while ensuring
uninterrupted access to platform functionalities.
```
This is the landing page, common for both doctors and patients. The upcoming
screens
based on the choices made by the user.


### Patient Side


Patients can access the application by logging in with their mobile number and
authenticating themselves using a one-time password O TP. New users will be
directed to the registration page to create their profile, while existing users will
be redirected to their Patient Select Profile page, ensuring a seamless and
secure login experience.

On the Patient Registration page, users can sign up for the application by
providing their details, including mobile number and email address. The
registration process includes functionality for mobile numbers and email
verification to ensure the accuracy and security of user information. Upon
successful verification, users can complete their registration and access the
platform's features.


On the home page, users will find a list of all available doctors along with their
respective information. The online status of each doctor will be indicated,
allowing users to identify doctors currently available for consultation. Clicking
on the "Consult doctor" button will redirect users to a queue. As the patient
queue progresses and the number decreases to zero, patients will be
automatically joined into a video call with the doctor, facilitating efficient and
timely access to medical consultation.


On the reports page, users can upload all their medical reports and have the
option to grant access to specific doctors of their choice. This feature allows
for secure sharing of medical information with healthcare providers for further
analysis and consultation.


Appointments page for the patient side. Suppose the doctor uploaded a record
of this appointment. There will be a button to view the report.


### Queue Management Algorithm

In our system, the queue management algorithm ensures efficient and fair
allocation of patients to doctor queues based on their preferences and current
workload. The algorithm operates as follows:
 **First-Come-First-Serve Basis**  The primary principle of our queue
management system is first-come-first-serve. Patients are assigned to
doctor queues based on the order of their arrival.
 **Assignment to a Specific Doctor**  When a new patient specifies a particular
doctor they prefer to consult, regardless of the number of patients already
in the queue for that doctor, the incoming patient is directly assigned to that
doctor's queue. This ensures that patients have the option to choose their
preferred healthcare provider and receive personalized care.
 **Assignment Based on Specialization**  If a patient does not specify a
particular doctor but instead requests a specific specialization, the
algorithm identifies all queues associated with doctors of that
specialization. From these queues, the one with the least number of waiting
patients is selected. The incoming patient is then directed to this queue,


ensuring equitable distribution of workload among doctors and minimizing
patient wait times.
By implementing this queue management algorithm, we ensure efficient
utilization of resources, fair allocation of patients to doctors, and optimal patient
satisfaction by minimizing wait times and providing personalized care options.

## Doctor Side

```
Home Page
```
```
The home page has a toggle button to change the online status of the
doctor. The Start consulting button helps to join the call with the patient.
Appointment page for doctor.
```

The appointments page for doctors has the option to upload a report for a
particular appointment.
If the appointment has already been uploaded, the button will be changed to
view the report.


On the records page of the doctor, we show the list of all records that he/she
can access the records.
Video Call from the Doctorʼs side before joining of the patient

```
Video Call from the Doctorʼs side after joining the patient
```

## Security and Technical Safeguards

In our system, we have implemented a comprehensive set of security measures
to safeguard user data and ensure secure access to our platform. These
measures include:
 **Token Management and Session Handling**  Tokens issued upon login are
subject to stringent management and validation procedures. Any corruption
of the token or expiration results in immediate logout, thereby terminating
the session and enhancing overall security.
 **JWT Authorization for Login**  W e employ JSON Web Tokens JWT to
authorize login for both patients and doctors. Upon successful
authentication, a JWT containing relevant user data is generated and
securely transmitted to the client. This token is then included in the
authorization header of all API calls, providing a secure means of
authentication for subsequent requests.
 **Encryption of Personally Identifiable Information PII**  All P ersonally
Identifiable Information PII stored in our database is encrypted using the
Advanced Encryption Standard AES. This includes sensitive data such as
names, mobile numbers, email addresses, date of birth, and health records.
By encrypting PII, we ensure that even in the event of a security breach,
sensitive user information remains protected and unreadable to
unauthorized parties. As of now we have encrypted only the description
column, we can do the same for the remaining columns. You can observe
that we had description has no begin full words. The actual description is
“helloˮ. for the first record).


 **TOTP generation:** Time-based One-Time Password T OTP generator and
validator. It utilizes HMACSHA1 for generating OTPs based on a user's ID
and a secret key. The generated OTP is a 6-digit code valid for 5 minutes.
The **validate OTP** function compares a user-entered OTP with the generated
OTP to authenticate users. (even though we are using a third party to send
OTP, our backend is capable of generating OTP.
These security and technical safeguards collectively contribute to the
robustness and integrity of our platform, ensuring that user data is securely
managed and accessed only by authorized individuals.

## Privacy Policy Summary

**Project title**  Clikare
**Team no**  21
**Team Members** :
Murali Jayam  IMT
G Vamshi Krishna Reddy  IMT
Vivek Tangudu  IMT
Puram Rahul Kumar Reddy  IMT
Chakradhar Vanarasi  IMT

Please answer the following in as much detail as you can provide. In the table
below, “userˮ r efers to the “data subjectˮ – the person(s) whose personal data
is being collected and processed in your application.

```
Data Fiduciaries
Identify the organizations/entities that
```
```
Doctors and Patients
```

_“determine the purpose and means of the
processing of personal dataˮ_
**Nature of the application/platform**

_Summarize the overall purpose of your
solution – what it broadly does, and not
how it does it_

```
Clickare
```
**Personal data collected **

_For each item of personal and/or sensitive
data, mention the item and the purpose
for which it is collected
List one data item per line_
**Data Item Purpose
Patient**
 Name Consultation Record

 Date of Birth

We can use this attribute to recommend a
doctor based on age for record purposes.
F uture Scope)
Gender  Consultation Record.
Blood group Consultation Record

Phone number Consulpurposestation record and for Authentication

Email Future Communication
**Doctor**
Name Record, Consultation
Age Record, consultation
Gender Record, consultation
Experience Future scope to recommend
Specialization Future scope to recommend

Phone number Consulpurposestation record and for Authentication

Email Future Communication
**Record**

File(pdf)

```
A patient can upload his records. and give
access to particular doctors who can
access
```

Description Get a bropening it.ief idea about the record without

**Informed consent**

List the steps at which user consent is
obtained and the consent collection
mechanism.

**Data Minimization**

Are all data items collected required for the
proposed processing? Identify those that
are not needed for the stated purposes 

**1. Patient phone numbers** will be
collected solely for potential future
enhancements, such as implementing
two-factor authentication through OTP via
phone.
**2. Patient email addresses** will serve as a
means for potential future features, such
as emailing prescriptions or valuable
advisory content from the platform if
patients choose to opt in.
**Confidentiality**

_How is this ensured? List any 3rd parties
with whom the data is shared and the
purpose_

```
Shared mobile number to provide OTP
services. (we are generating the OTP.
Using an inbuilt plugin to view the records.
```
**Purpose Limitation**

_Identify mechanisms in place to prevent
data use for other than stated purposes_

```
 We can build our own OTP service.
Create a plugin to view the record.
```
**Security**

_List the security-related mechanisms and
technical safeguards to protect privacy_

```
The database was encrypted. We are
using Jaspyt to write anything into the
database while reading we are decrypting.
```
**Data Retention**

_For what period of time is the collected
data stored? What happens to the data at
the end of that period_

```
 MySQL supports time-based partitioning
at the table level, enabling rolling purges
of data. Automation can be implemented
to archive any crucial information before it
is purged from the database. This setup
can be configured during deployment to
align with legal requirements for
information retention and archival
purposes.
```

```
Data Deletion Requests
Describe the mechanism by which users
can request deletion of some or all of their
data. If no such mechanism exists, state so
```
```
Each user has complete control over
managing and deleting all information
related to them.
```
```
Account Deletion
How are requests for deletion of accounts
by users handled? What happens to the
data of accounts that are deleted
```
```
 Yes, we can remove all the data that was
there in the DB with their request(using
their IDs).
```
```
Revoking Consent
Can users revoke some or all of the
consent they have provided? What is the
mechanism for revoking consent?
```
```
Yes, we had an attribute for that in a
Patient attribute to change the consent
status, which makes the user data
deleted. The patient can revoke access to
the reports that he had already given.
Other Privacy related remarks
```
## APIʼs List

### Patient Registration API

```
 create_patient ():
Description  Adds a new user by taking the details of the patient filled and
stores them in the database.
Endpoint : /api/patient/create_patient
Method  POST
Request Body  Det ails of the patient (e.g., name, mobile number, address,
etc.).
Response  Confirmation message or error response.
```
### Doctor Registration API

```
 create_doctor() :
Description: Adds a new doctor by taking the details filled out and storing
them in the database.
```

```
Endpoint: /api/doctor/create_doctor
Method: POST
Request Body: Details of the doctor (e.g., name, mobile number, address,
specialty, etc.).
Response: Confirmation message or error response.
```
### Authentication API

```
 send_otp():
Description:
This API call takes a mobile number as input and generates an OTP One-
Time Password) which is then sent to the respective mobile number via
SMS or another communication channel.
Endpoint: /api/auth/send_otp{mobile number}
Method: POST
Request Body: Mobile number
Response: Success message or error response
 verify_otp():
Description: This API call verifies the entered OTP One-Time Password)
with the generated OTP for the given mobile number. It sends a flag
indicating whether the entered OTP is valid or not.
Endpoint: /api/auth/verify_otp
Method: POST
Request Body: Mobile number and OTP
Response: Flag indicating whether the OTP is verified or not
```

### Appointment API

```
 create_appointment():
Endpoint: /api/appointment/create_appointment
Method: POST
Description: Create a new entry in the appointment table.
Request Body: Details of the appointment (e.g., patient ID, doctor ID,
appointment date/time, etc.).
Response: Confirmation message or error response.
 assign_doctor():
Endpoint: /api/appointment/assign_doctor
Method: PUT
Description: Assign a doctor to the appointment by taking in the doctor ID
and appointment ID.
Request Body: Doctor ID, Appointment ID.
Response: Confirmation message or error response.
 set_mark_for_followup():
```
**Endpoint:** (^) /api/appointment/set_mark_for_followup
**Method:** PUT
**Description:** Marks the appointment for future follow-up based on the
appointment ID.
**Request Body:** Appointment ID.
**Response:** Confirmation message or error response.


### Prescription API

```
 upload_pres_data():
Endpoint: /api/prescription/upload_pres_data
Method: POST
Description: Creates a new entry in the prescription table with the provided
prescription data.
Request Body: Prescription data including patient details, medication,
dosage, etc.
Response: Confirmation message or error response.
 get_pres_by_app_id():
Endpoint: /api/prescription/get_pres_by_app_id/{appointment_id}
Method: GET
Description: Retrieves the prescription object associated with the given
appointment ID.
Path Parameter: Appointment ID.
Response: Prescription object containing prescription details.
```
### Health Records API

```
 upload_record():
```
**Endpoint:** (^) /api/health_record/upload_record
**Method:** POST
**Description:** Create a new entry in the health record table.
**Request Body:** Details of the health record (e.g., patient ID, record type,


```
record data, etc.).
Response: Confirmation message or error response.
 get_record():
Endpoint: /api/health_record/get_record
Method: GET
Description: Returns the health record file given the health record ID.
Query Parameter: Health record ID.
Response: Health record file or error response.
 list_records_by_patient_id():
Endpoint: /api/health_record/list_records_by_patient_id
Method: GET
Description: Lists all the health records of a patient given the patient ID.
Query Parameter: Patient ID.
Response: List of health records or error response.
```
### Demo Video Link and GitHub Repository

**Demo Video Link** -

```
https://iiitbac-my.sharepoint.com/personal/vivek_tangudu_iiitb_ac_in/_layouts/15/onedrive.aspx?id
=%2Fpersonal%2Fvivek%5Ftangudu%5Fiiitb%5Fac%5Fin%2FDocuments%2FHAD&ga=1
```
**GitHub Repo Link** -


GitHub - chakradhar06/clickare
Contribute to chakradhar06/clickare development by
creating an account on GitHub.
https://github.com/chakradhar06/clickare


