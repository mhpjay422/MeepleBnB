import React from 'react';

export default ({ users, logout, loggedIn, demoLogin, openModal}) => {

  const linkToSessions = () => {
    return (
      <nav className="login-signup">
        <button onClick={() => openModal('login')}>Login</button>
          <br/>
        <button onClick={() => openModal('signup')}>Signup</button>
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
