import React from "react";
import ReactDOM from "react-dom";
import Books from "./components/books";
//import SingIn from "./components/login";
import "./css/books.scss";
import "./css/index.scss";
import "./css/sidebar.scss";
import "./css/login.scss";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/*<Sidebar />*/}
        {/*<SingIn />*/}
        {<Books />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
