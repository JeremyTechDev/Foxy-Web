import React from "react";

class Login extends React.Component {
  render() {
    return (
      <section style={{flexDirection: "row-reverse"}}>
        <div className="image" style={{width: "45%", margin: "0 10% 0 0"}}></div>
        <div className="container"  style={{width: "35%", margin: "0 0 0 10%"}}>
          <h1 style={{marginBottom: "50px"}}>Login</h1>
          <form>
            <input
              name="username"
              autoComplete="off"
              type="text"
              placeholder="Username"
              required
            />{" "}
            <br />

            <input
              name="password"
              autoComplete="off"
              type="password"
              placeholder="Password"
              required
            />{" "}
            <br />

            <button style={{marginTop: "50px"}} type="submit">Login</button>
          </form>
        </div>
      </section>
    );
  }
}

class Register extends React.Component {
  render() {
    return (
      <section>
        <div className="image"></div>
        <div className="container">
          <h1>Register</h1>
          <form>
            <input
              name="name"
              autoComplete="off"
              type="text"
              placeholder="Name"
              required
            />{" "}
            <br />
            <input
              name="username"
              autoComplete="off"
              type="text"
              placeholder="Username"
              required
            />{" "}
            <br />
            <input
              name="email"
              autoComplete="off"
              type="mail"
              placeholder="E-mail"
              required
            />{" "}
            <br />
            <input
              name="password"
              autoComplete="off"
              type="password"
              placeholder="Password"
              required
            />{" "}
            <br />
            <input
              name="confirm_password"
              autoComplete="off"
              type="password"
              placeholder="Confirm password"
              required
            />{" "}
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    );
  }
}

export default class SignIn extends React.Component {
  render() {
    return (
        <React.Fragment>
            {false && <Register />}
            {true && <Login />}
        </React.Fragment>

    )
  }
}
