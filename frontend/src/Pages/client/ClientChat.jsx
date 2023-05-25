import React from 'react'
import { Box } from '@mui/material';
import TopNavbar from '../../components/Nav/TopNavbar'
import ChatDialog from '../../components/Chat/ChatDialog';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';

function ClientChat() {
  const history = useNavigate();
  return (
    <>      
            <Box  >
            <ButtonBase
  
  variant="outlined"
  startIcon={<ArrowBackIcon />}
  onClick={() => history(-1)}
  sx={{
  
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
    border: 'none',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    outline:'none',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  }}
>Go Back
</ButtonBase>

            <Box className='main' sx={{ flexGrow:1,  }} > 
              <ChatDialog/>
            </Box>
        </Box>
            
      
    </>
  )
}

export default ClientChat
