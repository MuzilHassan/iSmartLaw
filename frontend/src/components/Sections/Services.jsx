import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
// Components
import ClientSlider from "../Elements/ClientSlider";
import ServiceBox from "../Elements/ServiceBox";
import FullButton from "../Buttons/FullButton";
// Assets
import { useDispatch, useSelector } from "react-redux";

export default function Services() {
  const navigate= useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <Wrapper id="services">
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div>
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold"> Services</h1>
            <p className="font13">
            Civil law is the body of laws that govern the rights and 
              <br />
              responsibilities of citizens and non-criminal matters, including contracts and property.
            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="roller"
                title="Property Laws"
                subtitle="roperty law is a general term for the law that governs the ownership, sale, and transfer of property– tangible and intangible things that a person owns. Property 
                law defines the rules between parties that are involved with buying and selling land or items."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="monitor"
                title="Contract Laws"
                subtitle="Contract laws pertain to agreements made between two or
                 more parties in a binding agreement, where both parties intend to fulfill their end of the agreement. 
                If one party does not fulfill its obligation, the other party has legal recourse against them."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="browser"
                title="Family Laws"
                subtitle="Generally, family law is concerned with issues such as marriage,
                 divorce, child custody, adoption, birth, child support, and other matters
                  that concern families. This branch of civil law does not necessarily require that a person has committed a civil wrong. 
                  The family court is responsible for dividing up property and finances during a divorce,
                 as well as establishing child custody, child support, and spousal support."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox icon="printer" title="Domestic Arbitration" subtitle="We only provide arbitration sevices for domestic problems" />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>
        <div className="lightBg " id="registerButtons">
    <div className="container">
      {!user&&

      <Advertising className="flexSpaceCenter">
        <AddLeft>
          
          <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0"}}>
            <div style={{ width: "300px" }}>
              
              <FullButton title="Register as Lawyer" action={() => navigate("/lawyerSignup")} />
              
            </div>
            <div style={{ width: "300px", marginLeft: "15px" }}>
              <FullButton title="Register as Client" action={() => navigate("/clientSignup")} border />
            </div>
            <div style={{ width: "300px" ,marginLeft: "15px"}}>
              <FullButton title="Register as Judge" action={() => alert("clicked")} />
            </div>
           
          </ButtonsRow>
        </AddLeft>
        
      </Advertising>
      }
    </div>
  </div>
  
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
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
const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;


