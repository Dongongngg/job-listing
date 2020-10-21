import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//pages
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
//style
import "./styles/App.css";

function App() {
  return (
    <Router className="app">
      <Switch>
        <Route path="/" exact component={LogIn}></Route>
        <Route path="/app" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
