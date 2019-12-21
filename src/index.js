import React from "react";
import ReactDOM from "react-dom";
import Books from "./components/books";
import "./css/books.scss";
import "./css/index.scss";
import "./css/sidebar.scss";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/*<Sidebar />*/}
        {<Books />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
