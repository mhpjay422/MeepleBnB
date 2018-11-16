import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  render() {
    window.logo = "<%= image_url(/3d-meeple.png') %>";
    return (
      <div className="splash">
        <div className="topbar">
          <section className="topsec">
            <Link to="/greeting" className="navbar-left">
              <img src="./3d-meeple4.png"/>
            </Link>
          <ul className="twobar">
            <li>
              <Link className="splashlink" to="/login">Login</Link>
            </li>
            <li>
              <Link className="splashlink" to="/signup">Sign Up</Link>
            </li>
          </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default Splash;
