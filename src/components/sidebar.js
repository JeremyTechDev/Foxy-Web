import React from "react";

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <img alt="logo" src={require("../images/logo.png")} className="logo" />
        </div>
      </React.Fragment>
    );
  }
}
