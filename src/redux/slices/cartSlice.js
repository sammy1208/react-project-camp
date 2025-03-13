import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PushMessage } from "./toastSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const initialState = {
    carts: [],
    total: 0,
    final_total: 0,
    isLoading: false,
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCartNum(state, action) {
            const { carts, total, final_total } = action.payload

            state.carts = carts;
            state.total = total;
            state.final_total = final_total;
        },
        clearCartNum(state) {

            state.carts = [];
            state.total = 0;
            state.final_total = 0;

        },
    }
})


export const { updateCartNum, clearCartNum } = cartSlice.actions;

export default cartSlice.reducer