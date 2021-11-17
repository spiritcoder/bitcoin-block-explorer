import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Blocks from "./components/Blocks";
import BlockDetail from "./components/BlockDetail";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/">
            <Blocks />
          </Route>
          <Route path="/blocks">
            <Blocks />
          </Route>
          <Route path="/home">
            <Blocks />
          </Route>
          <Route path="/block-detail">
            <BlockDetail />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
