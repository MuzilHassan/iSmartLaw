import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import toast from "react-hot-toast";
import axios from "axios";

function RequestAppointment({ closeEvent, bookingId }) {
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
      const response = await axios.post(
        `/api/bookings/`,
        { appointmentDate: appointmentDateTime,bookingId:bookingId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     toast.success(response.data.message);
      closeEvent();
      console.log(response.data);
    } catch (error) {
      // Handle error
     toast.error(error.message);
    }
  };

  return (
    <Modal show={true} onHide={closeEvent} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Select Appoinment date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label={"date"}
              value={appointmentDateTime}
              onChange={(newValue) => setAppointmentDateTime(newValue)}
              disablePast 
            />
          </DemoContainer>
        </LocalizationProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeEvent}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={isSubmitDisabled}
          onClick={handleEditAppointment}
        >
          Submit request
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestAppointment;
