import React, { useState } from "react";
import TitleIcon from "../assets/TitleLogo.svg"; // Assuming this is your icon
import Edit from "../assets/edit.svg"; // Assuming this is your icon

import { ReactComponent as A } from "../assets/Calendar.svg";
import { ReactComponent as C} from "../assets/Category.svg";
import { ReactComponent as DM} from "../assets/Chat.svg";
import { ReactComponent as R } from "../assets/Document.svg";
import { ReactComponent as S} from "../assets/Setting.svg";
import { ReactComponent as L} from "../assets/Logout.svg";

import { FaTh, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Reports from "../components/Reports";
import Appointments from "../components/Appointments";
import Overview from "../components/Overview";
import DirectMessaging from "../components/DirectMessaging";
import Logout from "../components/Logout";
import Settings from "../components/Settings";

const patientName = localStorage.getItem("name")
const patientID = localStorage.getItem("Id")
  

const Home = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Overview");

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {  name: "Overview", icon: <C/> },
    {  name: "Appointments", icon: <A/> },
    {  name: "Reports", icon: <R/> },
    // {  name: "DirectMessaging", icon: <DM /> },
    {  name: "Settings", icon: <S/> },
    {  name: "Logout", icon: <L/> },
  ];

  const handleNavLinkClick = (index) => {
    setActiveComponent(menuItem[index].name);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <Overview/>;
      case "Appointments":
        return <Appointments/>;
      case "Reports":
        return <Reports/>;
      case "DirectMessaging":
        return <DirectMessaging />;
      case "Settings":
        return <Settings/>;
      case "Logout":
        return <Logout/>;
      default:
        return <Overview/>;
    }
  };
  
  return (
    <div className="container" style={{ width: '100%', display: 'flex' }}>
      <div style={{ width: isOpen ? "280px" : "50px", padding: "5px"}} className="sidebar">
        <div className="top_section">
          {isOpen && (
            <div style={{ width: "80%" }}>
              <img src={TitleIcon} className="img-fluid" alt="Clik Care Logo" />
            </div>
          )}
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="profile_box" style={{ backgroundColor: "#F7F9FD", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
              <img src="https://via.placeholder.com/150" className="profile_image" alt="Profile" style={{ borderRadius: "50%", width: "50px", height: "50px" }} />
            </div>
            {isOpen && (
              <div>
                <div style={{ fontWeight: "bold" }}> {patientName} </div>
                <div> ID: {patientID} </div>
              </div>
            )}
            {isOpen && (
              <div style={{ marginLeft: "auto" }}>
                <button style={{ border: "None", background: "None" }}><img src={Edit} /></button>
              </div>
            )}
          </div>
        </div>

        {menuItem.map((item, index) => (
          <div
            key={index}
            className="link"
            onClick={() => handleNavLinkClick(index)}
            style={{ textDecoration: 'none', display: isOpen ? "flex" : "block", alignItems: "center", padding: "10px" }}
          >
            <div className="icon" style={{marginLeft:'0px'}}>{item.icon}</div>
            {isOpen&&
            <div className="link_text" style={{ marginLeft: "10px" }}>
              {item.name}
            </div>}
          </div>
        ))}
      </div>
      <main style={{ margin: "30px", borderRadius: "30px", backgroundColor: "#F7F9FD"}}>
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Home;
