import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import {toast} from "react-hot-toast"
function AddCase({ closeEvent }) {
  const [clientEmail, setClientEmail] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [error, setError] = useState('');

  const isSubmitDisabled = !clientEmail || !caseType || !caseDescription || !appointmentDateTime;

  const handleAddAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/lawyer/add-case',
        {
          clientEmail,
          caseType,
          caseDescription,
          date: appointmentDateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("New case Request submitted succssfully")
      console.log(response.data);
      // Reset form fields
      setClientEmail('');
      setCaseType('');
      setCaseDescription('');
      setAppointmentDateTime(null);
      // Close the modal or perform any other action
      closeEvent();
    } catch (error) {
      
      console.log(error.message);
      toast.error('Error while adding a new case');
    }
  };

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography variant="h5" align="center">
          Add New Case
        </Typography>
        <IconButton
          style={{ position: 'absolute', top: '0', right: '0' }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="client-email"
              label="Client Email"
              variant="outlined"
              size="small"
              sx={{ minWidth: '100%' }}
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="case-type"
              label="Case Type"
              variant="outlined"
              size="small"
              sx={{ minWidth: '100%' }}
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="case-description"
              label="Case Description"
              variant="outlined"
              size="small"
              sx={{ minWidth: '100%' }}
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label=""
                  value={appointmentDateTime}
                  onChange={(newValue) => setAppointmentDateTime(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            {error && (
              <Box sx={{ color: 'red', marginBottom: '1rem' }}>{error}</Box>
            )}
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

export default AddCase;
