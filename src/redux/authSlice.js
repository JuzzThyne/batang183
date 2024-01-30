import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from './config';


// Utility function to remove items from session storage
const removeSessionItem = (keys) => {
  keys.forEach((key) => sessionStorage.removeItem(key));
};

export const getUser = createAsyncThunk('adminAuth/getUser', async ({token}) => {
  try {
      const response = await axios.get(`${config.API_URL}admin/check-session/${token}`, {
          // params: { token }, // Use params instead of data
          headers: {
              Authorization: `Bearer ${token}`, // Note the "Bearer" prefix
          },
      });
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
});

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
    authenticate: false,
    validated: sessionStorage.getItem('Validated') || null,
    adminId: null,
    adminType: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.adminId = action.payload.admin;
        state.adminType = action.payload.adminUser;
        state.isLoading = false;
        state.error = null;

        // Check if the user is active or inactive
        if (action.payload.validated === "active") {
          state.validated = action.payload.validated;
          state.adminId = action.payload.admin;
          sessionStorage.setItem('Validated', action.payload.validated);
        } else {
          state.validated = null;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        // Remove session items
        removeSessionItem(['SecretToken', 'Validated']);
      })
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
        // Remove session items
        removeSessionItem(['SecretToken', 'Validated']);
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        // Remove session items
        removeSessionItem(['SecretToken', 'Validated']);
        state.error = action.payload.message;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;