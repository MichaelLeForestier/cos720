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
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './IconMike/logo.png';
import backgroundImage from '../imgs/AppBar.png';

interface Props {
  isAdmin: boolean;
  onAddUser: () => void;
  editAccount:() => void;
  manageModules:()=>void;
}

const settings = ['Edit Account','Logout']; // Only "Logout" is displayed in settings

const ResponsiveAppBar: React.FC<Props> = ({
  isAdmin,
  onAddUser,
  editAccount,
  manageModules
}) => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);

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
    window.location.href = '/login';
  };


  

  const handleMenuItemClick = (setting: string) => {
    if (setting === 'Logout') {
      handleLogout();
    } else if (setting === 'Add User') {
      onAddUser(); // Call onAddUser function when "Add User" is clicked
      handleProfileMenuClose(); // Close the menu after adding user
    } else if (setting === 'Edit Account'){
      editAccount();
      handleProfileMenuClose();
    }
    else if (setting === 'Manage Modules'){
    manageModules();
    handleProfileMenuClose();
  }
  };

  const userEmail = localStorage.getItem('email') || 'U';
  const userInitials = getInitials(userEmail);

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
              alignItems: 'center', // Align the logo vertically
              paddingLeft: 0, // Remove left padding
              marginLeft: '-1.5rem', // Adjust margin to align flush with the left corner
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: '70%', height: '70%' }} />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
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
              {isAdmin && ( // Render "Add User" button only if isAdmin is true
                <MenuItem onClick={() => handleMenuItemClick('Add User')}>
                  Add User
                </MenuItem>
              )}
               
                <MenuItem onClick={() => handleMenuItemClick('Manage Modules')}>
                  Manage Modules
                </MenuItem>
             
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuItemClick(setting)} // Pass setting to the handler
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
