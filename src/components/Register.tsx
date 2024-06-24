import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Tabs, Tab } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { register } from '../services/pocketbase';
import { User } from '../types/user';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userType, setUserType] = useState('inquilino');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // const user = await register(email, password, userType);
      const user = await register(email, password);
      onRegister(user);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Regístrate
        </Typography>
        {/* <Tabs
          value={userType}
          onChange={(_, newValue) => setUserType(newValue)}
          sx={{ mb: 2, width: '100%' }}
        >
          <Tab label="Inquilino" value="inquilino" sx={{ width: '50%' }} />
          <Tab label="Propietario" value="propietario" sx={{ width: '50%' }} />
        </Tabs> */}
        <Box sx={{ mb: 2, width: '100%', maxWidth: 250 }}>
          <img src="/images/logo.png" alt="PUP LINKS Logo" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{ mb: 2, backgroundColor: '#4285F4', color: 'white' }}
        >
          Iniciar sesión con Google
        </Button>
        <Typography variant="body2" sx={{ mb: 2 }}>o</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección de correo electronico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#8257e6', '&:hover': { backgroundColor: '#6f48c9' } }}
          >
            Registrarse
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#8257e6' }}>Inicia sesión aquí</Link>
          </Typography>
        </Box>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default Register;