import { configureStore } from '@reduxjs/toolkit';
import userRuducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userRuducer,
  },
});