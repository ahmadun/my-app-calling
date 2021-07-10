import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import ConfirmTrouble from "./pages/ConfirmTrouble";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <SideBar />
        </div>
        <Switch>
          <Route exact path="/" component={Content} />
          <Route exact path="/confirmtrouble" component={ConfirmTrouble} />
        </Switch>
      </Router>
    );
  }
}

export default App;
