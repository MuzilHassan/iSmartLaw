import React from 'react'
import NavBar from '../../components/LawyersDashboard/NavBar';
import SideNav from '../../components/LawyersDashboard/SideNav';
import { Box } from '@mui/material';
import List from '../../components/LawyersDashboard/settings/List';
function Settings() {
  return (
    <>
    <div className="bgColor">
       <NavBar/>
    <Box height={60}/>
    <Box sx={{ display: "flex" }}>
        <SideNav/>
        <Box className='main' sx={{p:3, flexGrow:1}} > 
           <List/>
        </Box>
    </Box>
    </div>
    </>
  )
}

export default Settings
