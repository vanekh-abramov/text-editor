import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodo } from "./todoAction";
import { IData } from "./../../models/models";

interface todosState {
  data: IData[];
  status: boolean;
  error: string;
}

const initialState: todosState = {
  data: [],
  status: false,
  error: "",
};

export const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    removeTodo(state, action) {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
  },
  extraReducers: {
    [getTodo.pending.type]: (state) => {
      state.status = true;
      state.error = "";
    },
    [getTodo.fulfilled.type]: (state, action: PayloadAction<IData[]>) => {
      state.status = false;
      state.data = action.payload;
      state.error = "";
    },
    [getTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = false;
      state.error = action.payload;
    },
  },
});

export const { removeTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
