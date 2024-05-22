import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ClassSlice from "./ClassSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    class: ClassSlice.reducer,
  },
});

export default store;
