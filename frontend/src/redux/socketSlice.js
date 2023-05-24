// socketSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  connected: false,
  activeUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setConnected, setActiveUsers } = socketSlice.actions;

let socket = null; // Define the socket outside the slice

export const initializeSocket = () => (dispatch) => {
  socket = io("ws://localhost:9000");

  // Dispatch the connected status
  socket.on("connect", () => {
    dispatch(setConnected(true));
  });

  // Dispatch the disconnected status
  socket.on("disconnect", () => {
    dispatch(setConnected(false));
  });

  // Dispatch the active users
  socket.on("activeUsersUpdate", (activeUsers) => {
    dispatch(setActiveUsers(activeUsers));
  });
};

export const getSocket = () => socket; // Export a function to access the socket

export default socketSlice.reducer;
