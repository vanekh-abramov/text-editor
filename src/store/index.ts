import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
