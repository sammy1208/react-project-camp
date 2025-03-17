import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { updateCartNum } from "./cartSlice";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const initialState = {};

// 🔹 取得全部商品
export const getAllProduct = createAsyncThunk(
  "api/getAllProduct",
  async (item, {rejectWithValue}) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      return res.data.products
    } catch (error) {
      return rejectWithValue("獲取商品失敗");
    }
  }
)

// 🔹 取得商品詳細
export const getProductDetail = createAsyncThunk(
  "api/getProductDetail",
  async (product_id, {rejectWithValue}) => {
    try {
      const res = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`
      );
      return res.data.product
    } catch (error) {
      return rejectWithValue("獲取商品失敗");
    }
  }
)

// 🔹 取得購物車
export const getCart = createAsyncThunk(
  "api/getCart",
  async (item, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      thunkAPI.dispatch(updateCartNum(res.data.data));
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("獲取購物車失敗");
    }
  }
)

// 🔹 更新購物車
export const updataCart = createAsyncThunk(
  "api/updataCart",
  async (CartData, thunkAPI) => {
    const {product_id, qty} = CartData
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty)
        }
      });
      thunkAPI.dispatch(getCart()).unwrap();
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("新增購物車失敗");
    }
  }
)

const apiSlice = createSlice({
  name: "api",
  initialState:{
    productsAll: [],
    productsDetail: {},
    getCart: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsAll = action.payload;
    })
    .addCase(getAllProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getProductDetail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsDetail = action.payload;
    })
    .addCase(getProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getCart = action.payload;
    })
  }
});


export default apiSlice.reducer;