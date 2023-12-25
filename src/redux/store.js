// store.js
import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './authSlice.js';

export const store = configureStore({
  reducer: {
    auth: adminAuthReducer,
    // Add more reducers as needed
  },
});