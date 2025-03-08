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
        updateCartData(state, action) {
            state.carts = action.payload;
        },
        clearCartData(state, action) {
            state.carts = {};
        },
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
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
})

// 獲取購物車數據
export const getCart = createAsyncThunk(
    "cart/getCart",
    async(item, {dispatch}) =>{
        dispatch(setLoading(true))
        try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
            // dispatch(updateCartData(res.data.data));
            // dispatch(updateCartNum(res.data.data));
        } catch (error) {
            dispatch(setError(error))
        }
    }
)

export const removeCart = createAsyncThunk(
    "cart/removeCart",
    async(item, {dispatch}) => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
            dispatch(updateCartData({}))// 清空購物車數據
        } catch (error) {
            alert(error)
        }
    }
)

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async(item, {dispatch}) => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);
            dispatch(updateCartData())
            dispatch(clearCartNum())
        } catch (error) {
            alert(`刪除購物車品項失敗`)
        }
    }
)

export const updataCartItem = createAsyncThunk(
    "cart/updataCartItem",
    async(data, {dispatch}) => {
        const {cartItem_id, product_id, qty} = data
        try {
            await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
                data: {
                    product_id,
                    qty: Number(qty)
                }
            });
            console.log(cartItem_id, product_id, qty);
            // dispatch(getCart()); // 重新獲取購物車數據
        } catch (error) {
            alert(error);
        }
    }
)


export const { updateCartData, clearCartData, updateCartNum, clearCartNum} = cartSlice.actions;

export default cartSlice.reducer