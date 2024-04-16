import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { productReducer } from "./slice/productSlice";
import { userReducer } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    userReducer,
  },
});
