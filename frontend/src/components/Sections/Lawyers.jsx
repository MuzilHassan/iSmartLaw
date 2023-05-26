import React ,{ useState, useEffect }from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { InputAdornment,Container} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Details from "./Details";
import picture1 from "../../assets/img/add/add2.png";
import {  useSelector } from "react-redux";
export default function Projects() {
  const navigate= useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [lawyers, setLawyers] = useState([]);
  const [page, setPage] = useState(1);
  
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [trigger, setTrigger] = useState(false)
  const getAllLawyers = async (page) => {
    try {
      const response = await axios.get(`/api/lawyer/all-lawyers?page=${page}`);
      const { success, users } = response.data;

      if (success) {
        setLawyers((prevLawyers) => [...prevLawyers, ...users]);
        // setTrigger(!trigger)
      } else {
        
      }
    } catch (error) {
      // Handle error
    }
  };

  const topRanked = async (category) => {
    try {
      const response = await axios.get(`/api/lawyer/search/${category}`);
      const { success, users } = response.data;
      
      // if (success) {
        setLawyers(response.data);
        console.log("data in topRanked: ", lawyers);
      // } else {
        // Handle error
      
    } catch (error) {
      // Handle error
    }
  };
  

  useEffect(() => {
    if (searchTerm) {
      topRanked(searchTerm);
    } else {
      getAllLawyers(page);
    }
  }, [page, searchTerm, trigger]);

  
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  console.log("All data: ", lawyers)
  /*
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
  */
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const handleSelectLawyer = (lawyer) => {
    setSelectedLawyer(lawyer);
    setModalShow(true);
  };

  // console.log(lawyers)
  return (
    <Wrapper id="lawyers">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Attorneys</h1>
            <p className="font18">
             Our attorneys are legal professionals who provide advice and representation to clients in legal matters.
              <br />
              They are trained and licensed to practice law and are responsible for upholding the law and ensuring that justice is served.
            </p>
          </HeaderInfo>


          {user && 
 <div className="row textCenter">
<div
className="col-xs-12 col-sm-4 col-md-4 col-lg-4 mt-2">

      <TextField
        id="search"
        type="search"
        label="Search by category like: civil, criminal, corporate, family etc"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 1050 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
   
   </div>

</div>
}
         

          <div className="row textCenter">
            
        
            
          <div className="row textCenter">
            
            {lawyers.map((lawyer) => (
              <div
                className="col-xs-12 col-sm-4 col-md-4 col-lg-4 "
                
              >
                
                <ProjectBox
                  img={ lawyer.profilePicture?`http://localhost:5000/uploads/${lawyer.profilePicture}`:picture1 }
                  title={lawyer.name}
                  text={lawyer.about}
                  id={lawyer._id}
                  action={() => handleSelectLawyer(lawyer)}
                  rank ={searchTerm ? lawyer.bestLawerRank : ''}
                  category ={searchTerm ? lawyer.category : ''}
                />
              </div>
            ))}
          </div>
          <Details
            show={modalShow}
            onHide={() => setModalShow(false)}
            img={
              selectedLawyer &&
              selectedLawyer.profilePicture?`http://localhost:5000/uploads/${selectedLawyer.profilePicture}`:picture1
            }
            lawyer={selectedLawyer}
            name={selectedLawyer?.name}
            about={selectedLawyer?.about}
            phone={selectedLawyer?.phone}
            address={selectedLawyer?.address}
            id={selectedLawyer?._id}
          />

          </div>
                    
          <div className="row flexCenter">
            {
              lawyers.length >= 6 ? (
                <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Load More" action={handleLoadMore} />
            </div>
              ) : null
            }
          </div>

          {lawyers.length ==0 ? (
            <h3 style={{ paddingTop:'3rem', paddingBottom:'5rem'}}>No data available for this category</h3>
          ):''}
          
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
