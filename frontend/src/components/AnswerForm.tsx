import { useState } from 'react';
import { 
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
      setError('Please enter valid JSON');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidJSON(response)) {
      setError('Please enter valid JSON');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3000/admin/answers', {
        method,
        response,
        statusCode: parseInt(statusCode)
      });
      setCreatedEndpoint(`http://localhost:3000/mock/answers/${result.data.id}`);
      setError('');
    } catch (error) {
      setError('Error creating answer. Please try again.');
      console.error('Error creating answer:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
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
          error={!!error}
          helperText={error}
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