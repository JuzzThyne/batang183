import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// const API_URL = 'http://localhost:5555/';
const API_URL = 'https://batang183-backend.vercel.app/';

export const fetchUsers = createAsyncThunk('userAuth/user', async (token) => {
  try {
    const response = await axios.post(`${API_URL}user`,null , {
      headers: {
        Authorization: `Bearer ${token}`, // Note the "Bearer" prefix
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const userSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user:null,
    users: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.users = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }); 
  },
});

export default userSlice.reducer;