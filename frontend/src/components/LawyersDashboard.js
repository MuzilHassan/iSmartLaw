import React, { useState } from "react";
import { Link as Link1 } from "react-router-dom";
import Logo from "../assets/Logo.png";
import home from "../assets/home.svg";
import breficase from "../assets/briefcase.svg";
import appointment from "../assets/appointment.svg";
import people from "../assets/people.svg";
import lock from "../assets/lock.svg";
import message from "../assets/message.svg";
import bell from "../assets/bell.svg";
import bell1 from "../assets/bell1.svg";
import "../css/dashboard.css";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const LawyersDashboard = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const [bodyside, setSide] = useState(false);

  const toggleSidebar = () => {
    document.body.classList.toggle("open");
    setSide(!bodyside);
  };

  return (
    <div className="d-flex layout">
      <aside className="sidebar">
        <div className="sidebar-inner">
          <header className="sidebar-header">
            <button
              type="button"
              className="sidebar-burger"
              onClick={toggleSidebar}
            ></button>
          </header>
          <nav className="sidebar-nav">
            <Link1 to={"/LawyerHome"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={home} alt="" />
                <span>Home</span>
              </button>
            </Link1>
            <Link1 to={"#"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={breficase} alt="" />
                <span style={{ animationDelay: "0.1s" }}>Cases</span>
              </button>
            </Link1>
            <Link1 to={"#"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={appointment} alt="" />
                <span style={{ animationDelay: "0.2s" }}>Appointments</span>
              </button>
            </Link1>
            <Link1 to={"#"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={message} alt="" />
                <span style={{ animationDelay: "0.3s" }}>Chats</span>
              </button>
            </Link1>
            <Link1 to={"/notifications"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={bell1} alt="" />
                <span style={{ animationDelay: "0.4s" }}>Notifications</span>
              </button>
            </Link1>
            <Link1 to={"#"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={people} alt="" />
                <span style={{ animationDelay: "0.5s" }}>Accounts</span>
              </button>
            </Link1>
          </nav>
          <footer className="sidebar-footer">
            <Link1 to={"/"} style={{ textDecoration: "none" }}>
              <button type="button">
                <img src={lock} alt="" />
                <span>Logout</span>
              </button>
            </Link1>
          </footer>
        </div>
      </aside>
      <div className={`${bodyside ? "start" : "end"} content`}>
        <div className=" px-4 header">
          <img
            src={Logo}
            alt=""
            style={{ height: "50px", width: "200px", objectFit: "contain" }}
          />
          <div>
            <Link1 to={"/notifications"} style={{ textDecoration: "none" }}>
              <i className=" px-3">
                <Badge badgeContent={4} color="success">
                  <img src={bell} alt="" />
                </Badge>
              </i>
            </Link1>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default LawyersDashboard;
