import React from 'react';
import {Link} from 'react-router-dom';

export default ({ users, logout, loggedIn, demoLogin, openModal}) => {
    return (
      <div className="splash">
        <div className="topbar">
          <section className="topsec">
              <Link to="/greeting" className="navbar-left">
                <img src="./3d-meeple4.png"/>
              </Link>
              <ul className="twobar">
                <nav className="splashbuttons">
                  <li>
                    <button
                      className="loginbuttons"
                      onClick={() => openModal('login')}>Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="loginbuttons"
                      onClick={() => openModal('signup')}>Signup
                    </button>
                  </li>
                  <li>
                    <button
                    className="loginbuttons"
                    value="Login as Demo User"
                      onClick={demoLogin}> Log In as Demo User
                    </button>
                  </li>
                </nav>
              </ul>
          </section>
        </div>
      </div>
    );
};
