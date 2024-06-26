import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginimage from '../assets/login_page.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/api/login/', {
        email,
        password,
      });
      if (response.status === 200) {
        // Assuming successful login, navigate to '/'
        navigate('/');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      // Handle login error, e.g., show a notification
    }
  };

  return (
    <div className="flex flex-row justify-between w-full m-0">
      <div className="bg-white pl-[10%] flex items-center justify-center w-1/2">
        <div className="mt-[40%] flex flex-col h-[75vh]">
          <h2 className="text-3xl font-semibold font-poppins">Welcome back!</h2>
          <h3 className="text-lg font-medium text-black mt-2 font-poppins">Please enter your details.</h3>

          <div className="flex items-center justify-between my-5">
            <div className="border-t w-full"></div>
            <div className="px-4">or</div>
            <div className="border-t w-full"></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="my-5">
              <input
                type="email"
                className="font-poppins border border-gray-400 rounded-xl h-14 w-[459px] pl-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="font-poppins border border-gray-400 rounded-xl h-14 w-[459px] pl-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="flex items-center justify-between my-5">
              <div className="flex items-center">
                <input type="checkbox" className="border border-black" />
                <h3 className="ml-2 text-base font-medium font-poppins">Remember Me</h3>
              </div>
              <h3 className="text-base font-medium font-poppins">Forgot Password?</h3>
            </div>

            <div>
              <button type="submit" className="bg-blue-600 text-white rounded-xl h-14 w-[459px] text-lg" style={{ backgroundColor: '#f48908' }}>
                Log In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center text-sm mt-5 font-poppins">
            Don't have an account?{' '}
            <Link to="/signup" className="no-underline text-blue-600 ml-2">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end w-1/2">
        <img src={loginimage} alt="bookshelf" className="h-full w-[86%]" />
      </div>
    </div>
  );
};

export default Login;
