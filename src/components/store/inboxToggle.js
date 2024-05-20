import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isInbox: true,
};
const InboxSlice = createSlice({
  name: "InboxVisible",
  initialState: initialValue,
  reducers: {
    setInbox(state, action) {
      state.isInbox = action.payload;
    },
  },
});

export const InboxActions = InboxSlice.actions;

export default InboxSlice.reducer;
