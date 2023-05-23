import { styled, Box, Paper } from '@mui/material';
import React from 'react';
import ChatMenu from './menu/ChatMenu';
import EmptyChat from './Messages/EmptyChat';
import ChatBox from './Messages/ChatBox';

import { useSelector } from "react-redux";
const dialogStyle = {
  height: '100%',
  width: '100%',
  
 
  backgroundColor: '#fff',
};

const Component= styled(Box)`
display:flex;
`
const LeftComponent=styled(Box)`
min-width:30%;
border-right: 1px solid #DCDCDC;
`
const RightComponent=styled(Box)`
min-width:70%;
height:100%;

`
const ChatDialog = () => {
  const { person } = useSelector((state) => state.person);
  return (
   <Box sx={{ display: "flex",
   height: "100vh",
   overflowY: "hidden",}}
  
   >

    <Paper
      sx={dialogStyle}
      variant='outlined'
      elevation={0}
    >
      <Component >
        <LeftComponent ><ChatMenu/></LeftComponent>
        <RightComponent>
          {
            
            person === null ? <EmptyChat /> : <ChatBox />
          }
          </RightComponent>
      </Component>
    </Paper>
   </Box> 
  );
};

export default ChatDialog;
