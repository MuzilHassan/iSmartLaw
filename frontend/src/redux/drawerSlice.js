import { createSlice } from "@reduxjs/toolkit";
export const drawerSlice = createSlice({
  name: "open",
  initialState: {
    open: true,
  },
  reducers: {
    updateOpen: (state) => {
      state.open = !state.open;
    },
  },
});

export const { updateOpen } = drawerSlice.actions;
