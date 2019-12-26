import React from "react";
import "../css/home.scss";

class FormSignIn extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="form">
          <h1>Foxy</h1>
          <form>
            <div>
              <input type="text" name="username" className="inp" />
              <label>Username or email</label>
            </div>

            <div>
              <input type="password" name="password" className="inp" />
              <label>Password</label>
            </div>

            <button className="sign">Sign In</button>

            <button className="forgot">Forgot your password?</button>
          </form>
        </div>

        <div onClick={this.props.toogleDisplay} className="change-form">
          Don't have an account?
          <span>Create one</span>
        </div>
      </React.Fragment>
    );
  }
}

class FormSignUp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="form">
          <h1>Foxy</h1>
          <form>
            <div>
              <input type="text" name="nickname" className="inp" />
              <label>Nickname</label>
            </div>

            <div>
              <input type="text" name="username" className="inp" />
              <label>Username</label>
            </div>

            <div>
              <input type="text" name="email" className="inp" />
              <label>Email</label>
            </div>

            <div>
              <input type="password" name="password" className="inp" />
              <label>Password</label>
            </div>

            <div>
              <input type="password" name="password_v" className="inp" />
              <label>Verify password</label>
            </div>

            <button className="sign">Sign Up</button>
          </form>
        </div>

        <div onClick={this.props.toogleDisplay} className="change-form">
          Already have an account?
          <span>Sign In</span>
        </div>
      </React.Fragment>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySignIn: true //display sign in as default
    };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  //Changes the view of the sign in and sign up forms
  toggleDisplay() {
    const { displaySignIn } = this.state;
    this.setState({
      displaySignIn: !displaySignIn
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="left">
          <div className="quote">
            <h1>
              <i class="fas fa-quote-left quote-left" />
              <br />
              It is only with the heart that one can see rightly; what is
              essential is invisible to the eye.
              <br />
              <i class="fas fa-quote-right quote-right" />
            </h1>
          </div>
          <img alt="" src={require("../images/FOXY_LOGO.png")} />
        </div>
        <div className="right">
          {this.state.displaySignIn && (
            <FormSignIn toogleDisplay={this.toggleDisplay} />
          )}
          {!this.state.displaySignIn && (
            <FormSignUp toogleDisplay={this.toggleDisplay} />
          )}
        </div>
      </React.Fragment>
    );
  }
}
