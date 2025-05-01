// Redux store configuration
// This file sets up the Redux store and combines all slices into a single store object.
// It also exports the store and types for RootState and AppDispatch for use in the application.

import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlices';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;