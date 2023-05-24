// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import QueriesInfo from "./queriesInfo";
import { useEffect, useState } from "react";
import axios from "axios";

function queries() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get-userQueries");

      setData(response.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={15}>
              <QueriesInfo data={data} />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default queries;
