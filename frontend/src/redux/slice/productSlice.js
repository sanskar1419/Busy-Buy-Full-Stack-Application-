/* Importing necessary function and method */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for ProductSlice */
const initialState = {
  error: null,
  loading: false,
  products: [],
};

/* Creating a getAllProductsAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProduct",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/product/");
    return await response.json();
  }
);

/* Creating productSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
export const productSlice = createSlice({
  /* Slice Name */
  name: "product",
  /* Initial State */
  initialState,
  /* Object of Reducers Function */
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state, action) => {
      state.error = null;
    },
  },
  /* Object of extraReducer function */
  /* A "builder callback" function used to add more reducers */
  extraReducers: (builder) => {
    /* When the promise is fulfilled based on the case executing the function  */
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
        return;
      }
      state.products = [...action.payload];
      state.loading = false;
    });
  },
});

/* Creating and exporting productReducer using slice reducer method */
export const productReducer = productSlice.reducer;
/* Creating and exporting productActions using slice actions method */
export const productActions = productSlice.actions;

/* Selector function to get data */
export const getProducts = (state) => state.productReducer.products;
export const getError = (state) => state.productReducer.error;
export const getProductLoadingState = (state) => state.productReducer.loading;
