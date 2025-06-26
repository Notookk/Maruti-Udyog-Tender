import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('marutiAdminAuth');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, this would be server-side
    if (username === 'admin' && password === 'maruti123') {
      localStorage.setItem('marutiAdminAuth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('marutiAdminAuth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};