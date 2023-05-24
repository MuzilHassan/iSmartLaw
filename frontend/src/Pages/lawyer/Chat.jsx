import React from 'react'
import { Box } from '@mui/material';
import NavBar from '../../components/LawyersDashboard/NavBar';
import SideNav from '../../components/LawyersDashboard/SideNav';
//import ChatLayout from '../../components/LawyersDashboard/Chat/ChatLayout';
import ChatDialog from '../../components/Chat/ChatDialog';
function Chat() {
  return (
    
        <>
        <div className="bgColor" style={{overflowY:'hidden'}}>
           <NavBar/>
        
        <Box sx={{ display: "flex",  }} >
            <SideNav/>
            <Box className='main' sx={{pt:8, flexGrow:1,  }} > 
              <ChatDialog/>
            </Box>
        </Box>
        </div>
        </>
      
  )
}

export default Chat
