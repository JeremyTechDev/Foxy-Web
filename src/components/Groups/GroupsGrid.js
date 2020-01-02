import React from "react";
import "../../css/groups.scss";

export default class GroupsGrid extends React.Component {
  render() {
    const { groups } = this.props;
    return (
      <div className="groups">
        {groups.map(group => {
          return (
            <div className="group-container">
              <img alt="" src={group.image} />

              <div className="group-info">
                <h4 className="gr-popularity">{group.popularity} Popularity</h4>
                <h2 className="gr-name">{group.name}</h2>
                <h4 className="gr-description">{group.description}</h4>
              </div>

              <div className="group-stats">
                <div>
                  <span>562</span>
                  <br />
                  Posts
                </div>
                <div>
                  <span>1654</span>
                  <br />
                  Members
                </div>
                <div>
                  <span>464</span>
                  <br />
                  Likes
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
