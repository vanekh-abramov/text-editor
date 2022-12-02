import { createSlice } from "@reduxjs/toolkit";

// type Todo = {
//   id: string;
//   title: string;
//   completed: boolean;
// }

type ModalState = {
  modal: boolean;
};

const initialState: ModalState = {
  modal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setToggleModal(state, action) {
      state.modal = action.payload;
    },
  },
});

export const { setToggleModal } = modalSlice.actions;

export default modalSlice.reducer;
