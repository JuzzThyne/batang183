import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config";

export const getPrecinct = createAsyncThunk('precinct/getPrecinct', async (precinct = null) => {
    try {
      const response = await axios.get(`${config.API_URL}precinct/${precinct}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error.response.data;
    }
  });
  export const addPrecinct = createAsyncThunk('precinct/addPrecinct', async ({formData}) => {
    try {
      const response = await axios.post(`${config.API_URL}precinct/add`, formData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error.response.data;
    }
  });

const precinctSlice = createSlice({
  name: "precinct",
  initialState: {
    list: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrecinct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrecinct.fulfilled, (state, action) => {
        state.list = action.payload.list;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPrecinct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addPrecinct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPrecinct.fulfilled, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      })
      .addCase(addPrecinct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default precinctSlice.reducer;
