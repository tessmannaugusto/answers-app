import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        alert(data.message || 'Register failed');
      }
    } catch (err) {
      alert(`Error registered in: ${err}`);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Register</Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" disabled={!email || !password} onClick={handleRegister}>register!</Button>
      <Button variant="contained" onClick={navigateToLogin}>already registered?</Button>
    </Box>
  );
};
