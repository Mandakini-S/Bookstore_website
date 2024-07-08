import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Component/axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axiosInstance.post('user/logout/blacklist/', {
          refresh_token: localStorage.getItem('refresh_token'),
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axiosInstance.defaults.headers['Authorization'];
      navigate('/login');
    };

    performLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
