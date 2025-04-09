import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toastSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import siteContentReducer from "./slices/siteContentSlice";
import apiReducer from "./slices/apiSlice";
import wishReducer from "./slices/wishSlice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    cart: cartReducer,
    product: productReducer,
    siteContent: siteContentReducer,
    api: apiReducer,
    wish: wishReducer
  }
});

export default store;
