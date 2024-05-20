import { configureStore } from "@reduxjs/toolkit";

import ComposeReducers from "./ComposeToggle";
import InboxReducers from "./inboxToggle";
import MailItemReducer from "./MailFullBody";

const store = configureStore({
  reducer: {
    compose: ComposeReducers,
    isInbox: InboxReducers,
    mailItem: MailItemReducer,
  },
});

export default store;
