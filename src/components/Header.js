import React from "react";
import { NavLink } from "react-router-dom";
import "../css/header.scss";

const act = {
  borderBottom: '1px solid rgba(237,150,11,1)'
}

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
                <NavLink className="NavLink" to="/wall" exact activeStyle={act}>
                  Wall
                </NavLink>
              </li>
              <li>
                <NavLink className="NavLink" to="/bookshelf" exact activeStyle={act}>
                  Bookshelf
                </NavLink>
              </li>
              <li>
                <NavLink className="NavLink" to="/profile" exact activeStyle={act}>
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

//Scroll header animation
window.addEventListener("scroll", function() {
  if (this.scrollY > 0) {
    document.getElementById("logo").style.width = "40px";
  } else {
    document.getElementById("logo").style.width = "75px";
  }
});
