import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:5555/';
const API_URL = 'https://batang183-backend.vercel.app/';

export const fetchUsers = createAsyncThunk('userAuth/fetchUsers', async ({ searchTerm, token, page = 1, limit = 10 }) => {
  try {
    const response = await axios.post(`${API_URL}user`, { searchTerm, page, limit }, {
      headers: {
        Authorization: `Bearer ${token}`, // Note the "Bearer" prefix
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const getSingleUser = createAsyncThunk('userAuth/getUser', async ({ userId, token }) => {
  try {
    const response = await axios.get(`${API_URL}user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error.response.data;
  }
});


const userSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: null,
    users: null,
    error: null,
    isLoading: false,
    singleUser:null,
    currentPage: 1,
    totalPages: 1,
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
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.singleUser = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
