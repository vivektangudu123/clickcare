# 🩺 ClikCare — Telemedicine Platform

ClikCare is a telemedicine web application connecting patients with doctors. Patients log in with an OTP, browse doctors, book appointments, manage medical reports, and join real-time video consultations.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black">
  <img alt="Agora / WebRTC" src="https://img.shields.io/badge/Realtime-Agora%20%2F%20WebRTC-099DFD?logo=webrtc&logoColor=white">
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white">
  <img alt="Axios" src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## ✨ Features

- **Dual-role access** — separate login flows for **doctors** and **patients**.
- **OTP authentication** — passwordless login; JWT persisted in `localStorage`.
- **Doctor discovery & appointments** — browse doctors and book appointment slots.
- **Real-time video consultations** — in-app video calling (Agora RTM SDK / WebRTC `simple-peer`).
- **Medical reports** — upload, view (PDF via `react-pdf`), download and share patient reports.
- **Smooth UX** — animated transitions (`react-spring`) and a collapsible sidebar.

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 18, React Router DOM 6 |
| Realtime | Agora RTM SDK, `simple-peer` (WebRTC), WebSocket signaling |
| Documents | `react-pdf` |
| Animation | `react-spring` |
| HTTP | Axios |
| Auth | JWT (`localStorage`), OTP verification |
| Tooling | Create React App (react-scripts 5) |
| Backend API | REST + WebSocket service (separate repository) |

## 🧭 Main Screens

| Screen | Description |
|--------|-------------|
| Landing | Doctor / Patient role selection |
| Login | OTP-based authentication |
| Overview | Browse doctors and book appointments |
| Appointments | List of booked appointments |
| Reports | Upload / view / download / share medical reports |
| Video call | Real-time consultation room |

## 🚀 Getting Started

```bash
git clone https://github.com/vivektangudu123/clickcare.git
cd clickcare/frontend
npm install        # an .npmrc enables legacy-peer-deps for a legacy UI dep
npm start          # http://localhost:3000
```

> Requires the ClikCare backend running (REST + WebSocket).

## 📁 Project Structure

```
clickcare/
└── frontend/
    └── src/
        ├── pages/          # Overview, Appointments, Reports
        ├── components/     # Videocall, Sidebar, LandingPage, logins
        ├── apicalls/       # axiosInstance, patient, doctor, appointment, records
        └── App.js          # routes
```

## 👤 Author

**Vivek Tangudu**

- GitHub: [@vivektangudu123](https://github.com/vivektangudu123)
- LinkedIn: [vivektangudu](https://www.linkedin.com/in/vivektangudu)

## 📄 License

Released under the MIT License.
