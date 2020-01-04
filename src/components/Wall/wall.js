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
      posts: [] //list of all posts
    };
  }

  componentDidMount() {
    //gets all post's information
    PostData("selectAllPosts", {}).then(res => {
      this.setState({posts: res});
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div id="posts-cotainer" className="posts-cotainer">
          <MakePost />
          <WallGrid posts={this.state.posts} />
        </div>
      </React.Fragment>
    );
  }
}
