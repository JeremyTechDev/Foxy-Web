import React from "react";
import * as Redux from "../../store";

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
    Redux.store.dispatch(Redux.addPostAction(this.state.post));
  }

  //Shows and hides the display of add photo
  toogleDisplay() {
    this.setState({ addDisplay: !this.state.addDisplay });
  }

  render() {
    console.log(this.state.post.user);

    return (
      <React.Fragment>
        <div className="makePost">
          <div className="makePost-img-container">
            <img
              alt=""
              src={"https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png"}
            />
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
