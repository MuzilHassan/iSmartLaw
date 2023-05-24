import React, { useEffect,useState } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatHeader from './ChatHeader';
import Messages from './Messages';


const ChatBox = () => {
  const { person } = useSelector((state) => state.person);
  const { user } = useSelector((state) => state.user);
  const [converssationId,setConversationId]=useState(null);
  const getConversation=async(data)=>{
    try {
      let response = await axios.post(`/api/conversation/get`,data);
      if(!response){
        console.log("something not right")
        return;
      }
      setConversationId(response.data)
  } catch (error) {
      console.log('Error while calling getConversation API ', error);
  }
  }
  useEffect(()=>{
     let data={
      senderId:user.id,
      receiverId:person._id
     }
     
     getConversation(data)
     
  },[person])
  
  return (
    <Box sx={{height:"100vh"}}>
      <ChatHeader person={person}/>
      <Messages person={person} conversationId={converssationId}/>

    </Box>
  )
}

export default ChatBox
