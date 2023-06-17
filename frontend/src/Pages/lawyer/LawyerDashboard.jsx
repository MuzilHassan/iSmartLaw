import React,{useEffect,useState} from 'react'
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
 import axios from 'axios';
 import { useSelector } from 'react-redux';
const LawyerDashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue1, setTotalRevenue1] = useState(0);
  const [totalRevenue2, setTotalRevenue2] = useState(0);
  const [latestCases,setLatestCases]=useState([])
  const {user}=useSelector((state)=>state.user);
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
    
        const [pendingPaymentsResponse, paidPaymentsResponse,caseLatest] = await Promise.all([
          axios.get(`/api/lawyer/payments/pending/${user.id}`),
          axios.get(`/api/lawyer/payments/paid/${user.id}}`),
          axios.get(`/api/lawyer/cases/latest/${user.id}}`),
          
        ]);

        
        const totalPendingAmount = pendingPaymentsResponse.data.totalPendingAmount || 0;
        const totalPaidAmount = paidPaymentsResponse.data.totalPaidAmount || 0;

        // Update the state variables
        setTotalEarnings(totalPendingAmount + totalPaidAmount);
        setTotalOrders(totalPendingAmount); 
        setTotalRevenue1(totalPaidAmount);
        setTotalRevenue2(totalPaidAmount); 
        setLatestCases(caseLatest.data)
        console.log(caseLatest)
      } catch (error) {
        console.error("Error while fetching payment data:", error);
      }
    };

    fetchData();
  }, []);

 console.log(latestCases,"124")

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
          {totalEarnings}
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
         {totalOrders}
        </Typography>
        <Typography gutterBottom variant='body2' component={'div'} sx={{color: '#ccd1d1'}}>
          Amount Pendings
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
          <span className='priceTitle'>{totalRevenue1}</span><br />
          <span className='priceSubTitle'>total amount received</span>
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
          <SimpleAccordion case={latestCases}/>
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
