import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isCompose: false,
};
const composeSlice = createSlice({
  name: "ComposeCheck",
  initialState: initialValue,
  reducers: {
    toggleCompose(state) {
      state.isCompose = !state.isCompose;
    },
  },
});

export const composeActions = composeSlice.actions;

export default composeSlice.reducer;
