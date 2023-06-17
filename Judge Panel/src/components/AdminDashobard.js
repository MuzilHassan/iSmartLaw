import React, { useContext } from "react";
import "./adminDashboard.css";
import Logo from "../assets/logo.png";
import home1 from "../assets/home1.svg";
import bgImg from "../asset/images/1.jpg";
import "../asset/css/style.css";
import person from "../assets/person.svg";
import bus from "../assets/bus.svg";
import appointment1 from "../assets/appointment1.svg";
import calendar1 from "../assets/calendar1.svg";
import settings from "../assets/settings.svg";
import quer from "../assets/question-square.svg";
import hotel from "../assets/hotel-service.svg";
import Logout from "../assets/logout.svg";
import { Link as Link1 } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function AdminDashobard({ children }) {
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_SUCCESS" });
    navigate("/login");
  };
  return (
    <div className="d-flex align-items-stretch">
      {/* <nav className="Sidebar ">
        <div className="Sidebar-inner">
          <header className="Sidebar-header">
            <img src={Logo} className="Sidebar-logo" />
          </header>
          <nav className="Sidebar-menu">
            <Link1 to={"/"} style={{ textDecoration: "none" }}>
              <button className="buttons">
                <img src={home1} />
                <span>Home</span>
              </button>
            </Link1>

            <Link1 to={"/AdminClient"} style={{ textDecoration: "none" }}>
              <button className="buttons">
                <img src={person} />
                <span>Users</span>
              </button>
            </Link1>

            <Link1 to={"/AddAdmin"} style={{ textDecoration: "none" }}>
              <button className="buttons ">
                <img src={calendar1} />
                <span>Add new Trip</span>
              </button>
            </Link1>
            <Link1 to={"/transport"} style={{ textDecoration: "none" }}>
              <button className="buttons ">
                <img src={bus} />
                <span>Transport</span>
              </button>
            </Link1>
            <Link1 to={"/hotelBooking"} style={{ textDecoration: "none" }}>
              <button className="buttons ">
                <img src={hotel} />
                <span>Hotel Service</span>
              </button>
            </Link1>
            <Link1 to={"/resturants"} style={{ textDecoration: "none" }}>
              <button className="buttons has-border">
                <img src={appointment1} />
                <span>Resturants Bookings</span>
              </button>
            </Link1>
            <Link1 to={"/userQuery"} style={{ textDecoration: "none" }}>
              <button className="buttons">
                <img src={quer} />
                <span>Queries</span>
              </button>
            </Link1>
            <button className="buttons">
              <img src={settings} />
              <span>Account Settings</span>
            </button>

            <button className="buttons" onClick={handleClick}>
              <img src={Logout} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </nav> */}

      <nav
        id="sidebar"
        className="img"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="p-4">
          <h1>
            <Link1 to="/" className="logo">
              iSmartLaw <span>Judge Panel</span>
            </Link1>
          </h1>
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <Link1 to="/">
                <span className="fa fa-home mr-3"></span> Home
              </Link1>
            </li>
            <li>
              <Link1 to="/Schedule">
                <span className="fa fa-check mr-3"></span> Schedule
              </Link1>
            </li>
            <li>
              <Link1 to="/OpenedCases">
                <span className="fa fa-paper-plane mr-3"></span> Opened Cases
              </Link1>
            </li>
            <li>
              <Link1 to={"/closedCases"}>
                <span className="fa fa-sticky-note mr-3"></span> Closed Cases
              </Link1>
            </li>
          </ul>
        </div>
      </nav>

      <div id="content" class="p-4 p-md-5 pt-5">
        {children}
      </div>
    </div>
  );
}

export default AdminDashobard;
