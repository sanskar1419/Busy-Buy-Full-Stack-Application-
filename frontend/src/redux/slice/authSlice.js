import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authUser: JSON.parse(localStorage.getItem("logged-in-user")) || null,
  error: null,
  message: null,
};

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

export const authSlice = createSlice({
  name: "auth",
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

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const getAuthUser = (state) => state.authReducer.authUser;
export const getAuthData = (state) => state.authReducer;
