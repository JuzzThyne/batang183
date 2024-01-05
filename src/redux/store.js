// store.js
import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './authSlice.js';
import userAuthReducer from './userSlice.js';

export const store = configureStore({
  reducer: {
    auth: adminAuthReducer,
    user: userAuthReducer,
    // Add more reducers as needed
  },
});