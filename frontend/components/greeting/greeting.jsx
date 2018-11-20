import React from 'react';
import ListingsIndexContainer from '../listings/listing_index_container';
import SplashContainer from '../splash_page/splash_container';
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

  const sidenav = (
    <div className="sidenav">
      <div>Map</div>
      <div>Dates</div>
      <div>Guests</div>
      <div>Price</div>
    </div>
  );

  const linkToSessions = () => {
    return (
      <nav>
        {navbar}
        <div className="body-content">
          {sidenav}
          <ListingsIndexContainer/>
        </div>
      </nav>
    );
  };

  return linkToSessions();
};
