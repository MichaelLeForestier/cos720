import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'; // Import Button component
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './IconMike/logo.png';
import backgroundImage from '../imgs/AppBar.png';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

interface Props {
  isAdmin: boolean;
  onAddUser: () => void;
  editAccount:() => void;
  manageModules:() => void;
  reviewLogs:() => void; // Add reviewLogs function
}

const settings = ['Edit Account','Logout']; // Only "Logout" is displayed in settings

const ResponsiveAppBar: React.FC<Props> = ({
  isAdmin,
  onAddUser,
  editAccount,
  manageModules,
  reviewLogs // Add reviewLogs prop
}) => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory(); // Initialize useHistory

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const getInitials = (email: string): string => {
    const name = email.split('@')[0];
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login'); // Redirect to login page
  };

  const handleMenuItemClick = (setting: string) => {
    if (setting === 'Logout') {
      handleLogout();
    } else if (setting === 'Add User') {
      onAddUser();
      handleProfileMenuClose();
    } else if (setting === 'Edit Account'){
      editAccount();
      handleProfileMenuClose();
    } else if (setting === 'Manage Modules'){
      manageModules();
      handleProfileMenuClose();
    } else if (setting === 'Review Logs'){ // Check if setting is Review Logs
      reviewLogs(); // Call reviewLogs function
      handleProfileMenuClose();
    }
  };

  const userEmail = localStorage.getItem('email') || 'U';
  const userInitials = getInitials(userEmail);

  const token = localStorage.getItem('token');
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: `url(${backgroundImage})`, backgroundSize: 'contain' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 0,
              marginLeft: '-1.5rem',
              '@media (max-width: 600px)': {
                '& img': {
                  width: '50%',
                  height: '50%',
                  maxWidth: '100px',
                  maxHeight: '100px'
                }
              }
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: '70%', height: '70%' }} />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {token ? (
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }} style={{backgroundColor: 'rgb(0, 91, 171)'}} >
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" style={{backgroundColor: 'rgb(0, 91, 171)'}}>
                    {userInitials}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={profileAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
              >
                {isAdmin && (
                  <MenuItem onClick={() => handleMenuItemClick('Add User')}>
                    Add User
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleMenuItemClick('Manage Modules')}>
                  Manage Modules
                </MenuItem>
                {isAdmin && ( // Display Review Logs only for admins
                  <MenuItem onClick={() => handleMenuItemClick('Review Logs')}>
                    Review Logs
                  </MenuItem>
                )}
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuItemClick(setting)}
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button  variant="contained" color="primary" style={{ marginTop: '10px',backgroundColor: 'rgb(0, 91, 171)' }} onClick={() => window.location.href = '/login'}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
