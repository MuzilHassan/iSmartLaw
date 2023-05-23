import React from 'react'

import NavBar from '../../components/LawyersDashboard/NavBar';
import SideNav from '../../components/LawyersDashboard/SideNav';
import { Box } from '@mui/material';
import Kanban from '../../components/LawyersDashboard/Kanban';
function KanbanBoard() {
    return (
        <>
        <div className="bgColor">
           <NavBar/>
        <Box height={60}/>
        <Box sx={{ display: "flex" }}>
            <SideNav/>
            <Box className='main' sx={{p:3, flexGrow:1}} > 
              <Kanban/>
            </Box>
        </Box>
        </div>
        </>
      )
}

export default KanbanBoard
