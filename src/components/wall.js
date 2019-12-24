import React from "react";
import Sidebar from "./sidebar";
import "../css/wall.scss";
import * as info from "../info";
import { PostData } from "../services/PostData";

class WallGrid extends React.Component {
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

class MakePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        content: null,
        image: "https://miro.medium.com/max/1024/1*TPgy6Pos4YGuWwq89Gwx3w.jpeg",
      }
    };

    this.makePost = this.makePost.bind(this);
  }

  handleChange = key => event => {
    this.setState({
      post: {
        ...this.state.post,
        [key]: event.target.value
      }
    });
  };

  makePost() {
    PostData("makePost", this.state.post);
  }

  render() {
    return (
      <React.Fragment>
        <div className="makePost">
          <div className="makePost-content">
            <div className="makePost-img-container">
              <img alt="" src={require("../images/FOXYFACE_LOGO-01.png")} />
              <button title="Add Photo" className="add-photo btn">
                <i class="far fa-images"></i>
              </button>
            </div>
            <form onSubmit={this.makePost}>
              <textarea
                className="makePost-text"
                onChange={this.handleChange("content")}
                placeholder="What are your reading now?"
              ></textarea>
              <div className="makePost-btns">
                <button type="submit" className="publish btn">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default class Wall extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar title="Wall" />
        <div className="posts-cotainer">
          <MakePost />
          <WallGrid posts={info.posts} />
        </div>
      </React.Fragment>
    );
  }
}
