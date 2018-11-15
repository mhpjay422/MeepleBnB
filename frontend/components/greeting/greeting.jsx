import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, logout, loggedIn }) => {

  const linkToSessions = () => {
    return (
      <nav className="login-signup">
        <Link to="/login">Login</Link>
        &nbsp;or&nbsp;
        <Link to="/signup">Sign Up!</Link>
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
