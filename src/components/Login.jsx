
import Batang183 from "../assets/batang183.png";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../api/authService.js';
import { setToken } from '../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  // handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      dispatch(setToken(response.token));
      navigate("/dashboard"); // Change '/dashboard' to the desired route
      setError('');
    } catch (error) {
      setError(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className="relative w-full h-screen md:w-80 md:h-96 mx-auto overflow-hidden md:overflow-visible">
      <div className="hidden md:block absolute w-70 h-70 md:w-40 md:h-40 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full -left-40 -top-20 md:-left-20 md:-top-20"></div>
      <div className="hidden md:block absolute w-80 h-80 md:w-40 md:h-40 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full -right-20 -bottom-[200px] "></div>
      {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
      <form onSubmit={handleLogin} className="absolute flex flex-col justify-center w-full h-screen md:w-80 md:h-[55vh] bg-opacity-10 bg-white bg-blur border-2 border-opacity-10 border-white md:rounded-2xl shadow-2xl p-10 overflow-hidden">
        <div className="flex justify-center items-center">
          <img src={Batang183} alt="" className="w-72 h-72 md:w-40 md:h-40 pt-2" />
        </div>
        {error && <div className="text-[#FF0000] text-center text-base pt-8 md:text-sm md:pt-4">{error}</div>}
        {/* <h3 className="text-2xl font-semibold text-center text-white mb-6">BATANG 183</h3> */}
        <label
          htmlFor="username"
          className="block text-white text-base font-semibold mt-6"
        >
          Username
        </label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          name="username" 
          value={formData.username} 
          onChange={handleInputChange}
          className="block w-full h-12 bg-opacity-30 bg-white rounded-md p-2 mt-2 text-base font-light"
        />
        <label
          htmlFor="password"
          className="block text-white text-base font-semibold mt-6"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password" 
          value={formData.password} 
          onChange={handleInputChange}
          className="block w-full h-12 bg-opacity-30 bg-white rounded-md p-2 mt-2 text-base font-light"
        />
        <button type='submit' className="w-full mt-10 bg-white text-black py-3 md:mb-3 text-xl font-semibold rounded-md cursor-pointer">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
