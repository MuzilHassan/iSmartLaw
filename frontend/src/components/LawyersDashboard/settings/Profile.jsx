import React, { useState,useEffect } from 'react';
import { Box, Card, CardContent, Button, Typography,} from '@mui/material';
import axios from "axios"
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

import { useSelector } from 'react-redux';
function Profile() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useSelector(state => state.user);
  
 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploading(true);
    // Upload file to server and get the URL
    // In this example, we will just set a fake URL after 2 seconds
    setImage(URL.createObjectURL(file));
    setUploading(false)
  }
  console.log(user)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', image);
     

      const response = await axios.post('/api/lawyer/update-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log('Profile picture updated successfully');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Box sx={{ width: '97%', margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={4} >
          <Card>
            <CardContent>
             
              <Box
                sx={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'contain',
                  mb: 2,
                  border: '1px solid lightgray',
                  borderRadius: '75px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded profile"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    {uploading ? (
                      <Typography variant="body1">Uploading...</Typography>
                    ) : (
                      
                        <img src={`http://localhost:5000/uploads/${user?.profilePicture}`} style={{ objectFit: 'cover', width: '100%', height: '70%'}} alt={"Profile Picture"} />
                       
                      
                    )}
                  </Box>
                )}
              </Box>
              {image ? (
                
                <Button variant="outlined" component="span" sx={{ mt: 2 }} onClick={handleSave}>
                  Save Image
                </Button>
              ):(
                <label htmlFor="upload-image">
                <input type="file" id="upload-image" style={{ display: 'none' }} onChange={handleImageUpload} />
                <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                  Upload Image
                </Button>
              </label>

              )}
              
              <Stack >

               
                  <Box sx={{display:'flex', alignItems:"center",justifyContent:"start", mt:2,borderBottom: '2px solid #dcdcdc'}}>
                    <EmailIcon sx={{mr:1}}/>
                    <Typography variant="subtitle1" p={3} fontSize={22}> {user?.email}</Typography>
                  </Box>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:"start", mt:2,borderBottom: '2px solid #dcdcdc'}}>
                    <PhoneIcon sx={{mr:1}}/>
                    <Typography variant="subtitle1" p={3} fontSize={22}> {user?.phone}</Typography>
                  </Box>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:"start", mt:2,borderBottom: '2px solid #dcdcdc'}}>
                    <LanguageIcon sx={{mr:1}}/>
                    <Typography variant="subtitle1" p={3} fontSize={22}>www.johndoe.com</Typography>
                  </Box>
               
                </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" borderBottom={'2px solid #dcdcdc'} pr={3} pb={3} pt={3} fontWeight={"500"} sx={{mb:2}}>About Me</Typography>
              <Typography>{user?.about}</Typography>
                <Typography variant="h5" borderBottom={'2px solid #dcdcdc'} pr={3} pb={3} pt={3} fontWeight={"500"} sx={{mb:2}}>Details</Typography>
                <Box sx={{display:'flex', alignItems:"center",justifyContent:"start", mt:2,borderBottom: '2px solid #dcdcdc'}}>
                    <Typography p={1} fontSize={20} fontWeight={'500'}>Name:</Typography>
                    <Typography variant="subtitle1" p={1} fontSize={20}>{user?.name}</Typography>
                  </Box>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:"start", mt:2,borderBottom: '2px solid #dcdcdc'}}>
                   <Typography p={1} fontSize={20} fontWeight={'500'}>Address:</Typography>
                    <Typography variant="subtitle1" p={1} fontSize={22}>  {user?.address}</Typography>
                  </Box>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:"start", mt:2,borderBottom: '2px solid #dcdcdc'}}>
                    <Typography p={1} fontSize={20} fontWeight={'500'}>License:</Typography>
                    <Typography variant="subtitle1" p={1} fontSize={20}>{user?.license}</Typography>
                  </Box>
                 
                </CardContent>
              </Card>
            </Grid>
            
        </Grid>

    </Box>
    
  )
}

export default Profile;
