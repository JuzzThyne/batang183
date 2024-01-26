import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from './config';

export const loginAsync = createAsyncThunk('adminAuth/login', async (credentials) => {
  try {
    const response = await axios.post(`${config.API_URL}admin/login`, credentials );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const logoutAsync = createAsyncThunk('adminAuth/logout', async (token) => {
  try {
    const response = await axios.post(`${config.API_URL}admin/logout`,null , {
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
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
        // Set the isAuthenticated cookie
        sessionStorage.setItem('SecretToken', action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.error = action.error.message;

        // Remove the token from localStorage
        sessionStorage.removeItem('SecretToken');
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        // Remove the token from localStorage
        sessionStorage.removeItem('SecretToken');
        state.error = action.payload.message;

      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;