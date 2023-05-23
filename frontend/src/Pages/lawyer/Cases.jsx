import React from 'react'
import { Box } from '@mui/material';
import NavBar from '../../components/LawyersDashboard/NavBar';
import SideNav from '../../components/LawyersDashboard/SideNav';
import CasesTabs from '../../components/LawyersDashboard/Cases/CasesTab';

function Cases() {
    return (
        <>
        <div className="bgColor">
           <NavBar/>
        <Box height={70} />
        <Box sx={{ display: "flex",  }} >
            <SideNav/>
            <Box className='main' sx={{p:3, flexGrow:1}} > 
              <CasesTabs/>
            </Box>
        </Box>
        </div>
        </>
      )
}

export default Cases