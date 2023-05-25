import React from "react";
import styled from "styled-components";
// Assets
import RollerIcon from "../../assets/svg/Services/icons8-law-48.png";
import MonitorIcon from "../../assets/svg/Services/icons8-scales-48.png";
import BrowserIcon from "../../assets/svg/Services/icons8-court-48.png";
import PrinterIcon from "../../assets/svg/Services/icons8-term-48.png";

export default function ServiceBox({icon, title, subtitle}) {
  let getIcon;

  switch (icon) {
    case "roller":
      getIcon = <img src={RollerIcon} alt=""  />;
      break;
    case "monitor":
      getIcon = <img src={MonitorIcon} alt=""/>;
      break;
    case "browser":
      getIcon = <img src={BrowserIcon} alt=""/>;
      break;
    case "printer":
      getIcon =<img src={PrinterIcon} alt=""/>;
      break;
    default:
      
      break;
  }


  return (
    <Wrapper className="flex flexColumn">
      <IconStyle>{getIcon}</IconStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font15">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;