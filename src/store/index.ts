import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice/modalSlice";
import TodoSlice from "./todoSlice/todoSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    todos: TodoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
