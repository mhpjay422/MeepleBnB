import React from 'react';
import {Link} from 'react-router-dom';
import SearchContainer from '../searchbar/searchbar_container.jsx';

export default ({ users, logout, loggedIn, demoLogin, openModal}) => {

  const nav = (
    <div className="splash-topbar">
      <section className="topsec">
          <div className="leftbar">
            <Link to="/greeting" className="navbar-left">
              <img src="./3d-meeple4.png" />
            </Link>
          <SearchContainer />
          </div>
          
          <ul className="twobar">
            <nav className="splashbuttons">
              <li>
                <button
                  className="loginbuttons"
                  onClick={() => openModal('log in')}>Login
                </button>
              </li>
              <li>
                <button
                  className="loginbuttons"
                  onClick={() => openModal('sign up')}>Signup
                </button>
              </li>
              <li>
                <Link to="/greeting">
                  <button
                    className="loginbuttons"
                    value="Login as Demo User"
                    onClick={demoLogin}> Log In as Demo User
                  </button>
                </Link>
              </li>
            </nav>
          </ul>
      </section>
    </div>
  );

  const splash = () => {
    if (loggedIn) {
      return (
        <nav/>
      );
    } else {
      return(
        <div className="splash">
          {nav}
        </div>
      );
    }
  };


  return splash();
};
