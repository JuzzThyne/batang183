import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// const API_URL = 'http://localhost:5555/';
const API_URL = 'https://batang183-backend.vercel.app/';

export const loginAsync = createAsyncThunk('adminAuth/login', async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}admin/login`, credentials, {withCredentials:true} );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const logoutAsync = createAsyncThunk('adminAuth/logout', async (token) => {
  try {
    const response = await axios.post(`${API_URL}admin/logout`,null , {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`, // Note the "Bearer" prefix
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const authSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    token: sessionStorage.getItem('SecretToken') || null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = null;
        // Set the isAuthenticated cookie
        sessionStorage.setItem('SecretToken', action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.token = null;
        state.error = action.error.message;

        // Remove the token from localStorage
        sessionStorage.removeItem('SecretToken');
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.error = action.payload.message;

        // Remove the token from localStorage
        sessionStorage.removeItem('SecretToken');
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;