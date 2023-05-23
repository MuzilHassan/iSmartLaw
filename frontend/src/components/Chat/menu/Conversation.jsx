import React from 'react';

import { styled, Box, Typography } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import axios from 'axios';
import {setPerson} from "../../../redux/personSlice"

import asd from "../../../assets/img/ProfilePicture-1679239292550-408532255.jpeg";

const Component = styled(Box)`
    height: 70px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
    align-items:center
`;
    
const Image = styled('img') ({
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: '50%',
    padding:"14px"
    
});

const Container = styled(Box)`
    display: flex;
    
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
`;

const Conversation = ({ usr }) => {
    const dispatch= useDispatch();
    console.log(usr)
    const {user}=useSelector((state)=>state.user)

    const setConversation = async (data) => {
        try {
            await axios.post(`/api/conversation/add`, data);
        } catch (error) {
            console.log('Error while calling setConversation API ', error);
        }
    }
    const getUser=async()=>{
        dispatch(setPerson(usr));
       
        const data={
            senderId:user.id,
            receiverId:usr._id
        }
        console.log(data)
        await setConversation(data);
    }
    return (
        <Component onClick={()=>getUser()}>
            <Box>
                <Image src={asd}/> 
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography>{usr.name}</Typography>
                    
                </Container>
                <Box>
                    <Text>Muzil</Text>
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation;