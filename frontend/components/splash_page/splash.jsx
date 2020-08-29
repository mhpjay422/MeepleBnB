import React from 'react';
import {Link} from 'react-router-dom';
import SearchContainer from '../searchbar/searchbar_container.jsx';

export default ({ users, logout, loggedIn, demoLogin, openModal}) => {

  const nav = (
    <div className="splash-topbar">
      <section className="topsec">

          <div className="leftbar">
            <Link to="/greeting" className="navbar-left">
              <img src="./3d-meeple5.png" />
            </Link>
            <div className="leftbar-text">
              meeplebnb
            </div>
          {/* <SearchContainer /> */}
          </div>

          <div className="splash-search-container">
            <div className="splash-search-container-absolute">
              <div className="splash-search-padding">
                <div className="splash-search-frame">
                  <fieldset className="splash-search-top">
                    <div className="splash-search-top-tabs">
                      <div className="splash-search-top-tab">
                        <span className="search-tab-stay">
                          Places to stay
                        </span>
                      </div>
                    </div>
                  </fieldset>
                  <div className="splash-search-form-container">
                    <div className="splash-search-form-frame">
                      <div className="splash-search-form-location-container" id="location-search">
                        <div className="splash-search-form-location-container-inner">
                          <div className="splash-search-form-location-container-inner-z">
                            <div className="splash-search-form-location-input-header">
                              Location
                            </div>
                              <SearchContainer />
                            {/* <input 
                              className="splash-search-form-location-input-input"
                              autoComplete="off"
                              autoCorrect="off"
                              placeholder="Where are you going?"
                              role="combobox">
                            </input> */}
                          </div>
                        </div>
                      </div>
                      <div className="splash-search-form-border-1" id="border1"></div>
                      <div className="splash-search-form-dates-item-container-1">
                        <div className="splash-search-form-dates-item-container-inner">
                          <div className="splash-search-form-dates-item-frame">
                            <div className="splash-search-form-dates-item-header">Check in</div>
                            <div className="splash-search-form-dates-item-body">Add dates</div>
                          </div>
                        </div>
                      </div>
                      <div className="splash-search-form-border-2"></div>
                      <div className="splash-search-form-dates-item-container-2" id="search-dates">
                        <div className="splash-search-form-dates-item-container-inner">
                          <div className="splash-search-form-dates-item-frame">
                            <div className="splash-search-form-dates-item-header">Check out</div>
                            <div className="splash-search-form-dates-item-body">Add dates</div>
                          </div>
                        </div>
                      </div>
                      <div className="splash-search-form-border-3"></div>
                      <div className="splash-search-guest-container">
                        <div className="splash-search-guest-container-inner">
                          <div className="splash-search-guest-frame">
                              <div className="splash-search-guest-header">Guests</div>
                              <div className="splash-search-guest-body">Add guests</div>
                          </div>
                        </div>
                        <div className="splash-search-submit-container">
                          <button className="splash-search-submit-frame">
                            <div className="splash-search-submit-icon-container">
                              <div className="splash-search-submit-icon">
                                <img src="search.png"></img>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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
  );

  const splash = () => {
    if (loggedIn) {
      return (
        <nav/>
      );
    } else {
      return(
        <>
          <img className="splash" src="background1.jpg">
          </img>
          {nav}
        </>
        );
    }
  };


  return splash();
};
