import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { User } from '../types/user'; // You'll need to create this type

interface MainLayoutProps {
  user: User | null;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img src="/images/logo.png" alt="PUP LINKS Logo" style={{ height: '40px', marginRight: '10px' }} />
                </RouterLink>
                {/* <Button component={RouterLink} to="/" color="inherit">Home</Button>
                <Button component={RouterLink} to="/contact" color="inherit">Contact us</Button> */}
                <Button component={RouterLink} to="/list-property" color="inherit">Publica tu propiedad</Button>
            </Box>
            <Box>
              {user ? (
                <>
                  <Typography variant="body1" sx={{ mr: 2 }}>Welcome, {user.name}</Typography>
                  <Button onClick={handleLogout} variant="outlined" sx={{ color: '#8257e6', borderColor: '#8257e6' }}>Logout</Button>
                </>
              ) : (
                <>
                  <Button component={RouterLink} to="/register" variant="contained" sx={{ mr: 2, bgcolor: '#8257e6' }}>Registrate</Button>
                  <Button component={RouterLink} to="/login" variant="outlined" sx={{ color: '#8257e6', borderColor: '#8257e6' }}>Iniciar Sesión</Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;