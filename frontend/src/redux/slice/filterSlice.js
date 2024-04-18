/* Importing necessary function and method */
import { createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for filterSlice */
const initialState = {
  visibility: false,
  filterMenu: [],
  filterProducts: [],
};

/* Creating filterSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
export const filterSlice = createSlice({
  /* Slice Name */
  name: "filter",
  /* Initial State */
  initialState,
  /* Object of Reducers Function */
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
});

/* Creating and exporting filterReducer using slice reducer method */
export const filterReducer = filterSlice.reducer;
/* Creating and exporting filterActions using slice actions method */
export const filterActions = filterSlice.actions;

/* Selector function to get data */
export const getFilterMenuVisibility = (state) =>
  state.filterReducer.visibility;
export const getFilterMenu = (state) => state.filterReducer.filterMenu;
export const getFilterProducts = (state) => state.filterReducer.filterProducts;
