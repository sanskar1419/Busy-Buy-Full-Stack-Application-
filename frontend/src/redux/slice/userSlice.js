/* Importing necessary function and method */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for userSlice */
const initialState = {
  error: null,
  loading: false,
  message: null,
  cart: [],
  orders: [],
};

/* Creating a getUserDetailsAsync function that accepts a Redux action type string and a callback function that is return a promise. */
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

/* Creating a addProductToCartAsync function that accepts a Redux action type string and a callback function that is return a promise. */
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

/* Creating a removeProductFromCart function that accepts a Redux action type string and a callback function that is return a promise. */
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

/* Creating a increaseQuantityAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const increaseQuantityAsync = createAsyncThunk(
  "user/increase",
  async (payload) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/cart/increaseQuantity",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: payload.productId,
          id: payload.userId,
        }),
      }
    );
    return await response.json();
  }
);

/* Creating a decreaseQuantityAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const decreaseQuantityAsync = createAsyncThunk(
  "user/decrease",
  async (payload) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/cart/decreaseQuantity",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: payload.productId,
          id: payload.userId,
        }),
      }
    );
    return await response.json();
  }
);

/* Creating a orderItemAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const orderItemAsync = createAsyncThunk(
  "user/order",
  async (payload) => {
    const response = await fetch("http://127.0.0.1:8000/api/user/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: payload,
      }),
    });
    return await response.json();
  }
);

/* Creating userSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
export const userSlice = createSlice({
  /* Slice Name */
  name: "user",
  /* Initial State */
  initialState,
  /* Object of Reducers Function */
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
  /* Object of extraReducer function */
  /* A "builder callback" function used to add more reducers */
  extraReducers: (builder) => {
    /* When the promise is fulfilled based on the case executing the function  */
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
      })
      .addCase(increaseQuantityAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.cart[action.payload.productIndex].quantity++;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.cart[action.payload.productIndex].quantity--;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(orderItemAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.cart = [];
        state.message = action.payload.message;
        state.loading = false;
      });
  },
});

/* Creating and exporting userReducer using slice reducer method */
export const userReducer = userSlice.reducer;
/* Creating and exporting userActions using slice actions method */
export const userActions = userSlice.actions;

/* Selector function to get data */
export const getCart = (state) => state.userReducer.cart;
export const getUserError = (state) => state.userReducer.error;
export const getUserMessage = (state) => state.userReducer.message;
export const getOrders = (state) => state.userReducer.orders;
export const getUserLoadingState = (state) => state.userReducer.loading;
