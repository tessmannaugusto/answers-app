import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { AnswerForm } from './components/AnswerForm';
import { Login } from './components/Login';
import { Register } from './components/Register';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/create-endpoint"
            element={isAuthenticated ? <AnswerForm /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/create-endpoint" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;