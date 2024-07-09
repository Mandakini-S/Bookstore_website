// src/Pages/UserProfile.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const UserProfile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/account/api', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === 'success') {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-24 p-5 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-5">User Profile</h1>
      <div className="mb-4">
        <strong>Name:</strong> {user.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-4">
        <strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}
      </div>
      {/* Add more user details as needed */}
    </div>
  );
};

export default UserProfile;
