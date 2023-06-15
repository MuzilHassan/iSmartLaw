import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as ml } from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { Link as Link1 } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-hot-toast";
import { styled } from "@mui/system";

import { useNavigate } from "react-router-dom";

import { showLoading, hideLoading } from "../redux/alertSlice";

import { useFormik } from "formik";
import * as Yup from "yup";
const CustomTextField = styled(TextField)({
  "& input:-webkit-autofill": {
    WebkitTextFillColor: "blue", // Set the text color to blue
  },
  "& input:-webkit-autofill::first-line": {
    fontSize: "inherit", // Reset the font size to match the original style
  },
});
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <ml color="inherit" href="https://mui.com/">
        iSmartLaw
      </ml>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = Yup.object({
    email: Yup.string().email("please enter a Valid Email"),
    password: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        try {
          dispatch(showLoading());
          const response = await axios.post("/api/client/login", values);
          dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            toast("Redirecting to home page");
            localStorage.setItem("token", response.data.data);
            console.log(response.data.data);
            navigate("/");
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          dispatch(hideLoading());
          toast.error("Something went wrong");
          console.log(err);
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message });
      }
    },
    validationSchema: schema,
  });
  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataa = new FormData(event.currentTarget);
    const dat = {
      email: dataa.get("email"),
      password: dataa.get("password"),
    };
    try {
      //dispatch(showLoading());
      const response = await axios.post("/api/client/login", dat);
      // dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      // dispatch(hideLoading());
      console.log(err);
    }
  };
*/
  return (
    <>
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
              Client Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              validate
              sx={{ mt: 1, color: "blue" }}
            >
              <CustomTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={formik.errors.email}
                helperText={formik.errors.email}
                onChange={formik.handleChange}
                autoComplete="email"
                autoFocus
              />
              <CustomTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={formik.errors.password}
                onChange={formik.handleChange}
                helperText={formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link1 to={"#"} variant="body2">
                    Forgot password?
                  </Link1>
                </Grid>
                <Grid item>
                  <Link1 to={"/clientSignup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link1>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
