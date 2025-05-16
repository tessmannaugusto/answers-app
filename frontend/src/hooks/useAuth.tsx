import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error();

        const response = await fetch('http://localhost:3000/auth/validate-token', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      const data = await response.json();
        console.log('Token validation response:', data);
        setIsAuthenticated(data.valid);
      } catch (err) {
        console.error('Token validation failed:', err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};