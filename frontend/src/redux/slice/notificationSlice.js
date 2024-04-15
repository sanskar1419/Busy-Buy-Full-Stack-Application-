import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;

export const getMessage = (state) => state.notificationReducer.message;
export const getError = (state) => state.notificationReducer.error;
