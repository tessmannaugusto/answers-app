import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { Login } from './components/Login';
import { AnswerForm } from './components/AnswerForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './components/Register';


function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-endpoint"
            element={
              <ProtectedRoute>
                <AnswerForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/create-endpoint" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;