import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/index.scss";

const Home = React.lazy(() => import("./components/home"));
const Wall = React.lazy(() => import("./components/Wall/Wall"));
const Groups = React.lazy(() => import("./components/Groups/Groups"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const NotFound = React.lazy(() => import("./components/not_found"));

export class Loading extends React.Component {
  state = { content: "Loading" };
  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.state.content === "Loading..."
        ? this.setState({ content: "Loading" })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, 300);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="page-loading">
        <img alt="" src={require("./images/FOXYFACE_LOGO-01.png")} />
        <h2>{this.state.content}</h2>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/wall" component={Wall} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/profile" component={Profile} />
              <Route render={() => <NotFound />} />
            </Switch>
          </React.Suspense>
        </React.Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));