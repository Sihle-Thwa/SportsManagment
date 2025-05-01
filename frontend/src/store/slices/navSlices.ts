// This file contains the Redux slice for managing navigation state in the application.
// It includes the initial state, reducers, and actions for updating the active page and page title.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavState {
  activePage: string;
  pageTitle: string;
}

const initialState: NavState = {
  activePage: 'dashboard',
  pageTitle: 'Dashboard',
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<{ pageId: string; pageTitle: string }>) => {
      state.activePage = action.payload.pageId;
      state.pageTitle = action.payload.pageTitle;
    },
  },
});

export const { setActivePage } = navSlice.actions;
export default navSlice.reducer;