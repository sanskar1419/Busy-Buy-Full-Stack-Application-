/* Importing necessary function and method */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for auth */
const initialState = {
  loading: false,
  authUser: JSON.parse(localStorage.getItem("logged-in-user")) || null,
  error: null,
  message: null,
};

/* Creating a signUpUserAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const signUpUserAsync = createAsyncThunk(
  "auth/signUp",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await response.json();
  }
);

/* Creating a signInUserAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const signInUserAsync = createAsyncThunk(
  "auth/signIn",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await response.json();
  }
);

/* Creating a logoutUserAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const logoutUserAsync = createAsyncThunk(
  "auth/logout",
  async (payload, thunkAPI) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  }
);

/* Creating authSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
export const authSlice = createSlice({
  /* Slice Name */
  name: "auth",
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
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.authUser = action.payload;
        localStorage.setItem("logged-in-user", JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.authUser = action.payload;
        localStorage.setItem("logged-in-user", JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
          return;
        }
        state.message = action.payload.message;
        localStorage.removeItem("logged-in-user");
        state.authUser = null;
        state.loading = false;
      });
  },
});

/* Creating and exporting authReducer using slice reducer method */
export const authReducer = authSlice.reducer;
/* Creating and exporting authActions using slice actions method */
export const authActions = authSlice.actions;

/* Selector function to get data */
export const getAuthUser = (state) => state.authReducer.authUser;
export const getAuthData = (state) => state.authReducer;
