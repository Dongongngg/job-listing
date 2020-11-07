import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
// pages
import Landing from "./pages/Landing";
import Main from "./pages/Main";
//style
import "./styles/App.css";

function App() {
  const history = createBrowserHistory();
  return (
    <Router className="app" history={history}>
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/app" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
