import { Switch, Route } from "react-router-dom";
import "./App.css";
import React, { Fragment, Suspense } from "react";
const Navbar = React.lazy(() => import("./components/Navbar"));
const Signup = React.lazy(() => import("./components/Signup"));
const WelcomePage = React.lazy(() => import("./components/WelcomePage"));
const SentBox = React.lazy(() => import("./components/SentBox"));
const MessageDetails = React.lazy(() => import("./components/MessageDetails"));
const Inbox = React.lazy(() => import("./components/Inbox"));
const InboxMessages = React.lazy(() => import("./components/InboxMessages"));
const Loading = React.lazy(() => import("./components/Loading"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/auth">
            <Signup />
          </Route>

          <Route path="/welcome">
            <WelcomePage />
          </Route>

          <Route path="/mailbox">
            <SentBox />
          </Route>

          <Route path="/messages/:messageId">
            <MessageDetails />
          </Route>

          <Route path="/inbox">
            <Inbox />
          </Route>

          <Route path="/inboxmessages/:messageId">
            <InboxMessages />
          </Route>
        </Switch>
      </Fragment>
    </Suspense>
  );
}

export default App;
