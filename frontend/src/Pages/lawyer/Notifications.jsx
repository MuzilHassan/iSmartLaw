
import React from 'react'
import { Box } from '@mui/material';
import NavBar from '../../components/LawyersDashboard/NavBar';
import SideNav from '../../components/LawyersDashboard/SideNav';
import NotificationsTabs from '../../components/LawyersDashboard/notifications/NotificationsTabs';

function  Notifications() {
 

    return (
        <>
        <div className="bgColor">
           <NavBar/>
        <Box height={70} />
        <Box sx={{ display: "flex",  }} >
            <SideNav/>
            <Box className='main' sx={{p:3, flexGrow:1}} > 
            <NotificationsTabs/>
            </Box>
        </Box>
        </div>
        </>
      )
}

export default  Notifications