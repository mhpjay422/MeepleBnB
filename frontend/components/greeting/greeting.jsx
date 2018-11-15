import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, logout, loggedIn,demoLogin}) => {

  const linkToSessions = () => {
    return (
      <nav className="login-signup">
        <Link to="/login">Login</Link>
          <br/>
        <Link to="/signup">Sign Up!</Link>
          <br/>
        <button value="Login as Demo User"
          onClick={demoLogin}> Log In as Demo User
        </button>
      </nav>
    );
  };

  const loggedInGreeting = () => {
    return (
    <hgroup className="header-top">
      <h2 className="header-name">
        Greetings, {users.username}!
      </h2>
      <button className="header-button" onClick={logout}>
        Log Out
      </button>
    </hgroup>
    );
  };

  return loggedIn ? loggedInGreeting() : linkToSessions();
};
