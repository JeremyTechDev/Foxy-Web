import React from "react";
import Sidebar from "../sidebar";
import WallGrid from "./WallGrid";
import "../../css/wall.scss";
import * as getDate from "../../services/date";
import { PostData } from "../../services/PostData";

class MakePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        content: null,
        image: "https://miro.medium.com/max/1024/1*TPgy6Pos4YGuWwq89Gwx3w.jpeg",
        date: getDate.getDate(),
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
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <div className="makePost">
          <div className="makePost-img-container">
            <img alt="" src={require("../../images/FOXYFACE_LOGO-01.png")} />
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
            <button type="submit" className="publish btn">
              Publish
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default class Wall extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    PostData("selectAllPosts", {})
      .then(res => {
        res.allPosts.forEach(post => {
          this.setState({
            posts: [...this.state.posts, post]
          })
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar title="Wall" />
        <div className="posts-cotainer">
          <MakePost />
          <WallGrid posts={this.state.posts} />
        </div>
      </React.Fragment>
    );
  }
}