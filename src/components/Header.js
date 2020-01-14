import React from "react";
import { NavLink } from "react-router-dom";
import "../css/header.scss";

const act = {
  borderBottom: "1px solid rgba(237,150,11,1)"
};

export default class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="logo-container">
            <img
              id="logo"
              alt=""
              src={require("../images/FOXYFACE_LOGO-01.png")}
            />
            <h1>Foxy</h1>
          </div>
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink
                  className="NavLink"
                  to={{
                    pathname: "/wall",
                    search: `?user=jermy2918`
                  }}
                  activeStyle={act}
                >
                  Wall
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="NavLink"
                  to="/groups"
                  activeStyle={act}
                >
                  Groups
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="NavLink"
                  to={{
                    pathname: "/profile",
                    search: `?user=jermy2918`
                  }}
                  activeStyle={act}
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>
          <NavLink className="NavLink cta" to="/" exact activeStyle={act}>
            <button>Sign Out</button>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}
