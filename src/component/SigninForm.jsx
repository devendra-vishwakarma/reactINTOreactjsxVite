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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }
  
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    
    console.log(token,"this is tokens");
    
    if (token) {
      axios.post("http://localhost:7070/signIn", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res.data);
        toast.success("Sign In Successful!");
        navigate("/");
      }).catch(err => {
        console.log(err);
        toast.error("Sign In Failed!");
      });
    } else {
      toast.error("Invalid credentials");
    }
  };
  

  return (
    <div className="d-flex align-item-center justify-content-between" style={{ backgroundImage: "url(./banner2.jpg)", backgroundRepeat: "none", padding: "2rem" }}>
      <div className="d-flex align-item-center justify-content-center flex-column" style={{ height: "10rem", marginTop: "7.5rem" }}>
        <h1 style={{ color: "yellow", fontWeight: "bold", fontSize: "5rem", textShadow: "2px 2px 4px yellow" }}>Crypto Hunter</h1>
        <p className="text-center mt-5" style={{ position: "relative", paddingBottom: "50px" }}>
          To change the Trading Plan
        </p>
      </div>
      <div
        style={{
          width: "30%",
          padding: "2rem",
          boxShadow: "0px 4px 20px #77DD77",
          borderRadius: "16px",
        }}
        className="d-flex align-item-center justify-content-center mt-5"
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
                Sign In
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
                        color: "#999", // Default label color
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
                        color: "#999", // Default label color
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
                  Sign In
                </Button>
                <Button
                  onClick={() => { navigate("/signUp"); }}
                  type="submit"
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
                  Sign Up
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

export default SignInForm;
