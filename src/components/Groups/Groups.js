import React from "react";
import Header from "../Header";
import "../../css/groups.scss";
import GroupsGrid from "./GroupsGrid";
import CreateGroup from "./CreateGroup";
import * as Redux from "../../store";

export default class Groups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display_CreateGroup: false, //shown or hidden form
      groups: []
    };

    Redux.store.subscribe(() => {
      this.setState({
        groups: Redux.store.getState().groups
      });
    });

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    Redux.store.dispatch(Redux.handleInitialData());
  }

  //shows and hides corner-popup
  toggleDisplay() {
    this.setState({ display_CreateGroup: !this.state.display_CreateGroup });
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
          <button
            className="btn-toggle-AddGroup  btn"
            onClick={this.toggleDisplay}
          >
            CREATE A GROUP
          </button>
        )}
      </React.Fragment>
    );
  }
}
