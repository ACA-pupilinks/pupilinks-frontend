import React, { useState, useEffect } from 'react';
import RecordList from './components/RecordList';
import Login from './components/Login';
import { apiClient } from './services/pocketbase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('pocketbase_token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('pocketbase_token');
    delete apiClient.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>PocketBase Records</h1>
      {isAuthenticated ? (
        <>
          <RecordList />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;