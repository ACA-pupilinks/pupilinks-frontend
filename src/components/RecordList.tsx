import React, { useEffect, useState } from 'react';
import { getRecords, Record, RecordsResponse } from '../services/pocketbase';
import {
  Typography, Box, Button, Grid, Card, CardMedia, CardContent,
  TextField, Select, MenuItem, InputAdornment, Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WcIcon from '@mui/icons-material/Wc';
import PeopleIcon from '@mui/icons-material/People';

// Add this constant at the top of your file
const DEFAULT_IMAGE = '/images/default-image.jpg'; // Adjust the path as needed

const RecordList: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search filters state
  const [location, setLocation] = useState('San Salvador');
  const [startDate, setStartDate] = useState('2024-06-18');
  const [endDate, setEndDate] = useState('2024-06-18');
  const [gender, setGender] = useState('Masculino');
  const [people, setPeople] = useState('1');

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: RecordsResponse = await getRecords('location', page, 6);
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

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching with filters:', { location, startDate, endDate, gender, people });
    fetchRecords();
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Buscas pupilaje, <span style={{ color: '#8257e6' }}>cuenta con nosotros par ayudarte</span>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="San Salvador">San Salvador</MenuItem>
        </TextField>
        <TextField
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WcIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="Masculino">Masculino</MenuItem>
        </TextField>
        <TextField
          select
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PeopleIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="1">1</MenuItem>
        </TextField>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
        sx={{ mb: 4 }}
      >
        Buscar pupilajes
      </Button>

      <Grid container spacing={3}>
        {records.map((record, index) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`/images/location${index + 1}.png`}
                alt={record.name}
              />
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <PeopleIcon fontSize="small" />
                  <Typography variant="body2" ml={1}>
                    1 Persona
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {record.name}
                </Typography>
                <Typography variant="h6" component="div">
                  ${record.proposedPrice} / mes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RecordList;