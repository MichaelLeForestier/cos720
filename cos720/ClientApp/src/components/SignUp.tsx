import React, { FC, useState } from "react";
import { TextField, Button, Typography, Grid, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type SignUpProps = {
  onHideSignUp: () => void; // Callback function to hide the signup page
};

const SignUp: FC<SignUpProps> = ({ onHideSignUp }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    studentNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage or wherever it's stored
      if (!token) {
        // Handle case when token is not available
        console.error('Token not found');
        return;
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post(
        "https://6649b9ab3e251d.lhr.life/api/User/register",formData,config
      );
      console.log(response);
      toast.success('User successfully Registered', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
      onHideSignUp(); // Close the signup dialog after successful registration
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Failed to register User", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: "my_toast",
      });
    }
  };

  const handleCancel = () => {
    onHideSignUp(); // Close the signup dialog without registering
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'rgb(217, 26, 51)'}}>
        Sign Up Form
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Surname"
              variant="outlined"
              fullWidth
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Student Number"
              variant="outlined"
              fullWidth
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Role"
              variant="outlined"
              fullWidth
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
