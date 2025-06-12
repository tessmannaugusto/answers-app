import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;