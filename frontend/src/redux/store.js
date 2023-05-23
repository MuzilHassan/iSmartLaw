import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertSlice";
import { userSlice } from "./userSlice";
import { drawerSlice } from "./drawerSlice";
import { personSlice } from "./personSlice";
import socketReducer, { initializeSocket } from "./socketSlice"; // Import the socketReducer and initializeSocket

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
  open: drawerSlice.reducer,
  person: personSlice.reducer,
  socket: socketReducer, // Add socketReducer to the root reducer
});

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(initializeSocket()); // Dispatch the initializeSocket action

export default store;
