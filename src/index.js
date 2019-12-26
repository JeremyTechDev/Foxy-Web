import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/index.scss";

const Home = React.lazy(() => import("./components/home"));
const BookShelf = React.lazy(() => import("./components/Bookshelf/BookShelf"));
const Wall = React.lazy(() => import("./components/Wall/wall"));

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <React.Suspense fallback={<body></body>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/bookshelf" component={BookShelf} />
              <Route exact path="/wall" component={Wall} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </React.Suspense>
        </React.Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
