// Context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Effect to check local storage for authentication data on initial load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
  
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);
  

  // Function to update authentication state and store data in localStorage
  const login = (token, userData) => {
    localStorage.setItem('access_token', token); // Save token in localStorage
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to clear authentication data
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
