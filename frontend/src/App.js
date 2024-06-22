import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegistration from './pages/PatientRegister.jsx'
import DoctorRegistration from './pages/DoctorRegister.jsx'
import PatientLogin from './pages/PatientLogin.jsx';
import DoctorLogin from './pages/DoctorLogin.jsx';
import LandingPage from "./pages/LandingPage.jsx";
import WaitingPage from "./pages/WaitingPage.jsx";
import './App.css'
import Home from "./pages/Home.jsx";
import PatientCall from "./pages/PatientCall.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/patientRegister" element={<PatientRegistration />} />
        <Route path="/doctorRegister" element={<DoctorRegistration />} />
        <Route path="/patientLogin" element={<PatientLogin/>} />
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/WaitingPage' element={<WaitingPage />} />
        <Route path='/PatientCall' element={<PatientCall />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;