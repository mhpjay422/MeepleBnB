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
    this.props.processForm(user);
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
      if(this.props.formType === 'signup') {
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
          Please {this.props.formType} or {this.props.navLink}
          <div className="login-form">
            <br/>
              { emailLabel() }
              { userLabel }
            <br/>
              { passwordLabel }
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
