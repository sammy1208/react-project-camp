import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const initialState = {};



const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {}
});

export default apiSlice.reducer;