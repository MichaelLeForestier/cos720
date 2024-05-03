import React, { useState } from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import WelcomePage from './WelcomePage'; // Import the WelcomePage component


const HomeLogin: React.FC = () => {
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [showEditAccount, setShowEditAccount] = useState<boolean>(false);
  const [showManageModules, setShowManageModules] = useState<boolean>(false);
  const handleShowSignup = () => {
    setShowSignup(false);
    setShowEditAccount(false); // Ensure edit account is hidden
    setShowManageModules(false);
  };

  const handleHideSignup = () => {
    setShowSignup(false);
  };

  const handleShowEditAccount = () => {
    setShowEditAccount(false);
    setShowSignup(false); // Ensure signup is hidden
    setShowManageModules(false);
  };

  const handleHideEditAccount = () => {
    setShowEditAccount(false);
  };
  const handleShowManageModules =( )=>{
    setShowManageModules(false);
    setShowEditAccount(false);
    setShowSignup(false);
  };

  const handleHideManageModules =( )=>{
    setShowManageModules(false);
    
  };


  const isAdmin = false;

  return (
    <div >
      <ResponsiveAppBar
      isAdmin={isAdmin}
      onAddUser={handleShowSignup}
      editAccount={handleShowEditAccount}
      manageModules={handleShowManageModules}/>
      <Container maxWidth="xl" style={{ paddingTop: '20px', marginBottom: '40px' }}>
       
        <WelcomePage />
      </Container>
     
      <footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', backgroundColor: 'rgb(0, 91, 171)', color: '#fff', padding: '10px 0' }}>
        Created by Michael le Forestier &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default HomeLogin;
