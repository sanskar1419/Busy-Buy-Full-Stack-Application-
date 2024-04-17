import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
  filterMenu: [],
  filterProducts: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setVisibility: (state, action) => {
      state.visibility = true;
    },
    setFilterMenu: (state, action) => {
      state.filterMenu = [...action.payload];
    },
    setFilterProducts: (state, action) => {
      state.filterProducts = [...action.payload];
    },
  },
  extraReducers: {},
});

export const filterReducer = filterSlice.reducer;
export const filterActions = filterSlice.actions;

export const getFilterMenuVisibility = (state) =>
  state.filterReducer.visibility;
export const getFilterMenu = (state) => state.filterReducer.filterMenu;
export const getFilterProducts = (state) => state.filterReducer.filterProducts;
