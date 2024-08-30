import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
  FormControl,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    mobileNumber: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!validator.isEmail(formData.email)) newErrors.email = "Invalid email address.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required.";

    // Set errors if any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post("http://localhost:7070/signUp", formData)
      .then((res) => {
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        console.log("Response data:", res.data.token);
        toast.success("Sign Up Successful!");
        navigate("/signIn");
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
        toast.error("Sign Up Failed!");
      });



    // Clear errors after successful submission
    setErrors({});
  };

  return (
    <div
      className="d-flex align-item-center justify-content-around"
      style={{
        backgroundImage: "url(./banner2.jpg)",
        backgroundRepeat: "none",
        padding: "5rem",
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "4rem" }}>
          Welcome To Crypto <span style={{ color: "gold" }}>WORLD</span>
        </h1>
      </div>
      <div
        style={{
          width: "35%",
          padding: "2rem",
          boxShadow: "0px 4px 20px #77DD77",
          borderRadius: "16px",
        }}
        className="d-flex align-item-center justify-content-center mt-3"
      >
        <Container
          maxWidth="xs"
          className="d-flex justify-content-center align-item-center"
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" gutterBottom className="mb-3">
              <span
                style={{
                  color: "#77DD77",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                Sign Up
              </span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0px 0px 0px #77DD77",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#77DD77",
                          borderRadius: "16px",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#77DD77", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#77DD77", // Green label color when focused
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#77DD77", // Green placeholder color
                        opacity: 1,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0px 0px 0px #77DD77",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#77DD77",
                          borderRadius: "16px",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#77DD77", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#77DD77",
                        fontWeight: "bold", // Green label color when focused
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#77DD77", // Green placeholder color
                        opacity: 1,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0px 0px 0px #77DD77",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#77DD77",
                          borderRadius: "16px",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#77DD77", // Default label color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#77DD77",
                        fontWeight: "bold", // Green label color when focused
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#77DD77", // Green placeholder color
                        opacity: 1,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="p-2"
                  fullWidth
                  style={{
                    background: "#34B335",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => navigate("/signIn")}
                  type="button"
                  variant="contained"
                  color="primary"
                  className="p-2 mt-2"
                  fullWidth
                  style={{
                    background: "#34B335",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
