import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password should be same.');
    } else {
      setError('');
      // code to change the password
    }
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto' }}>
      <Typography sx={{ borderBottom: '2px solid #dcdcdc', pb: 2, mb: 2 }} variant='h4'>
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
            {error && (
              <Box sx={{ color: 'red', marginBottom: '1rem' }}>{error}</Box>
            )}
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
