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
      res.allPosts.forEach(post => {
        PostData("checkIfLiked", post).then(liked => {
          post["likedByUser"] = liked.result;
          PostData("checkIfSaved", post).then(saved => {
            post["savedByUser"] = saved.result;
            PostData("selectAllPostComments", post).then(comments => {
              post["comments"] = []
              comments.allPostComments.forEach(comment => {
                post["comments"] = [...post.comments, comment]
              });
              this.setState({
                posts: [...this.state.posts, post]
              });
            });
          });
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="posts-cotainer">
          <MakePost />
          <WallGrid posts={this.state.posts} />
        </div>
      </React.Fragment>
    );
  }
}
