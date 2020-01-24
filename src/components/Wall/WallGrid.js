import React from "react";
import { Link } from "react-router-dom";
import SinglePost from "./Post";
import * as Redux from "../../store";

export class LikeBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likedByUser: this.props.post.likedByUser,
      likes: this.props.post.likes, //num of likes
      postId: this.props.post.post_id,
      userId: this.props.user
    };

    this.LikeAction = this.LikeAction.bind(this);
  }
  //Add one like to the post on the DB
  LikeAction() {
    const { likedByUser, likes } = this.state;
    //Adds and reduces likes on UI and DB
    Redux.store.dispatch(Redux.toogleLikeAction(this.state));
    if (likedByUser) {
      this.setState({ likes: parseInt(likes) - 1 });
    } else {
      this.setState({ likes: parseInt(likes) + 1 });
    }
    //changes the state of like
    this.setState({ likedByUser: !likedByUser });
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

export class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCommentData: {
        username: this.props.user, //the users making the comment
        postId: this.props.post.post_id, //post where the comment will be added
        newComment: "" //new comment possibly added
      },
      allComments: this.props.post.comments,
      showSinglePost: false
    };

    this.showSinglePost = this.showSinglePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeComment = this.makeComment.bind(this);
  }
  //shows and hides SinglePost Display
  showSinglePost() {
    this.setState({ showSinglePost: !this.state.showSinglePost });
  }
  //Mirror changes on input to the state
  handleChange = event => {
    this.setState({
      newCommentData: {
        ...this.state.newCommentData,
        newComment: event.target.value
      }
    });
  };

  makeComment() {
    const { allComments, newCommentData } = this.state;
    //Add the new comment to the state and UI and clean input
    this.setState({
      allComments: allComments.push({
        username: newCommentData.username,
        comment: newCommentData.newComment
      })
    });

    Redux.store.dispatch(Redux.addCommentAction(this.state.newCommentData)); //Save changes on DB
  }

  render() {
    const { allComments, newCommentData, showSinglePost } = this.state;
    return (
      <React.Fragment>
        <div className="comments">
          {allComments.length > 3 && (
            <p onClick={this.showSinglePost} className="view-all">
              View all {allComments.length} comments
            </p>
          )}

          {showSinglePost && (
            <SinglePost
              display={() => this.showSinglePost()}
              post={this.props.post}
            />
          )}

          {allComments.slice(0, 3).map(com => {
            return (
              <p className="comment-container">
                <Link
                  to={{
                    pathname: "/profile",
                    search: `?user=${com.username}`
                  }}
                >
                  <strong>{com.username} </strong>
                </Link>
                {com.comment}
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
            value={newCommentData.newComment}
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

export class SaveBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post,
      savedByUser: this.props.post.savedByUser,
      postId: this.props.post.post_id,
      userId: this.props.user
    };

    this.SaveAction = this.SaveAction.bind(this);
  }

  SaveAction() {
    //saves changes on DB and on state UI
    Redux.store.dispatch(Redux.toogleSaveAction(this.state));
    this.setState({ savedByUser: !this.state.savedByUser });
  }

  render() {
    const { savedByUser } = this.state;
    return (
      <span className="span-right">
        <button type="button" className="btn-noStyle" onClick={this.SaveAction}>
          {(!savedByUser && (
            <i title="Save Post" className="fas fa-bookmark"></i>
          )) || (
            <i
              style={{ color: "rgb(226,38,77)" }}
              title="Unsave Post"
              className="fas fa-bookmark"
            ></i>
          )}
        </button>
      </span>
    );
  }
}

export default class WallGrid extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.posts.map(post => {
          const { date, content, userData } = post;
          return (
            <React.Fragment>
              <div className="post">
                <div className="post-info">
                  <div className="post-info-img-container">
                    <img alt="" src={userData[0].profile_img} />
                  </div>

                  <div className="post-info-text">
                    <Link
                      to={{
                        pathname: "/profile",
                        search: `?user=${userData[0].username}`
                      }}
                    >
                      <h3>{userData[0].username}</h3>
                    </Link>
                    <h6>{date}</h6>
                  </div>
                </div>

                <pre className="post-content">
                  {content && <p>{content}</p>}
                  <img alt="" src={post.img} />
                </pre>

                <div className="post-actions">
                  <LikeBtn post={post} user={this.props.user.user}/>
                  <SaveBtn post={post} user={this.props.user.user}/>
                </div>

                <Comments post={post} user={this.props.user.user} />
              </div>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}