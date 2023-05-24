import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

// API endpoints (example placeholders)
const API_ENDPOINTS = {
  totalUsers: "http://localhost:5000/api/admin/get-totalusers",
  totalClients: "http://localhost:5000/api/admin/get-totalclients",
  totalLawyers: "http://localhost:5000/api/admin/get-totallawyers",
  totalCases: "http://localhost:5000/api/admin/get-totallcases",
  registration: "http://localhost:5000/api/admin/registrations",
};

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  // State variables to hold the fetched data
  const [totalUsers, setTotalUsers] = useState("");
  const [totalClients, setTotalClients] = useState("");
  const [totalLawyers, setTotalLawyers] = useState("");
  const [totalCases, setTotalCases] = useState("");
  const [response, setResponse] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get(API_ENDPOINTS.totalUsers);
        const clients = await axios.get(API_ENDPOINTS.totalClients);
        const lawyers = await axios.get(API_ENDPOINTS.totalLawyers);
        const cases = await axios.get(API_ENDPOINTS.totalCases);
        const registration = await axios.get(API_ENDPOINTS.registration);
        setTotalUsers(users?.data.count);
        setTotalClients(clients?.data.count);
        setTotalLawyers(lawyers?.data.count);
        setTotalCases(cases?.data.count);
        setResponse(registration);
        console.log(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = [
    {
      label: "Clients",
      color: "success",
      data: response?.data?.clientRegistrations ?? [0, 56, 7, 8, 9, 0],
    },
    {
      label: "Lawyers",
      color: "dark",
      data: response?.data?.lawyerRegistrations ?? [6, 8, 90, 4],
    },
  ];

  const result = {
    labels,
    datasets,
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Users" }}
                count={totalUsers}
                icon={{ color: "success", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Registered Cases" }}
                count={totalCases}
                icon={{ color: "success", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Registered Clients" }}
                count={totalClients}
                icon={{ color: "success", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Registered Lawyers" }}
                count={totalLawyers}
                icon={{
                  color: "success",
                  component: "paid",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={15}>
              <GradientLineChart title="Registered Users" height="20.25rem" chart={result} />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
