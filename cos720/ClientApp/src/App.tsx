import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import HomePage from './components/ResponsiveAppBar';
import Store from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp';
import PrivateRoute from './Auth/PrivateRoute'; // Import the PrivateRoute component
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    console.log(token);
    if (!token) {
      // Redirect to the login page if the token is not found
      history.push('/login');
    }
  }, [token, history]);

  useEffect(() => {
    // Add event listener to clear token on app close
    const clearTokenOnUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', clearTokenOnUnload);

    return () => {
      window.removeEventListener('beforeunload', clearTokenOnUnload);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to the login page after logout
    history.push('/login');
  };

  return (
    <Router>
      <div style={{ height: "100%" }}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
      
          <PrivateRoute exact path="/" component={Store} />
          <Redirect from="/#" to="/" /> {/* Redirect from /# to / */}
          <Redirect to="/login" /> {/* Redirect to the login page for all other paths */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
