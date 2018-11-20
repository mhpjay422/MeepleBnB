import React from 'react';
import {Link} from 'react-router-dom';

export default ({ users, logout, loggedIn, demoLogin, openModal}) => {

  const demo = () => {
    if(loggedIn) {
      return (
        <button className="header-button" onClick={logout}>
          Log Out
        </button>
      );
    } else {
      return (
        <nav className="greet-splashbuttons">
          <li>
            <button
              className="greet-loginbuttons"
              onClick={() => openModal('login')}>Login
            </button>
          </li>
          <li>
            <button
              className="greet-loginbuttons"
              onClick={() => openModal('signup')}>Signup
            </button>
          </li>
          <li>
            <button
            className="greet-loginbuttons"
            value="Login as Demo User"
              onClick={demoLogin}> Log In as Demo User
            </button>
          </li>
        </nav>
      );
    }
  };

  const navbar = (
    <div className="topbar">
      <section className="greet-topsec">
          <Link to="/greeting" className="navbar-left">
            <img src="./3d-meepleneg.png"/>
          </Link>
          <ul className="twobar">
            {demo()}
          </ul>
      </section>
    </div>
  );

  const linkToSessions = () => {
    return (
      <nav>
        {navbar}
        <hr className="greethr"/>
      </nav>
    );
  };

  return linkToSessions();
};
