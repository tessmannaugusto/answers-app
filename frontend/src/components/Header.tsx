import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Answers App
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/home')}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};