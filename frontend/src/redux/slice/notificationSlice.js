import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetMessage: (state, action) => {
      state.message = null;
    },
    resetError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: {},
});

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;

export const getMessage = (state) => state.notificationReducer.message;
export const getError = (state) => state.notificationReducer.error;
