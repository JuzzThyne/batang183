// store.js
import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './authSlice.js';
import userAuthReducer from './userSlice.js';
import precinctReducer from './precinctSlice.js';

export const store = configureStore({
  reducer: {
    auth: adminAuthReducer,
    user: userAuthReducer,
    precinct: precinctReducer,
    // Add more reducers as needed
  },
});