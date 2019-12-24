import React from "react";
import Sidebar from "./sidebar";
import "../css/wall.scss";
import * as info from "../info";

class WallGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.posts.map(post => {
      const { user, date, content } = post;
      return (
        <React.Fragment>
          <div className="post">
            <div className="post-info">
              <div className="post-info-img-container">
                <img alt="" src={require("../images/FOXYFACE_LOGO-01.png")} />
              </div>
              <div className="post-info-text">
                <h1>@{user}</h1>
                <h5>{date}</h5>
              </div>
            </div>

            <div className="post-content">
              <p>{content}</p>
              <img alt="" src={require("../images/ex.png")} />
            </div>

            <div className="post-actions">
              <i class="fas fa-heart"></i>
              <i class="fas fa-comment"></i>
              <span>
                <i class="fas fa-bookmark"></i>
              </span>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }
}

export default class Wall extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar title="Wall" />
        <div className="posts-cotainer">
          <WallGrid posts={info.posts} />
        </div>
      </React.Fragment>
    );
  }
}
