import React from 'react'
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import SideNav from '../../components/LawyersDashboard/SideNav'
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NavBar from '../../components/LawyersDashboard/NavBar';
import SimpleAccordion from '../../components/LawyersDashboard/SimpleAccordion';
import { BarChart } from '../../components/LawyersDashboard/BarChart';
import "../../css/lawyerDash.css"
const LawyerDashboard = () => {
  return (
    <div className='bgColor'>
    <NavBar/>
    <Box height={55}/>
    <Box sx={{ display: "flex" }}>
        <SideNav/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         
        <Grid container spacing={2}  >
        <Grid item xs={8}>
        <Stack spacing={2} direction="row">
        <Card sx={{ minWidth: 49+'%', height:150 }} className='gradient'>
      <CardContent>
        <div >
          <CreditCardIcon className="iconStyle3"/>
        </div>
        <Typography gutterBottom variant="h5" component="div" 
     >
          $546.00
        </Typography>
        <Typography gutterBottom variant='body2' component={'div'} sx={{color: '#ccd1d1'}}>
          Total Earnings
        </Typography>

      </CardContent>
      
    </Card>
    <Card  sx={{ minWidth: 49+'%', height:150 }} className='gradientLight'>
      <CardContent>
        <div >
          <ShoppingBagIcon className="iconStyle3" />
        </div>
        <Typography gutterBottom variant="h5" component="div">
          $233.00
        </Typography>
        <Typography gutterBottom variant='body2' component={'div'} sx={{color: '#ccd1d1'}}>
          Total Orders
        </Typography>
        
      </CardContent>
      
    </Card>
    </Stack>
        </Grid>
        <Grid item xs={4}>
        <Stack spacing={2}>
        <Card className='gradientLight'>
      <Stack spacing={2} direction={'row'}> 
       <div className="iconStyle">

        <StorefrontIcon/>
       </div>
        <div className='paddingAll'>
          <span className='priceTitle'>$300k</span><br />
          <span className='priceSubTitle'>total revenue</span>
        </div>
        </Stack>
    </Card>
    <Card >
      <Stack spacing={2} direction={'row'}> 
       <div className="iconStyle2">

        <StorefrontIcon/>
       </div>
        <div className='paddingAll'>
          <span className='priceTitle'>$300k</span><br />
          <span className='priceSubTitle'>total revenue</span>
        </div>
        </Stack>
    </Card>
        </Stack>
        </Grid>
        <Grid item xs={8}>
        <Card sx={{ height:60+'vh' }}>
        <CardContent><BarChart/></CardContent>
      </Card>
        </Grid>
        <Grid item xs={4}>
        <Card sx={{ height:60+'vh' }}>
         <CardContent>
         <div className='paddingAll'>
         <span className='priceTitle'>Latest Cases</span><br />
         </div>
          <SimpleAccordion/>
         </CardContent>
      </Card>
        </Grid>
      </Grid>
       
      </Box>
    </Box>
    </div>
  )
}

export default LawyerDashboard
