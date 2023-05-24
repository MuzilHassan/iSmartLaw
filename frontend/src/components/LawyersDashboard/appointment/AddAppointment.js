import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import axios from "axios";
function AddAppointment({ closeEvent }) {
  const [clientsName, setClientsName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);

  const isSubmitDisabled = !clientsName || !phoneNumber || !appointmentDateTime;
  const handleAddAppointment = async () => {
    try {
      const response = await axios.post(
        "/api/bookings/create-appointment/",
        { name: clientsName, phoneNumber, date: appointmentDateTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Handle successful response
      console.log(response.data);
      // Reset form fields
      setClientsName("");
      setPhoneNumber("");
      setAppointmentDateTime(null);
      // Close the modal or perform any other action
      closeEvent();
    } catch (error) {
      // Handle error
      console.log(error.message);
    }
  };
  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography variant="h5" align="center">
          Add New Appointment
        </Typography>
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Clients Name"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={clientsName}
              onChange={(e) => setClientsName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Appointment date and time"
                  value={appointmentDateTime}
                  onChange={(newValue) => setAppointmentDateTime(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Button
              variant="contained"
              disabled={isSubmitDisabled}
              fullWidth
              color="secondary"
              onClick={handleAddAppointment}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ m: 2 }} />
      </Box>
    </>
  );
}

export default AddAppointment;
