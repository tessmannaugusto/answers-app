/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';

export const MyEndpoints = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEndpoints = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/admin/endpoints', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch endpoints');
        }

        const data = await response.json();
        setEndpoints(data);
      } catch (err) {
        setError('Could not load endpoints.');
        console.error('Error fetching endpoints:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEndpoints();
  }, [navigate]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Created Endpoints
      </Typography>

      {endpoints.length === 0 ? (
        <Typography>No endpoints found.</Typography>
      ) : (
        <List>
          {endpoints.map((endpoint: any) => (
            <ListItem key={endpoint.id} sx={{ bgcolor: 'grey.100', mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={`Method: ${endpoint.method} | Status: ${endpoint.statusCode}`}
                secondary={`URL: http://localhost:3000/mock/${endpoint.id}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
