import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecords, Record, RecordsResponse } from '../services/pocketbase';
import { List, ListItem, ListItemText, Typography, Box, Button, CircularProgress } from '@mui/material';

const RecordList: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: RecordsResponse = await getRecords('location', page, 10);
      setRecords(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h2">
          Location Records
        </Typography>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </Box>
      {/* ... rest of your component */}
    </Box>
  );
};

export default RecordList;