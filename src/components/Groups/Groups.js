import React from "react";
import Header from "../Header";
import "../../css/groups.scss";
import GroupsGrid from "./GroupsGrid";
import CreateGroup from "./CreateGroup";
import { PostData } from "../../services/PostData";

export default class Groups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [], //all gruops
      display_CreateGroup: false //shown or hidden form
    };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  //shows and hides corner-popup
  toggleDisplay() {
    this.setState({ display_CreateGroup: !this.state.display_CreateGroup });
  }

  componentDidMount() {
    PostData("selectAllGroups", {}).then(res => {
      res.allGroups.forEach(group => {
        this.setState({
          groups: [...this.state.groups, group]
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <div style={{ width: "80%", margin: "120px auto 0" }}>
          <GroupsGrid groups={this.state.groups} />
        </div>

        {(this.state.display_CreateGroup && (
          <CreateGroup toggleDisplay={this.toggleDisplay} />
        )) || (
          <button className="btn-toggle-AddGroup  btn" onClick={this.toggleDisplay}>
            CREATE A GROUP
          </button>
        )}
      </React.Fragment>
    );
  }
}
