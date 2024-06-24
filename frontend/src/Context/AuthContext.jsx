import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    client.get("/account/user")
      .then(res => setCurrentUser(res.data))
      .catch(() => setCurrentUser(null));
  }, []);

  const register = (email, username, password) => {
    return client.post("/account/register", { email, username, password })
      .then(res => {
        console.log("User registered successfully:", res.data);
        return login(email, password);
      })
      .catch(error => {
        if (error.response) {
          console.error('Registration error:', error.response.data);
          throw new Error(error.response.data);
        } else if (error.request) {
          console.error('Registration request error:', error.request);
          throw new Error('No response from server. Please try again.');
        } else {
          console.error('Registration error:', error.message);
          throw new Error('An unexpected error occurred. Please try again.');
        }
      });
  };

  const login = (email, password) => {
    return client.post("/account/login", { email, password })
      .then(res => {
        setCurrentUser(res.data);
        console.log("User logged in:", res.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Login error:', error.response.data);
          throw new Error(error.response.data);
        } else if (error.request) {
          console.error('Login request error:', error.request);
          throw new Error('No response from server. Please try again.');
        } else {
          console.error('Login error:', error.message);
          throw new Error('An unexpected error occurred. Please try again.');
        }
      });
  };

  const logout = () => {
    return client.post("/account/logout")
      .then(() => {
        setCurrentUser(null);
        console.log("User logged out");
      })
      .catch(error => {
        if (error.response) {
          console.error('Logout error:', error.response.data);
          throw new Error(error.response.data);
        } else if (error.request) {
          console.error('Logout request error:', error.request);
          throw new Error('No response from server. Please try again.');
        } else {
          console.error('Logout error:', error.message);
          throw new Error('An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
