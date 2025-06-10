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
  Alert,
  Button,
  Collapse,
  Paper
} from '@mui/material';

export const MyEndpoints = () => {
  const [endpoints, setEndpoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
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

  const toggleDetails = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Endpoints
      </Typography>

      {endpoints.length === 0 ? (
        <Typography>No endpoints found.</Typography>
      ) : (
        <List>
          {endpoints.map((endpoint: any) => (
            <Box key={endpoint.id}>
              <ListItem sx={{ bgcolor: 'grey.100', mb: 1, borderRadius: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={`Method: ${endpoint.method} | Status: ${endpoint.statusCode}`}
                  secondary={`URL: http://localhost:3000/mock/${endpoint.id}`}
                />
                <Button variant="outlined" size="small" onClick={() => toggleDetails(endpoint.id)}>
                  {expandedIds[endpoint.id] ? 'hide data details' : 'see data details'}
                </Button>
                <Collapse in={expandedIds[endpoint.id]} timeout="auto" unmountOnExit>
                  <Paper elevation={1} sx={{ p: 2, mt: 1, width: '100%', overflowX: 'auto', bgcolor: 'grey.50' }}>
                    <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </Paper>
                </Collapse>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};
