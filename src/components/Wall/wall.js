import React from "react";
import Header from "../Header";
import WallGrid from "./WallGrid";
import MakePost from "./MakePost";
import "../../css/wall.scss";
import queryString from "query-string";
import * as Redux from "../../store";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    Redux.store.subscribe(() => {
      this.setState({
        posts: Redux.store.getState().posts
      });
    });
  }
  componentDidMount() {
    const { user } = queryString.parse(this.props.location.search);
    Redux.store.dispatch(Redux.handleInitialData(user));
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="posts-cotainer">
          <MakePost user={queryString.parse(this.props.location.search)} />
          <WallGrid
            posts={this.state.posts}
            user={queryString.parse(this.props.location.search)}
          />
        </div>
      </React.Fragment>
    );
  }
}
