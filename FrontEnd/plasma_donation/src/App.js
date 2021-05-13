import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "./pages/Dashboard/Dashboard";
import DonarRegistration from "./pages/DonarRegistration/DonarRegistration";

function App() {
  return (
    <Router>
      {/* <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade"> */}
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/donorRegistration">
          <DonarRegistration />
        </Route>
      </Switch>
      {/* </CSSTransition>
      </TransitionGroup> */}
    </Router>
  );
}

export default App;
