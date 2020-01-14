import React from "react";
import { PostData } from "../../services/PostData";

export default class MakePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        content: "",
        image: "",
        user: this.props.user.user
      },
      addDisplay: false
    };

    this.makePost = this.makePost.bind(this);
    this.toogleDisplay = this.toogleDisplay.bind(this);
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
    PostData("makePost", this.state.post);
    //window.location.reload();
  }

  toogleDisplay() {
    this.setState({ addDisplay: !this.state.addDisplay });
    console.log(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <div className="makePost">
          <div className="makePost-img-container">
            <img alt="" src={require("../../images/FOXYFACE_LOGO-01.png")} />
            <button
              onClick={this.toogleDisplay}
              title="Add Photo"
              className="btn-noStyle"
            >
              <i className="far fa-images"></i>
            </button>
          </div>

          <textarea
            className="inp makePost-text"
            onChange={this.handleChange("content")}
            placeholder="What are your reading now?"
          />

          {this.state.post.image !== "" && (
            <img
              className="little-upload-img"
              alt=""
              src={this.state.post.image}
            />
          )}

          <button onClick={this.makePost} type="button" className="publish btn">
            Publish
          </button>

          {this.state.addDisplay && (
            <div className="op-backgroud">
              <div className="add-photo-container">
                <h1>Add a photo</h1>
                <input type="file" className="inp" />
                <h4>or</h4>
                <input
                  type="text"
                  onChange={this.handleChange("image")}
                  placeholder="Paste the image link here..."
                  className="inp"
                  value={this.state.post.image}
                />
                <button onClick={this.toogleDisplay} className="btn">
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
