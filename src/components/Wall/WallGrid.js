import React from "react";
import { PostData } from "../../services/PostData";

class LikeBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likedByUser: this.props.likedByUser, //true or false
      likes: this.props.likes, //num of likes
      postId: this.props.postId
    };

    this.LikeAction = this.LikeAction.bind(this);
  }
  //Add one like to the post on the DB
  LikeAction() {
    const { likedByUser, likes } = this.state;
    //Adds and reduces likes on UI and DB
    if (likedByUser) {
      PostData("dislikePost", this.state);
      this.setState({ likes: parseInt(likes) - 1 });
    } else {
      PostData("likePost", this.state);
      this.setState({ likes: parseInt(likes) + 1 });
    }
    //changes the state of like
    this.setState({ likedByUser: !likedByUser });
    return false;
  }

  render() {
    const { likes, likedByUser } = this.state;
    return (
      <React.Fragment>
        {/*If user already liked the post, show dislike btn*/}
        {(!likedByUser && (
          <div title="Like" className="heart1" onClick={this.LikeAction} />
        )) || (
          <div
            title="Dislike"
            className="heart1 heart-line"
            onClick={this.LikeAction}
          />
        )}
        {likes >= 1 && likes}
      </React.Fragment>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments, //Object with all post's comments
      newComment: null, //new comment possibly added
      postId: this.props.postId
    };

    this.handleChange = this.handleChange.bind(this);
    this.makeComment = this.makeComment.bind(this);
  }
  //Mirror changes on input to the state
  handleChange = event => {
    this.setState({ newComment: event.target.value });
  };

  makeComment() {
    //Add the new comment to the state and UI and clean input
    this.setState({
      comments: [
        { user_id: 1, comment: this.state.newComment },
        ...this.state.comments
      ],
      newComment: ""
    });
    PostData("makeComment", this.state); //Save changes on DB
    return false;
  }

  render() {
    const { comments } = this.state;
    return (
      <React.Fragment>
        <div className="comments">
          {comments.length > 3 && (
            <p className="view-all">View all {comments.length} comments</p>
          )}
          {comments.slice(0, 3).map(comment => {
            return (
              <p className="comment-container">
                <strong>{comment.user_id} </strong>
                {comment.comment}
              </p>
            );
          })}
        </div>

        <div className="make-comment">
          <textarea
            placeholder="Add a comment..."
            rows="1"
            className="comment-input"
            onChange={this.handleChange}
            value={this.state.newComment}
            required
          />
          <button onClick={this.makeComment} className="btn-post-comment">
            Post
          </button>
        </div>
      </React.Fragment>
    );
  }
}

class SaveBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: this.props.postId,
      savedByUser: this.props.savedByUser //true or false
    };

    this.SaveAction = this.SaveAction.bind(this);
  }

  SaveAction() {
    //saves changes on DB and on state UI
    if (this.state.savedByUser) {
      PostData("unsavePost", this.state);
    } else {
      PostData("savePost", this.state);
    }
    this.setState({ savedByUser: !this.state.savedByUser });
    return false;
  }

  render() {
    const { savedByUser } = this.state;
    return (
      <span className="span-right">
        <button type="button" className="btn-noStyle" onClick={this.SaveAction}>
          {(!savedByUser && (
            <i title="Save Post" class="fas fa-bookmark"></i>
          )) || (
            <i
              style={{ color: "rgb(226,38,77)" }}
              title="Unsave Post"
              class="fas fa-bookmark"
            ></i>
          )}
        </button>
      </span>
    );
  }
}

export default class WallGrid extends React.Component {
  render() {
    return this.props.posts.map(post => {
      const {
        post_id,
        user_id,
        date,
        content, //text of post
        likes, //num of likes
        likedByUser, //true or false
        savedByUser, //trur e or false
        comments //list of comments
      } = post;
      return (
        <React.Fragment>
          <div className="post">
            <div className="post-info">
              <div className="post-info-img-container">
                <img
                  alt=""
                  src={require("../../images/FOXYFACE_LOGO-01.png")}
                />
              </div>
              <div className="post-info-text">
                <h1>@{user_id}</h1>
                <h5>{date}</h5>
              </div>
            </div>

            <div className="post-content">
              {content && <p>{content}</p>}
              <img alt="" src={require("../../images/ex.png")} />
            </div>

            <div className="post-actions">
              <LikeBtn
                postId={post_id}
                likes={likes}
                likedByUser={likedByUser}
              />
              <SaveBtn postId={post_id} savedByUser={savedByUser} />
            </div>

            <Comments postId={post_id} comments={comments} />
          </div>
        </React.Fragment>
      );
    });
  }
}
