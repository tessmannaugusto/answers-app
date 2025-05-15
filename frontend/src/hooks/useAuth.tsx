import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error();

        const response = await axios.get('/api/validate-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Token validation response:', response);
        setIsAuthenticated(response.data.valid);
      } catch (err) {
        console.error('Token validation failed:', err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};