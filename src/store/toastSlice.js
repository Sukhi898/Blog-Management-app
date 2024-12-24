import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
  isVisible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { setToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
