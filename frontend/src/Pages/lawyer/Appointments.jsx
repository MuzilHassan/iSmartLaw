import React from 'react'
import { Box } from '@mui/material';
import NavBar from '../../components/LawyersDashboard/NavBar';
import SideNav from '../../components/LawyersDashboard/SideNav';
import ApoinmentTabs from '../../components/LawyersDashboard/appointment/ApoinmentTabs';
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from '../../redux/alertSlice';
function Appointments() {
 

    return (
        <>
        <div className="bgColor">
           <NavBar/>
        <Box height={70} />
        <Box sx={{ display: "flex",  }} >
            <SideNav/>
            <Box className='main' sx={{p:3, flexGrow:1}} > 
              <ApoinmentTabs/>
            </Box>
        </Box>
        </div>
        </>
      )
}

export default Appointments
