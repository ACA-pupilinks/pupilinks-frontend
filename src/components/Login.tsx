import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Divider } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { login } from '../services/pocketbase';
import { User } from '../types/user';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await login(email, password);
      setError(null);
      onLogin(user);
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
        <Box sx={{ mb: 2, width: '100%', maxWidth: 250 }}>
          <img src="/images/logo.png" alt="PUP LINKS Logo" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Inicia seccion y empieza tu nueva experiencia
        </Typography>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{ mb: 2, backgroundColor: '#4285F4', color: 'white' }}
        >
          Iniciar sesión con Google
        </Button>
        <Divider sx={{ width: '100%', mb: 2 }}>o</Divider>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección de correo electrónico"
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" sx={{ textAlign: 'right', mb: 2 }}>
            <a href="#" style={{ color: 'inherit' }}>¿Has olvidado tu contraseña?</a>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#8257e6', '&:hover': { backgroundColor: '#6f48c9' } }}
          >
            Iniciar sesión
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            ¿No tienes una cuenta? <Link to="/register" style={{ color: '#8257e6' }}>Regístrate aquí</Link>
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

export default Login;