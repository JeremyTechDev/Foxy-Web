import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/index.scss";

const Home = React.lazy(() => import("./components/home"));
const Wall = React.lazy(() => import("./components/Wall/wall"));
const Groups = React.lazy(() => import("./components/Groups/Groups"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <React.Suspense fallback={<body></body>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/wall" component={Wall} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/profile" component={Profile} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </React.Suspense>
        </React.Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
