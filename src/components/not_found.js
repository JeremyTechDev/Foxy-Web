import React from "react";
import "../css/notfound.scss";
import { NavLink } from "react-router-dom";

export default class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="not-found-img">
          <img alt="Logo" src={require("../images/FOXY_SAD_LOGO-01.png")} />
        </div>
        <div className="not-found-content">
          <h1>Page not found</h1>
          <h2>
            The link you followed might be broken, or the page has been removed
          </h2>

          <h4>Meanwhile, why don't try again by going</h4>
          <button className="btn"><NavLink className="NavLink" to="/wall">BACK HOME</NavLink></button>
        </div>
      </React.Fragment>
    );
  }
}
