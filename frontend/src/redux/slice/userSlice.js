import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authUser: JSON.parse(localStorage.getItem("logged-in-user")) || null,
  cart: [],
  order: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

export const getAuthUser = (state) => state.userReducer.authUser;
export const getUserStateData = (state) => state.userReducer;
