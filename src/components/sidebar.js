import React from "react";
import "../css/sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  //Shows and hides the sidebar
  updateSidebar = () => {
    try {
      let sidebar = document.getElementById("sidebar");
      let header = document.getElementById("header");
      let books = document.getElementById("books");
      let btnSidebar = document.getElementById("btn-sidebar");

      //if its hidden
      if (sidebar.style.left === "-270px") {
        //center all components
        sidebar.style.left = "0";
        header.style.marginLeft = "270px";
        books.style.marginLeft = "270px";
        btnSidebar.style.left = "270px";
      } else {
        sidebar.style.left = "-270px";
        header.style.marginLeft = "0";
        books.style.marginLeft = "auto";
        books.style.width = "100%";
        btnSidebar.style.left = "0";
      }
      //change class from light(hidden) to dark(shown)
      btnSidebar.classList.toggle("btn-sidebar-light");
    } catch {}
  };

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
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </div>
        {/*Header with the title of the page*/}
        <div className="header" id="header">
          <button
            className="btn-sidebar"
            id="btn-sidebar"
            onClick={this.updateSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1>{this.props.title}</h1>
        </div>
      </React.Fragment>
    );
  }
}
