import React from 'react';
import { withRouter } from 'react-router-dom';
import { merge } from 'lodash';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  renderErrors() {
    const errorMess = this.props.errors.map((error, i) => {
      return (
        <li
          key={`error-${i}`}
        >
        {error}
        </li>
      )
    })

    return(
      <ul>
        {errorMess}
      </ul>
    );
  }

  render() {

    const userLabel = (
      <label>Username:
      <input type="text"
      value={this.state.username}
      onChange={this.update('username')}
      className="login-input"
      />
      </label>
    );

    const passwordLabel = (
      <label>Password:
        <input type="password"
          value={this.state.password}
          onChange={this.update('password')}
          className="login-input"
        />
      </label>
    );

    const emailLabel = () => {
      if(this.props.formType === 'Signup') {
        return (
          <div>
            <br/>
              <label>Email:
                <input type="email"
                  value={this.state.email}
                  onChange={this.update('email')}
                  className="signup-input"
                />
              </label>
            </div>
        );
      } else {
        return <></>;
      }
    };



    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to MeepleBnB!
          <br/>
          Please {this.props.formType} below or {this.props.otherForm}
          {this.renderErrors()}

          <div className="login-form">
            <br/>
              { emailLabel() }
              { userLabel }
            <br/>
              { passwordLabel }
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
            <br/>
          </div>
        </form>
        <button className="login-form-box"  value="Login as Demo User"
        onClick={this.props.demoLogin}> Log In as Demo User
        </button>
      </div>
    );
  }
}

export default withRouter(SessionForm);
