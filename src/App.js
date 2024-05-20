import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import WelcomePage from "./components/WelcomePage";
import { Fragment } from "react";
import MailboxBody from "./components/MailboxBody";

function App() {
  return (
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
          <MailboxBody />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
