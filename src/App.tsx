import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RecordList from './components/RecordList';
import Login from './components/Login';
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
          <Route element={<MainLayout />}>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/records" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/records" element={
              isAuthenticated ? <RecordList onLogout={handleLogout} /> : <Navigate to="/login" />
            } />
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;