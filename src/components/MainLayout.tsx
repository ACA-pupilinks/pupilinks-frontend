import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../services/pocketbase'; // Import the logout function

interface MainLayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showNavbar = !['/login', '/register'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    onLogout();
    navigate('/login');
  };

  return (
    <>
      {showNavbar && (
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="/images/logo.png" alt="PUP LINKS Logo" style={{ height: '40px', marginRight: '10px' }} />
                <Button component={RouterLink} to="/contact" color="inherit">Contact us</Button>
                <Button component={RouterLink} to="/list-property" color="inherit">Publica tu propiedad</Button>
              </Box>
              {isAuthenticated && (
                <Box>
                  <Button onClick={handleLogout} variant="outlined" sx={{ color: '#8257e6', borderColor: '#8257e6' }}>Logout</Button>
                </Box>
              )}
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