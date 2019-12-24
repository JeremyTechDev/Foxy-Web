import React from "react";
import ReactDOM from "react-dom";
//import Books from "./components/books";
//import Home from "./components/home"
import Wall from "./components/wall"
import "./css/index.scss";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {<Wall />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
