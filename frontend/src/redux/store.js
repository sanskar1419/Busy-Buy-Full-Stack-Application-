import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { productReducer } from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
  },
});
