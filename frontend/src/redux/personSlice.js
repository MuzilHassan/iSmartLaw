import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    person: null,
  },
  reducers: {
    setPerson: (state, action) => {
      state.person = action.payload;
    },
  },
});

export const { setPerson } = personSlice.actions;
