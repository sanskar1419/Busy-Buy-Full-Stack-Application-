import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  products: [],
};

export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProduct",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/product/");
    return await response.json();
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
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
  extraReducers: (builder) => {
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

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

export const getProducts = (state) => state.productReducer.products;
export const getError = (state) => state.productReducer.error;
export const getProductLoadingState = (state) => state.productReducer.loading;
