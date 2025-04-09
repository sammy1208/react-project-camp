import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
};

const toastSlice = createSlice({
  name: "toast11",
  initialState,
  reducers: {
    PushMessage(state, active) {
      const { text, status } = active.payload;
      const id = Date.now();

      state.messages.push({
        id,
        text,
        status
      });
    },
    removeMessage(state, action) {
      const message_id = action.payload;

      const index = state.messages.findIndex(
        (message) => message.id === message_id
      );

      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    }
  }
});

export const { PushMessage, removeMessage } = toastSlice.actions;

export default toastSlice.reducer;
