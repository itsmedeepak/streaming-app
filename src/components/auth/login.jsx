import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
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
  Link,
  CardContent,
  Card,
  Icon,
  CircularProgress
} from "@mui/material";
import Navbar from "../landing/navbar";
import Footer from "../landing/footer";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authReducer";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomTextField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      autoComplete="off"
      variant="outlined"
      fullWidth
      error={!!error}
      helperText={helperText}
      {...props}
    />
  );
};

// Login Component
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loader visibility

  const dispatch = useDispatch(); // Initialize dispatch

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!values.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the errors and try again");
      return;
    }

    setLoading(true); // Show loader

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          rememberMe, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user)); 
        localStorage.setItem("token", data.user.token); 
        toast.success("Login successful!");
        window.location.href = "/dashboard"; 
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - ZigyStream</title>
        <meta
          name="description"
          content="Login to ZigyStream to start streaming or join a live stream."
        />
        <meta
          name="keywords"
          content="ZigyStream login, live streaming login"
        />
      </Helmet>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            <Grid
              container
              spacing={2.5}
              component="form"
              onSubmit={handleSubmit}
            >
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="h5">Sign In</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Enter credentials to access your account.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  label="Email"
                  placeholder="johndoe@example.com"
                  value={values.email}
                  onChange={handleChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}
              >
                <FormControlLabel
                  label="Remember me"
                  control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link href="/sign-up" underline="none">
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Box>
      <Footer />

      {/* Toast Container for notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
