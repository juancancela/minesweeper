import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import GameSetup from "./components/GameSetup/GameSetup";
import Game from "./components/Game/Game";

export default function AppRoutes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/game/:matchId">
            <Game />
          </Route>
          <Route path="/game">
            <GameSetup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
