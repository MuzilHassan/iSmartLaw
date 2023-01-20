import React from "react";
import "../css/adminDashboard.css";
import Logo from "../assets/Logo.png";
import home1 from "../assets/home1.svg";
import people2 from "../assets/people 2.svg";
import person from "../assets/person.svg";
import people3 from "../assets/people3.svg";
import appointment1 from "../assets/appointment1.svg";
import calendar1 from "../assets/calendar1.svg";
import settings from "../assets/settings.svg";
import quer from "../assets/question-square.svg";
import Logout from "../assets/logout.svg";
import { Link, Link as Link1 } from "react-router-dom";
function AdminDashobard({ children }) {
  return (
    <div style={{ boxSizing: "border-box" }}>
      <nav className="Sidebar">
        <div className="Sidebar-inner">
          <header className="Sidebar-header">
            <img src={Logo} className="Sidebar-logo" />
          </header>
          <nav className="Sidebar-menu">
            <Link1>
              <button className="buttons">
                <img src={home1} />
                <span>Home</span>
              </button>
            </Link1>
            <Link1 to={"/AdminLawyer"}>
              <button className="buttons">
                <img src={people2} />
                <span>Lawyers</span>
              </button>
            </Link1>
            <Link1 to={"/AdminClient"}>
              <button className="buttons">
                <img src={person} />
                <span>Clients</span>
              </button>
            </Link1>
            <Link1 to={"/AdminJudge"}>
              <button className="buttons">
                <img src={people3} />
                <span>Judges</span>
              </button>
            </Link1>
            <Link1 to={"/AddAdmin"}>
              <button className="buttons has-border">
                <img src={person} />
                <span>Add Admins</span>
              </button>
            </Link1>
            <button className="buttons">
              <img src={appointment1} />
              <span>Appointments</span>
            </button>
            <button className="buttons">
              <img src={calendar1} />
              <span>Bookings</span>
            </button>
            <button className="buttons">
              <img src={quer} />
              <span>Queries</span>
            </button>
            <button className="buttons">
              <img src={settings} />
              <span>Account Settings</span>
            </button>
            <Link1 to={"/"}>
              <button className="buttons">
                <img src={Logout} />
                <span>Logout</span>
              </button>
            </Link1>
          </nav>
        </div>
      </nav>
      <div
        className="content"
        style={{ marginLeft: "18rem", marginTop: "0", paddingTop: "0" }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminDashobard;
