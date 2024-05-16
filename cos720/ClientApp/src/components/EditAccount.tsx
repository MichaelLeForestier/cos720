import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EditAccountProps {
  onHideEditAccount: () => void;
}

const EditAccount: React.FC<EditAccountProps> = ({ onHideEditAccount }) => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem('email') || '',
    newPassword: '',
    confirmPassword: '',
    currentPassword: '',
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

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
    if (!validatePassword(formData.newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.put(
        "https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/User/edit",
        {
          editorEmail: localStorage.getItem('email'),
          email: formData.email,
          newPassword: formData.newPassword,
          currentPassword: formData.currentPassword
        }, config
      );
      console.log(response);
      toast.success('Account updated successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      onHideEditAccount();
    } catch (error) {
      toast.error("Failed to update account", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: "my_toast",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onHideEditAccount();
  };
  
  const getRole = () => {
    return localStorage.getItem('role') === 'admin';
  };

  const isAdmin = getRole();

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'rgb(217, 26, 51)' }}>
        Edit Account
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isAdmin}
            />
          </Grid>
          {!isAdmin &&
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                variant="outlined"
                fullWidth
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        edge="end"
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          }
          <Grid item xs={12}>
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" color="primary" type="submit" fullWidth disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Update Account'}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditAccount;
