import React from "react";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demo = this.demo.bind(this);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.target.value
      });
  }

  clickClear(field) {
    return e =>
      this.setState({
        [field]: ""
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  demo(e) {
    e.preventDefault(e);
    this.props.demoLogin().then(this.props.closeModal);
  }

  renderErrors() {
    const errorMess = this.props.errors.map((error, i) => {
      return (
        <div key={`error-${i}`} className="errors">
          {error}
        </div>
      );
    });

    return <ul>{errorMess}</ul>;
  }

  render() {
    const userLabel = (
      <label>
        <input
          className="form-submit"
          placeholder="Username"
          type="text"
          value={this.state.username}
          onChange={this.update("username")}
          onKeyPress={this.keypress}
          onClick={this.clickClear("username")}
        />
      </label>
    );

    const passwordLabel = (
      <label>
        <input
          className="form-submit"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.update("password")}
          onKeyPress={this.keypress}
          onClick={this.clickClear("password")}
        />
      </label>
    );

    const emailLabel = () => {
      if (this.props.formType === "Signup") {
        return (
          <div>
            <br />
            <label>
              <input
                className="form-submit"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.update("email")}
                onKeyPress={this.keypress}
                onClick={this.clickClear("email")}
              />
            </label>
          </div>
        );
      } else {
        return <></>;
      }
    };

    const signupOrLogin = () => {
      if (this.props.formType === "Signup") {
        return (
          <div className="sl-text">
            Already have an MeepleBnB account? {this.props.otherForm}
          </div>
        );
      } else {
        return (
          <div className="sl-text">
            Don’t have an account? {this.props.otherForm}
          </div>
        );
      }
    };

    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div onClick={this.props.closeModal} className="close-x">
            <img src="close-window-X.png"/>
          </div>
          <div className="login-header">
            <div className="login-greet">{this.props.formType}</div>
          </div>
          <div className="render-errors">{this.renderErrors()}</div>
          <div className="login-form">
            <div className="label-submit">
              {emailLabel()}
              {userLabel}
              {passwordLabel}
            </div>
            <input
              className="session-submit form-submit"
              type="submit"
              value={this.props.formType}
            />
          </div>
          <div className="demoo">
            <button
              className="demo-button form-submit"
              value="Login as Demo User"
              onClick={this.demo}
              >
              {" "}
              Log In as Demo User
            </button>
          </div>

          <div>
            <hr />
          </div>
          <div className="strike">{signupOrLogin()}</div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
