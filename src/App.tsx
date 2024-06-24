import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RecordList from './components/RecordList';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';

const theme = createTheme();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<MainLayout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/records" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/records" element={
              isAuthenticated ? <RecordList /> : <Navigate to="/login" />
            } />
            <Route path="/" element={<Navigate to="/records" />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;