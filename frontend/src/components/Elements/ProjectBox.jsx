import React from "react";
import styled from "styled-components";

export default function ProjectBox({ img, title, text, action,id, rank, category}) {
  console.log(id)
  return (
    <Wrapper>
      <ImgBtn className="aniamte pointer" onClick={action ? () => action() : null}>
        <img className="radius8" src={img} alt="project" style={{height:"309px", width:'330px'}}></img>
      </ImgBtn>
      <h3 className="font20 extraBold">{title}</h3>
      {
        rank ? (

          <p className="font10 italic">Rank: {rank} in {category} law</p>
        ) : ''
      }
      <div className="text-container" style={{display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',}}>
      <p className="font13">{text}</p>
      </div>
     
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  img {
    width: 100%;
    height: auto;
    margin: 20px 0;
  }
  h3 {
    padding-bottom: 10px;
  }
 
`;
const ImgBtn = styled.button`
  background-color: transparent;
  border: 0px;
  outline: none;
  padding: 0px;
  margin: 0px;
  :hover > img {
    cursor:pointer
  }
`;