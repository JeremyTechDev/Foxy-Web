import React from "react";
import { PostData } from "../../services/PostData";

export default class MakePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        content: null,
        image: "https://miro.medium.com/max/1024/1*TPgy6Pos4YGuWwq89Gwx3w.jpeg"
      }
    };

    this.makePost = this.makePost.bind(this);
  }

  //Mirror all changes on inputs to the state
  handleChange = key => event => {
    this.setState({
      post: {
        ...this.state.post,
        [key]: event.target.value
      }
    });
  };

  //Saves posts on DB without refresing the page
  makePost() {
    PostData("makePost", this.state.post)
    return false; //stop refreshing
  }

  render() {
    return (
      <React.Fragment>
        <div className="makePost">
          <div className="makePost-img-container">
            <img alt="" src={require("../../images/FOXYFACE_LOGO-01.png")} />
            <button title="Add Photo" className="btn">
              <i className="far fa-images"></i>
            </button>
          </div>
          <form onSubmit={this.makePost}>
            <textarea
              className="inp makePost-text"
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
