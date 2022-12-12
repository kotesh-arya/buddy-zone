import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

const modalReducer = modalSlice.reducer;
const { openModal, closeModal } = modalSlice.actions;

export { openModal, closeModal, modalReducer };
