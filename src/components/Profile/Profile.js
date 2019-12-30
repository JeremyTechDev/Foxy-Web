import React from "react";
import Header from "../Header";
import "../../css/profile.scss";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayPosts: true
    };

    this.toggleTab = this.toggleTab.bind(this);
  }

  //Changes the view between posts and saved
  toggleTab(tab) {
    tab = document.getElementById(tab);
    if (!tab.classList.contains("tab-selected")) {
      document.getElementById("posts-tab").classList.toggle("tab-selected");
      document.getElementById("saved-tab").classList.toggle("tab-selected");
      this.setState({displayPosts: !this.state.displayPosts});
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <div className="profile">
          <div className="artboard">
            <img alt="Artboard" src={require("../../images/ex.png")} />
          </div>
          <img
            className="profile-img"
            alt="Profile"
            src={require("../../images/FOXYFACE_LOGO-01.png")}
          />
          <div className="profile-info">
            <h1>Jeremy Muñoz</h1>
            <h5>@jeremy2918</h5>
            <h4>
              ¿Falta alguna traducción, hay algún error o quiere elogiar nuestra
              labor? Rellene el formulario con sus comentarios.
            </h4>
            <h3>
              5 <span>Posts </span>
              165 <span>Followers </span>
              100 <span>Following </span>
            </h3>
          </div>
          <div className="tablist">
            <div
              onClick={() => {
                this.toggleTab("posts-tab");
              }}
              id="posts-tab"
              className="tab tab-selected"
            >
              Posts
            </div>
            <div
              onClick={() => {
                this.toggleTab("saved-tab");
              }}
              id="saved-tab"
              className="tab"
            >
              Saved
            </div>
          </div>
        </div>
        {this.state.displayPosts && <div className="test"></div>}
      </React.Fragment>
    );
  }
}
