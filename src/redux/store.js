import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slices/toastSlice"
import cartReducer from "./slices/cartSlice"
import productReducer from "./slices/productSlice";
import siteContentReducer from "./slices/siteContentSlice"

const store = configureStore({
    reducer: {
        toast: toastReducer,
        cart: cartReducer,
        product: productReducer,
        siteContent: siteContentReducer
    }
})

export default store;