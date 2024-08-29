import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CardContent,
  Icon,
  Link,
  CircularProgress
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../landing/navbar";
import Footer from "../landing/footer";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";

const CustomTextField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  ...props
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      variant="outlined"
      autoComplete="off"
      fullWidth
      {...props}
    />
  );
};

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false); // State to manage loader visibility

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleCheckboxChange = (event) => {
    setValues({ ...values, agreeToTerms: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.password) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!values.agreeToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true); // Show loader

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/sign-up`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );

      toast.success("Sign-up successful!");
      setTimeout(() => {
        navigate("/sign-in"); 
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - ZigyStream</title>
        <meta
          name="description"
          content="Sign up for ZigyStream to create and start your own live streams."
        />
        <meta
          name="keywords"
          content="ZigyStream sign up, live streaming sign up"
        />
      </Helmet>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            maxWidth: 390,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">Sign Up</Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Create an account to get started.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Name"
                    placeholder="John Doe"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Email"
                    placeholder="johndoe@example.com"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Password"
                    value={values.password}
                    onChange={handleChange("password")}
                    type={values.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPassword}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="toggle password visibility"
                          >
                            <Icon>
                              {values.showPassword ? (
                                <IoEyeOutline />
                              ) : (
                                <IoEyeOffOutline />
                              )}
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}
                >
                  <FormControlLabel
                    label="I agree to the terms and conditions"
                    control={
                      <Checkbox
                        checked={values.agreeToTerms}
                        onChange={handleCheckboxChange}
                      />
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "100%" }}
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", marginTop: 0 }}>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link href="/sign-in" underline="none">
                      Log In
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Box>
      </Box>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default SignUp;
