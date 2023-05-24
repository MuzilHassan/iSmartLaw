
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AssignJudgeInfo from "./assignJudgeInfo";


function assignJudge() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
       
        <SoftBox my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={15}>
              <AssignJudgeInfo/>
            </Grid>
            
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default assignJudge;
