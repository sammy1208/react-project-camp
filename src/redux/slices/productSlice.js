import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: []
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    PushSelectedProduct(state, action) {
      const { id, color, specs } = action.payload;

      const existingProduct = state.selectedProduct.find(
        (res) => res.id === id
      );

      if (existingProduct) {
        existingProduct.color = color;
        existingProduct.specs = specs;
      } else {
        state.selectedProduct.push({
          id,
          color,
          specs
        });
      }
    }
  }
});

export const { PushSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
