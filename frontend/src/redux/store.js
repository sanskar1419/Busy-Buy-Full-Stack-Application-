/* Importing reducer function and configure store function */
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { productReducer } from "./slice/productSlice";
import { userReducer } from "./slice/userSlice";
import { filterReducer } from "./slice/filterSlice";

/* Creating Redux Store */
export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    userReducer,
    filterReducer,
  },
});
