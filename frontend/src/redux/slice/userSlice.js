import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  message: null,
  cart: [],
  orders: [],
};

export const getUserDetailsAsync = createAsyncThunk(
  "user/getUserDetails",
  async (payload, thunkAPI) => {
    // API endpoint for fetching recent users
    const apiUrl = "http://127.0.0.1:8000/api/user";
    // Set up query parameters
    const queryParams = {
      id: payload,
    };
    // Convert query parameters to a string
    const queryString = new URLSearchParams(queryParams).toString();
    // Combine API endpoint with query parameters
    const fullUrl = `${apiUrl}?${queryString}`;
    const response = await fetch(fullUrl);
    return await response.json();
  }
);

export const addProductToCartAsync = createAsyncThunk(
  "user/addToCart",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/user/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: payload.productId,
        id: payload.userId,
      }),
    });
    return await response.json();
  }
);

export const removeProductFromCart = createAsyncThunk(
  "user/removeProductPromCart",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/user/cart/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: payload.productId,
        id: payload.userId,
      }),
    });
    return await response.json();
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.cart = [...action.payload.cartItems];
        state.orders = [...action.payload.orders];
        state.loading = false;
      })
      .addCase(addProductToCartAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.cart.splice(action.payload.productIndex, 1);
        state.message = action.payload.message;
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

export const getCart = (state) => state.userReducer.cart;
export const getUserError = (state) => state.userReducer.error;
export const getUserMessage = (state) => state.userReducer.message;
export const getOrders = (state) => state.userReducer.orders;
export const getUserLoadingState = (state) => state.userReducer.loading;
