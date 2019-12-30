import React from "react";
import Header from "../Header";
import WallGrid from "./WallGrid";
import MakePost from "./MakePost";
import "../../css/wall.scss";
import { PostData } from "../../services/PostData";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    PostData("selectAllPosts", {}).then(res => {
      res.allPosts.forEach(post => {
        PostData("checkIfLiked", post).then(e => {
          post["likedByUser"] = e.result;
          this.setState({
            posts: [...this.state.posts, post]
          });
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Wall" />
        <div className="posts-cotainer">
          <MakePost />
          <WallGrid
            posts={this.state.posts}
          />
        </div>
      </React.Fragment>
    );
  }
}
