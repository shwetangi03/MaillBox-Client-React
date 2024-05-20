import { configureStore } from "@reduxjs/toolkit";

import ComposeReducers from "./ComposeToggle";
import InboxReducers from "./inboxToggle";

const store = configureStore({
  reducer: {
    compose: ComposeReducers,
    isInbox: InboxReducers,
  },
});

export default store;
