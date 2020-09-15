import React from 'react';
import {Link} from 'react-router-dom';
import SearchForm from "../search_form/search_form.jsx"

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashKeyDown: true,
    }; 

    this.keyDownSplashLink = this.keyDownSplashLink.bind(this);
    this.keyUpSplashLink = this.keyUpSplashLink.bind(this)
  }

  keyDownSplashLink() {
    debugger
    document.getElementById("splash-link").style.width =  "124px";
    document.getElementById("splash-link").style.marginLeft =  "3px";
    document.getElementById("splash-link").style.marginBottom =  "1px";
    document.getElementById("splash-link").style.height = "14px";
    document.getElementById("splash-link").style.fontSize = "14px";
  }
  
  keyUpSplashLink() {
    document.activeElement.blur();
    document.getElementById("splash-link").style.marginLeft =  "0px";
    document.getElementById("splash-link").style.marginBottom = "0px";
    document.getElementById("splash-link").style.width = "130px";
    document.getElementById("splash-link").style.height = "18px";
    document.getElementById("splash-link").style.fontSize = "15px";
  }



  render() {
     
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
            </div>
            <div className="splash-search-container">
              <div className="splash-search-container-absolute">
                <div className="splash-search-padding">
                  <div
                    className="splash-search-frame"
                    autoComplete="off"
                  >
                    <fieldset className="splash-search-top">
                      <div className="splash-search-top-tabs">
                        <div className="splash-search-top-tab">
                          <span className="search-tab-stay">
                            Places to stay
                          </span>
                        </div>
                      </div>
                    </fieldset>
                    <SearchForm/>
                  </div>
                </div> 
              </div>
            </div>
            
            <ul className="twobar">
              <nav className="splashbuttons">
                <li>
                  <button
                    className="loginbuttons"
                    onClick={() => this.props.openModal('login')}>Login
                  </button>
                </li>
                <li>
                  <button
                    className="loginbuttons"
                    onClick={() => this.props.openModal('signup')}>Signup
                  </button>
                </li>
                <li>
                    <button
                      className="loginbuttons"
                      value="Login as Demo User"
                      onClick={() => this.props.demoLogin()}> Log In as Demo User
                    </button>
                </li>
              </nav>
            </ul>
        </section>
      </div>
    );

    const tagline = (
      <>
        <div className="tagline-container">
          <div className="tagline-frame">
            <div className="tagline-padding">
              <div className="tagline-text-container">
                <div className="tagline-main-text">
                  Go Near or Far
                </div>
                <div className="tagline-main-text-mini">
                  Travel to a destination at your leisure
                </div>
                <Link 
                className="splash-link"
                id="splash-link"
                to='./greeting'
                onFocus={this.keyDownSplashLink}
                onMouseOut={this.keyUpSplashLink}
                >
                  Explore New York
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  
    const splash = () => {
      return(
          <>
            <img className="splash" src="background1.jpg" aria-hidden="true"/>
            {nav}
            {tagline}
          </>
      );
    };
  
    return splash();
  };
}