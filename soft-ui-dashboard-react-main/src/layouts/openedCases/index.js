/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import OpenedInformation from "./openedInformation";
import { useState, useEffect } from "react";
import axios from "axios";
function openedCases() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/cases/accepted");

      setData(response.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={15}>
              <OpenedInformation data={data} />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default openedCases;
