import { createSlice } from "@reduxjs/toolkit";
import { PushMessage } from "./toastSlice";

const initialList = localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : {};
  

const wishSlice = createSlice({
    name: "wish",
    initialState: {
        list: initialList
    },
    reducers: {
        PushWishList(state, active) {
            const product_id = active.payload;

            if(state.list[product_id]) {
                delete state.list[product_id];
            } else {
                state.list[product_id] = true;
            }

            localStorage.setItem("wishList", JSON.stringify(state.list));
        }
    }
})

export const wishMessage = (product_id) => {
    return (dispatch, getState) => {
        dispatch(wishSlice.actions.PushWishList(product_id))

        const state = getState();

        if (state.wish.list[product_id]) {
            dispatch(
                PushMessage({
                    text: "加入收藏",
                    status: "success"
                })
            );
        } else {
            dispatch(
                PushMessage({
                text: "移除收藏",
                status: "failed"
              }))
        }
    }
}

export const { PushWishList } = wishSlice.actions;

export default wishSlice.reducer;