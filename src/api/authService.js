// services/authService.js
import axios from 'axios';

const BASE_URL = 'https://batang183-backend.vercel.app/admin'; // Replace with your backend URL and port

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
