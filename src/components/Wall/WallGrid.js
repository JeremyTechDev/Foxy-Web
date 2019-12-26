import React from "react";
import { PostData } from "../../services/PostData";

class LikeBtn extends React.Component {
  constructor(props) {
    super(props);

    this.LikeAction = this.LikeAction.bind(this);
  }
  //Add one like to the post on the DB
  LikeAction() {
    if(this.props.likedByUser) {
      PostData("dislikePost", this.props);
    } else {
      PostData("likePost", this.props);
    }
    return false;
  }

  render() {
    const { likes, likedByUser } = this.props;
    return (
      <form className="noStyle" onSubmit={this.LikeAction}>
        {/*If user already liked the post, show dislike btn*/}
        {!likedByUser && <button className="btn-noStyle" type="submit" title="Like">
          <i class="fas fa-heart"></i>
        </button>}
        {likedByUser && <button className="btn-noStyle" type="submit" title="Like">
          <i class="fas fa-heart-broken"></i>
        </button>}

        {/*No display when 0 likes*/}
        {likes > 1 && <span className="num-likes">{likes} likes</span>}
      </form>
    );
  }
}

function CommentBtn(CommentPost) {
  return (
    <form className="noStyle" onSubmit={CommentPost}>
      <button className="btn-noStyle" type="submit" title="Comment">
        <i class="fas fa-comment"></i>
      </button>
    </form>
  );
}

function SaveBtn(SavePost) {
  return (
    <span>
      <form className="noStyle" onSubmit={SavePost}>
        <button className="btn-noStyle" type="submit" title="Save Post">
          <i class="fas fa-bookmark"></i>
        </button>
      </form>
    </span>
  );
}

export default class WallGrid extends React.Component {
  render() {
    return this.props.posts.map(post => {
      const { id, user, date, content, likes, likedByUser } = post;

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
                <h1>@{user}</h1>
                <h5>{date}</h5>
              </div>
            </div>

            <div className="post-content">
              {content && <p>{content}</p>}
              <img alt="" src={require("../../images/ex.png")} />
            </div>

            <div className="post-actions">
              <LikeBtn postId={id} likes={likes} likedByUser={likedByUser} />
              <CommentBtn />
              <SaveBtn />
            </div>
          </div>
        </React.Fragment>
      );
    });
  }
}
