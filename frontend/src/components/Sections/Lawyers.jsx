import React ,{ useState, useEffect }from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";
import axios from "axios";


import Details from "./Details";
import {  useSelector } from "react-redux";
export default function Projects() {
  const navigate= useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [lawyers, setLawyers] = useState([]);
  
  const getAllLawyers = async () => {
    try {
      const response = await axios.get('/api/lawyer/all-lawyers');
      const users = response.data.users;
      setLawyers(users)
      return { success: true, users };
    } catch (error) {
      if (error.response) {
        // Request made and server responded with an error status code
        const errorMessage = error.response.data.message;
        return { success: false, message: errorMessage };
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return { success: false, message: 'No response from server' };
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
        return { success: false, message: error.message };
      }
    }
  };
  useEffect(() => {
    getAllLawyers()
    
  }, []);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const handleSelectLawyer = (lawyer) => {
    setSelectedLawyer(lawyer);
    setModalShow(true);
  };

  console.log(lawyers)
  return (
    <Wrapper id="lawyers">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Attorneys</h1>
            <p className="font13">
             Our attorneys are legal professionals who provide advice and representation to clients in legal matters.
              <br />
              They are trained and licensed to practice law and are responsible for upholding the law and ensuring that justice is served.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
        
            
          <div className="row textCenter">
            {lawyers.map((lawyer) => (
              <div
                className="col-xs-12 col-sm-4 col-md-4 col-lg-4"
                key={lawyer._id}
              >
                <ProjectBox
                  img={`http://localhost:5000/uploads/${lawyer.profilePicture}`}
                  title={lawyer.name}
                  text={lawyer.about}
                  action={() => handleSelectLawyer(lawyer)}
                />
              </div>
            ))}
          </div>
          <Details
            show={modalShow}
            onHide={() => setModalShow(false)}
            img={
              selectedLawyer &&
              `http://localhost:5000/uploads/${selectedLawyer.profilePicture}`
            }
            lawyer={selectedLawyer}
            name={selectedLawyer?.name}
            about={selectedLawyer?.about}
            phone={selectedLawyer?.phone}
            address={selectedLawyer?.address}
          />

          </div>
                    
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Load More" action={() => alert("clicked")} />
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg" id="loginButtons">
        <div className="container">
          {!user&&

          <Advertising className="flexSpaceCenter">
            <AddRight>
              <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                <div style={{ width: "190px" }}>
                  <FullButton title="Login as Lawyer" action={() =>navigate("/lawyerSignIn") } />
                </div>
                <div style={{ width: "190px", marginLeft: "15px" }}>
                  <FullButton title="Login as Judge" action={() => alert("clicked")} border />
                </div>
                <div style={{ width: "190px" ,marginLeft: "15px"}}>
                  <FullButton title="Login as Client" action={() => navigate("/clientSignIn")} />
                </div>
              </ButtonsRow>
            </AddRight>
          </Advertising>
          }
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;

const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
;
