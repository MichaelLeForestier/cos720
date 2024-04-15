import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const WelcomePage: React.FC = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: '20px', marginBottom: '40px' }}>
      <Typography variant="h3" gutterBottom style={{ color: 'rgb(217, 26, 51)', textAlign: 'center', marginBottom: '20px' }}>Welcome to Tuks Module Registration</Typography>
      <Typography variant="body1" gutterBottom style={{ textAlign: 'center', marginBottom: '40px' }}>
      Welcome to the Tuks Module Registration web app! This application has been developed for COS 720 Computer Information and Security at the University of Pretoria. It serves as a platform to facilitate efficient and effective module registration for students. To get started, please navigate through the user profile menu located in the top-right corner. Here, you can access features like managing modules, editing your account details, and logging out.
      
      </Typography>
      <Typography variant="h4" gutterBottom style={{ color: 'rgb(217, 26, 51)', textAlign: 'center', marginBottom: '20px' }}>Explore Tuks Sports</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://images.caxton.co.za/wp-content/uploads/sites/85/2018/05/CKB4464.jpg" // Placeholder image URL
              alt="Tuks Hockey"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tuks Hockey
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tuks Hockey is one of the leading sports teams at the University of Pretoria. Click below to learn more about Tuks Hockey.
              </Typography>
              <Button variant="contained" color="primary" href="https://www.up.ac.za/hockey" target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px',backgroundColor: 'rgb(0, 91, 171)' }}>Learn more</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://images.supersport.com/media/y32ha3gc/varsityshield_tuksvscput-1200-inactiong.jpg?width=1080&quality=90&format=webp" // Placeholder image URL
              alt="Tuks Rugby"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tuks Rugby
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tuks Rugby is known for its strength and competitive spirit. Explore Tuks Rugby by clicking the link below.
              </Typography>
              <Button variant="contained" color="primary" href="https://www.up.ac.za/rugby" target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px',backgroundColor: 'rgb(0, 91, 171)' }}>Learn more</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://www.up.ac.za/crop/h520/w690/270/ZP_NewsImages/2020/gift-leotlela-web.zp189332.jpg" // Placeholder image URL
              alt="Tuks Athletics"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tuks Athletics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tuks Athletics boasts a rich history of excellence in sports. Learn more about Tuks Athletics by clicking the link below.
              </Typography>
              <Button variant="contained" color="primary"  href="https://www.up.ac.za/athletics/home/" target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px',backgroundColor: 'rgb(0, 91, 171)' }}>Learn more</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
