import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";
import { Link as L, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  

  useEffect(() => {
    
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
   

  }, [y]);

  const HandleLogout=()=>{
    localStorage.clear();
    useDispatch(setUser(undefined))
  }
 

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
           {/* <LogoIcon />*/}
           <img src={LogoIcon} alt="" style={{height:'200px' , width:"200px", objectFit:"contain"}} />
            
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
          {user? <L activeClass="active" style={{ padding: "10px 15px" }} to="/" spy={true} smooth={true} offset={-80}>
                  {user.name}
                  
               </L>:
          <Link activeClass="active" style={{ padding: "10px 15px" }} to="loginButtons" spy={true} smooth={true} offset={-80}>     
               Login
               <div className="btn-group">
                  <button type="button" className="btn-btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li className="dropdown-item" onClick={()=> navigate("/searchLawyer")} > Dashboard</li>
                    <li className="dropdown-item" onClick={()=> navigate("/clientProfile")} > Profile</li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link className="dropdown-item" to="#">Logout</Link></li>
                  </ul>
                </div>
          </Link>
}
            </li>
            <li className="semiBold font15 pointer flexCenter">
            {user? <L activeClass="active" style={{ padding: "10px 15px" }} to="/" spy={true} smooth={true} offset={-80} onClick={HandleLogout}>
                  Logout
               </L>:
           
            <Link activeClass="active" style={{ padding: "10px 15px" }} to="registerButtons" spy={true} smooth={true} offset={-80}>
                Register
              </Link>
}
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
`
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


