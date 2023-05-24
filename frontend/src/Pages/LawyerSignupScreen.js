import react from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { Link as Link1 } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function LawyerSignUp() {
  const navigate = useNavigate();
  const phoneRegExp = "^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$";

  const schema = Yup.object({
    email: Yup.string().email("please enter a Valid Email"),
    password: Yup.string().min(8, "password is not secure"),
    name: Yup.string(),
    city: Yup.string(),
    address: Yup.string(),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      city: "",
      address: "",
      phone: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        try {
          console.log(values);
          const response = await axios.post("/api/lawyer/register", values);
          if (response.data.success) {
            console.log(values);
            toast.success(response.data.message);
            navigate("/lawyerSignIn");
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message });
      }
    },
    validationSchema: schema,
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Lawyer Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    onChange={formik.handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={formik.errors.email}
                    helperText={formik.errors.email}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="filled"
                    name="city"
                    label="City name"
                    type="city"
                    id="city"
                    autoComplete="city"
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="address"
                    label="Complete adress"
                    type="address"
                    id="address"
                    autoComplete="address"
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="license"
                    label="License number"
                    type="license"
                    id="license"
                    autoComplete="license"
                    onChange={formik.handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="phone number"
                    type="phone"
                    id="phone"
                    autoComplete="new-phone"
                    error={formik.errors.phone}
                    helperText={formik.errors.phone}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={formik.errors.password}
                    helperText={formik.errors.password}
                    onChange={formik.handleChange}
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link1 to={"/lawyerSignIn"} variant="body2">
                    Already have an account? Sign in
                  </Link1>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
