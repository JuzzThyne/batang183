// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load the token from localStorage if it exists
const storedToken = localStorage.getItem('authToken');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: storedToken, // Use the stored token if available
    isAuthenticated: !!storedToken,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      // Save the token to localStorage
      localStorage.setItem('authToken', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      // Remove the token from localStorage
      localStorage.removeItem('authToken');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
