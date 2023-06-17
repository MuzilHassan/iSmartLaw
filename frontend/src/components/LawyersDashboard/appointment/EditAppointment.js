import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { toast } from "react-hot-toast";
import axios from "axios";

function EditAppointment({ closeEvent, bookingId, appointmentDate }) {
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);

  const isSubmitDisabled = !appointmentDateTime;

  const formatDate = (dateTimeString) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", options);
  };

  const handleEditAppointment = async () => {
    try {
      const response = await axios.put(
        `/api/bookings/change-appointment-date/${bookingId}`,
        { appointmentDate: appointmentDateTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Date and time changed successfully");
      closeEvent();
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography variant="h5" align="center">
          Edit Appointment Details
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label={formatDate(appointmentDate)}
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
              onClick={handleEditAppointment}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ m: 2 }} />
      </Box>
    </>
  );
}

export default EditAppointment;
