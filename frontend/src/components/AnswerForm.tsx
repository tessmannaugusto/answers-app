import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  
  Alert,
  Box, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import axios from 'axios';

export const AnswerForm = () => {
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState('200');
  const [createdEndpoint, setCreatedEndpoint] = useState('');
  const [error, setError] = useState('');
  const [errorTextField, setErrorTextField] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      console.error('Invalid JSON:', e);
      return false;
    }
  };

  const handleResponseChange = (value: string) => {
    setResponse(value);
    if (value && !isValidJSON(value)) {
      setErrorTextField('Please enter valid JSON');
    } else {
      setErrorTextField('');
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isValidJSON(response)) {
    setErrorTextField('Please enter valid JSON');
    return;
  }

  try {
    const token = localStorage.getItem('token');

    const { data } = await axios.post(
      'http://localhost:3000/admin',
      {
        method,
        response,
        statusCode: parseInt(statusCode),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response from server:', data);
    setCreatedEndpoint(`http://localhost:3000/mock/${data.id}`);
    setError('');
  } catch (error) {
    setError('Error creating answer. Please try again.');
    console.error('Error creating answer:', error);
  }
};

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Button 
        variant="outlined" 
        sx={{ mt: 2 }} 
        onClick={() => navigate('/my-endpoints')}
      >
        View My Endpoints
      </Button>

      <Typography variant="h5" gutterBottom>
        Create Mock Answer
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>HTTP Method</InputLabel>
          <Select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            label="HTTP Method"
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Response (JSON)"
          value={response}
          onChange={(e) => handleResponseChange(e.target.value)}
          error={!!errorTextField}
          helperText={errorTextField}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Status Code"
          type="number"
          value={statusCode}
          onChange={(e) => setStatusCode(e.target.value)}
          sx={{ mb: 2 }}
        />

        {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

        <Button 
          variant="contained" 
          type="submit" 
          fullWidth
          disabled={!!error}
        >
          Create Answer
        </Button>
      </form>

      {createdEndpoint && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Created Endpoint:</Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              wordBreak: 'break-all',
              p: 1,
              bgcolor: 'grey.100',
              borderRadius: 1
            }}
          >
            {createdEndpoint}
          </Typography>
        </Box>
      )}
    </Box>
  );
};