import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password should be the same.');
    } else {
      setError('');

      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          '/api/lawyer/change-password',
          {
            oldPassword: currentPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message); // Password changed successfully
        } else {
          console.error(response.data.message); // Error message from the backend
        }
      } catch (error) {
        console.error('Error while changing password', error);
      }
    }
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto' }}>
      <Typography sx={{ borderBottom: '2px solid #dcdcdc', pb: 2, mb: 2 }} variant="h4">
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Password"
              variant="outlined"
              value={currentPassword}
              onChange={(event) => handleChange(event, setCurrentPassword)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(event) => handleChange(event, setNewPassword)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(event) => handleChange(event, setConfirmPassword)}
            />
          </Grid>
          <Grid item xs={12}>
            {error && <Box sx={{ color: 'red', marginBottom: '1rem' }}>{error}</Box>}
            <Button variant="contained" type="submit">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ChangePassword;
