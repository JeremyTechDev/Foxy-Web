import React from "react";
import "../../css/wall.scss";
import { LikeBtn, SaveBtn } from "./WallGrid";

export default class SinglePost extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <div className="op-backgroud">
        <div className="s-post">
          
          {post.img && (
            <div className="s-post-img">
              <img alt="Post" src={post.img} />
            </div>
          )}

          <div className="s-post-content">
            <div className="post-info">
              <div className="post-info-img-container">
                <img alt="" src={post.userData[0].profile_img} />
              </div>

              <div className="post-info-text">
                <h2>{post !== undefined && post.user_id}</h2>
                <h5>{post !== undefined && post.date}</h5>
              </div>

              <button
                className="btn-noStyle s-post-close"
                onClick={this.props.display}
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div className="s-post-caption">{post.content}</div>

            <div className="s-post-comments">
              {post.comments.map(comment => {
                console.log("here", comment);
                return (
                  <div className="s-post-comment-container">
                    <p className="comment-container">
                      <strong>{comment.username} </strong>
                      {comment.comment}
                      <p className="s-comment-date">{comment.date}</p>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="post-actions">
              {post !== undefined && (
                <React.Fragment>
                  <LikeBtn post={post} />
                  <SaveBtn post={post} />
                </React.Fragment>
              )}
            </div>

            <div className="make-comment">
              <textarea
                placeholder="Add a comment..."
                rows="1"
                className="comment-input"
                required
              />
              <button className="btn-post-comment">Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
