import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
import axiosInstance from '../Auth/AxiosInterceptor';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false); // State to manage loading state
  const [token, setToken] = useState<string | null>(null); // Store the token in state
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const isDisabled = !email || !password;
    setSubmitDisabled(isDisabled);
  }, [email, password]);

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading state to true
      //https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev
      const response = await axiosInstance.post('https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/User/login', {
        email,
        password,
      });
      const authToken = response.data.token;
      const role = response.data.role;
      const Id = response.data.id;
      // Store email in localStorage
      localStorage.setItem('Id', Id);
      localStorage.setItem('email', email);
      localStorage.setItem('role',role);
      localStorage.setItem('token', authToken);
      setToken(authToken); // Set the token in state
      history.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Incorrect Email and Password Combination', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false); // Set loading state to false when request completes
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white', // Set white background
        padding: '2rem', // Add padding
        borderRadius: '8px', // Add border radius
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={isSubmitDisabled || isLoading} // Disable button when submitting or loading
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}{/* Show loading icon if loading */}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Trouble logging in?{' '}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
              Please Contact IT support at{' '}
              <a href="mailto:m.leforestier1@gmail.com" data-ajax="false">
                m.leforestier@gmail.com
              </a>
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
