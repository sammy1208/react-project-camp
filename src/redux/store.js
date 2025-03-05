import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toastSlice"
import cartReducer from "./slices/cartSlice"
import productReducer from "./slices/productSlice";

const store = configureStore({
    reducer: {
        toast: toastReducer,
        cart: cartReducer,
        product: productReducer
    }
})

export default store;