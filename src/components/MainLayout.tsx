import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="/images/logo.png" alt="PUP LINKS Logo" style={{ height: '40px', marginRight: '10px' }} />
                <Button component={RouterLink} to="/contact" color="inherit">Contact us</Button>
                <Button component={RouterLink} to="/list-property" color="inherit">List your property</Button>
              </Box>
              <Box>
                <Button component={RouterLink} to="/register" variant="contained" sx={{ mr: 2, bgcolor: '#8257e6' }}>Sign Up</Button>
                <Button component={RouterLink} to="/login" variant="outlined" sx={{ color: '#8257e6', borderColor: '#8257e6' }}>Log in</Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;