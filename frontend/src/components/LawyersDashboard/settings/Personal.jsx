import React from 'react';
import { Box, Card, CardContent, Button, Typography, TextField } from '@mui/material';
import { Grid } from '@mui/material';

function Personal() {
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [eduDetail, setEduDetail] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [profileLink, setProfileLink] = React.useState('');
  const [address, setAddress] = React.useState('');

  const handlePersonalSubmit = () => {
    console.log('Personal info submitted!');
  };

  const handleContactSubmit = () => {
    console.log('Contact info submitted!');
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography sx={{ borderBottom: '2px solid #dcdcdc', pb: 2, mb: 2 }} variant='h4'>
                Personal Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                  label="License"
                  value={eduDetail}
                  onChange={(e) => setEduDetail(e.target.value)}
                />
                
                  <TextField
                  label="Bio"
                  multiline
                  rows={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button variant="contained" onClick={handlePersonalSubmit}>
                  Save Personal Info
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography sx={{ borderBottom: '2px solid #dcdcdc', pb: 2, mb: 2 }} variant='h4'>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                 <TextField
                  label="Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                  <TextField
                  label="Address"
                  value={address}
                  multiline
                  rows={4}
                  onChange={(e) => setAddress(e.target.value)}
                />
              
                <Button variant="contained" onClick={handleContactSubmit}>
                  Save Contact Info
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Personal;
