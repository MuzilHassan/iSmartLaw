import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";

// Assets
import LogoIcon from "../../assets/svg/Logo.jpeg";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { setUser } from "../../redux/userSlice";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [y]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(undefined));
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <img src={LogoIcon} alt="" style={{ height: "200px", width: "200px", objectFit: "contain" }} />
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="lawyers" spy={true} smooth={true} offset={-80}>
                Lawyers
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              {user ? (
                <DropdownMenu ref={dropdownRef}>
                  <DropdownToggle onClick={handleDropdownToggle}>{user.name}</DropdownToggle>
                  {dropdownOpen && (
                    <DropdownContent>
                      <DropdownLink to="/clientChat">Chat</DropdownLink>
                      <DropdownLink to="/ClientAppointment">Appointments</DropdownLink>
                      <DropdownLink to="/payment">Payments</DropdownLink>
                      <DropdownLink to="/ClientCase">Case</DropdownLink>
                      
                    </DropdownContent>
                  )}
                </DropdownMenu>
              ) : (
                <Link activeClass="active" style={{ padding: "10px 15px" }} to="loginButtons" spy={true} smooth={true} offset={-80}>
                  Login
                </Link>
              )}
            </li>
            <li className="semiBold font15 pointer flexCenter">
              {user ? (
                <Link activeClass="active" style={{ padding: "10px 15px" }} to="/" spy={true} smooth={true} offset={-80} onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link activeClass="active" style={{ padding: "10px 15px" }} to="registerButtons" spy={true} smooth={true} offset={-80}>
                  Register
                </Link>
              )}
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
`;

const DropdownToggle = styled.span`
  padding: 10px 15px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px; /* Adjust the width as needed */
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const DropdownLink = styled(RouterLink)`
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  &:hover {
    background-color: #f5f5f5;
  }
`;
