import React from "react";

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar" id="sidebar">
          <div className="logo">
            <img
              alt="Foxy"
              src={require("../images/FOXY_LOGO.png")}
              className="logo"
            />
            <h1>FOXY</h1>
          </div>

          <ul>
            <li className="">Wall</li>
            <li className="selected">Bookshelf</li>
          </ul>

          <div className="user">
            <div className="user-img-container">
              <img alt="user" src={require("../images/FOXYFACE_LOGO-01.png")} />
            </div>

            <div className="user-info">
              <h3>Jeremy Muñoz</h3>
              <h4>@jeremy2918</h4>
            </div>

            <div className="btn-user">
              <button className="btn-user-options">
                <i class="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
