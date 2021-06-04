import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ShoutoutList from "./components/ShoutoutList";
import ShoutoutListTo from "./components/ShoutoutListTo";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <ul>
            <li>
              <NavLink to="/">All Shouts</NavLink>
            </li>
            <li>
              <NavLink to="/to/Bob">Bobs Shoutouts</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/to/:to">
            <ShoutoutListTo />
          </Route>
          <Route path="/">
            <ShoutoutList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
