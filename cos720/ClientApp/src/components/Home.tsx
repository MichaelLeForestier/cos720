import React, { useState } from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import SignUp from './SignUp';
import EditAccount from './EditAccount';
import WelcomePage from './WelcomePage'; // Import the WelcomePage component
import ManageModules from './ManageModules';
import ReviewLogs from './ReviewLogs'; // Import the ReviewLogs component

const Home: React.FC = () => {
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [showEditAccount, setShowEditAccount] = useState<boolean>(false);
  const [showManageModules, setShowManageModules] = useState<boolean>(false);
  const [showReviewLogs, setShowReviewLogs] = useState<boolean>(false);
   // State to control visibility of ReviewLogs

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowEditAccount(false); // Ensure edit account is hidden
    setShowManageModules(false);
    setShowReviewLogs(false); // Hide ReviewLogs when showing SignUp
  };

  const handleHideSignup = () => {
    setShowSignup(false);
  };

  const handleShowEditAccount = () => {
    setShowEditAccount(true);
    setShowSignup(false); // Ensure signup is hidden
    setShowManageModules(false);
    setShowReviewLogs(false); // Hide ReviewLogs when showing EditAccount
  };

  const handleHideEditAccount = () => {
    setShowEditAccount(false);
  };

  const handleShowManageModules = () => {
    setShowManageModules(true);
    setShowEditAccount(false);
    setShowSignup(false);
    setShowReviewLogs(false); // Hide ReviewLogs when showing ManageModules
  };

  const handleHideManageModules = () => {
    setShowManageModules(false);
  };

  const handleShowReviewLogs = () => {
    setShowReviewLogs(true);
    setShowEditAccount(false);
    setShowSignup(false);
    setShowManageModules(false);
  };

  const handleHideReviewLogs = () => {
    setShowReviewLogs(false);
  };

  const getRole = () => {
    return localStorage.getItem('role') === 'admin';
  };

  const isAdmin = getRole();

  return (
    <div>
      <ResponsiveAppBar
        isAdmin={isAdmin}
        onAddUser={handleShowSignup}
        editAccount={handleShowEditAccount}
        manageModules={handleShowManageModules}
        reviewLogs= {handleShowReviewLogs}// Pass reviewLogs handler to ResponsiveAppBar
      />
      <Container maxWidth="xl" style={{ paddingTop: '20px', marginBottom: '40px' }}>
        {/* Show WelcomePage when neither SignUp nor EditAccount nor ManageModules nor ReviewLogs is shown */}
        {!showSignup && !showEditAccount && !showManageModules && !showReviewLogs && <WelcomePage />}
      </Container>
      {showSignup && (
        <Container maxWidth="md">
          <SignUp onHideSignUp={handleHideSignup} />
        </Container>
      )}
      {showEditAccount && (
        <Container maxWidth="md">
          <EditAccount onHideEditAccount={handleHideEditAccount} />
        </Container>
      )}
      {showManageModules && (
        <Container maxWidth="md">
          <ManageModules onHideManageModules={handleHideManageModules} isAdmin={isAdmin} />
        </Container>
      )}
      {showReviewLogs && (
        <Container maxWidth="md">
          <ReviewLogs onHideReviewLogs={handleHideReviewLogs} /> {/* Pass onHideReviewLogs to handle hiding ReviewLogs */}
        </Container>
      )}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', backgroundColor: 'rgb(0, 91, 171)', color: '#fff', padding: '10px 0', marginTop: '20px' }}>
        Created by Michael le Forestier &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Home;
