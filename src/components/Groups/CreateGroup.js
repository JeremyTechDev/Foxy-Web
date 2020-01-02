import React from "react";
import "../../css/groups.scss";
import { PostData } from "../../services/PostData";

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createGroup: {
        name: null,
        image: null,
        description: null
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Creates the group on the DB and refresh page
  handleSubmit() {
    PostData("createGroup", this.state.createGroup);
    window.location.reload(); //refresh page
  }

  //runs everytime user changes any input file
  handleChange = key => event => {
    this.setState({
      createGroup: {
        ...this.state.createGroup,
        [key]: event.target.value
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="create-group corner-popup">
          <h1>CREATE A GROUP</h1>
          <img alt="" src={require("../../images/cover.png")} />
          <p>or</p>

          <form onSubmit={this.handleSubmit} className="form-AddGroup">
            <div className="div-label">
              <input
                onChange={this.handleChange("image")}
                maxLength="255"
                className="inp"
                required
              />
              <label>Paste image link here:</label>
            </div>
            <div className="div-label">
              <input
                onChange={this.handleChange("name")}
                maxLength="255"
                className="inp"
                required
              />
              <label>Group Name:</label>
            </div>
            <div className="div-label">
              <textarea
                onChange={this.handleChange("description")}
                maxLength="255"
                className="inp"
                required
              />
              <label>Description:</label>
            </div>
            <p>You will be the admin of the groups you create.</p>

            <button className="btn-create btn" type="submit">
              CREATE GROUP
            </button>
          </form>
          <button
            onClick={() => {
              this.props.toggleDisplay();
            }}
            className="btn-toggle-AddGroup btn"
          >
            CLOSE
          </button>
        </div>
      </React.Fragment>
    );
  }
}
