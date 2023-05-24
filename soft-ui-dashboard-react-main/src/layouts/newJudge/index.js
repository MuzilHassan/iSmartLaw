import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import axios from "axios";

function NewJudge() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    serviceNumber: "",
    court: "",
    courtAddress: "",
  });

  const handleClick = async () => {
    try {
      // Send the form data to the backend
      const response = await axios.post("http://localhost:5000/api/admin/addJudge", formData);

      // Handle the response from the backend
      const data = response.data;

      // Display alert message based on the response
      if (data.success == true) {
        alert("Registration successful!");
      } else {
        alert("Account already exists");
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        serviceNumber: "",
        courtName: "",
        courtAddress: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    // Update the corresponding form field in the state
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <h1 mx={50}>Register New Judge</h1>
        <SoftBox my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <SoftInput
                placeholder="Honourable Judge Name"
                size="small"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
              <br />

              <SoftInput
                placeholder="Honourable Judge Email"
                size="small"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              <br />

              <SoftInput
                placeholder="Honourable Judge Password"
                size="small"
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
              />
              <br />

              <SoftInput
                placeholder="Contact Number"
                size="small"
                value={formData.contactNumber}
                onChange={handleChange}
                name="phone"
                type="number"
              />
              <br />

              <SoftInput
                placeholder="Residential Address"
                size="small"
                value={formData.address}
                onChange={handleChange}
                name="address"
                type="text"
              />
              <br />

              <SoftInput
                placeholder="Honourable Judge Service No."
                size="small"
                value={formData.serviceNumber}
                onChange={handleChange}
                name="serviceNumber"
              />
              <br />

              <SoftInput
                placeholder="Court Name"
                size="small"
                value={formData.court}
                onChange={handleChange}
                name="court"
              />
              <br />

              <SoftInput
                placeholder="Court Address"
                size="small"
                value={formData.courtAddress}
                onChange={handleChange}
                name="courtAddress"
              />
              <br />

              <SoftBox display="flex" alignItems="center" lineHeight={0} sx={{ cursor: "pointer" }}>
                <SoftButton
                  variant="outlined"
                  color="success"
                  size="small"
                  width="20rem"
                  onClick={handleClick}
                >
                  &nbsp;Register
                </SoftButton>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewJudge;
