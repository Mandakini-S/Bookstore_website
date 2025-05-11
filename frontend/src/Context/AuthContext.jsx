// Context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    setLoading(false); 
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('access_token', token);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    setIsAuthenticated(true);
    setUser(userData);
    console.log(isAuthenticated);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {!loading && children} {/* ✅ Only render children after auth check */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
