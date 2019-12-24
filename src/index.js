import React from "react";
import ReactDOM from "react-dom";
import Books from "./components/Bookshelf/BookShelf";
//import Home from "./components/home"
import Wall from "./components/Wall/wall"
import "./css/index.scss";
import Books from "./components/Bookshelf/BookShelf";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {<Books />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
