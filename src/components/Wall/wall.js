import React from "react";
import Header from "../Header";
import WallGrid from "./WallGrid";
import MakePost from "./MakePost";
import "../../css/wall.scss";
import { PostData } from "../../services/PostData";
import queryString from "query-string";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      posts: [] //list of all posts
    };
  }

  componentDidMount() {
    const { user } = queryString.parse(this.props.location.search); //the user to display from URL
    //gets all post's information
    this.setState({user: user});
    PostData("selectAllPosts", { user: user }).then(res => {
      this.setState({ posts: res});
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="posts-cotainer">
          <MakePost user={queryString.parse(this.props.location.search)} />
          <WallGrid posts={this.state.posts} user={this.state.user} />
        </div>
      </React.Fragment>
    );
  }
}
