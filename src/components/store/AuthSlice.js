import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const AuthSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    tokenHandler(state, action) {
      state.email = action.payload;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice;
