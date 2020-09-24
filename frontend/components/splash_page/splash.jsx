import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../search_form/search_form.jsx";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashLoginMenuOpen: false,
    };

    this.keyDownSplashLink = this.keyDownSplashLink.bind(this);
    this.keyUpSplashLink = this.keyUpSplashLink.bind(this);
    this.toggleSplashLoginMenu = this.toggleSplashLoginMenu.bind(this);
    this.handleClickOutsideLoginMenu = this.handleClickOutsideLoginMenu.bind(this);
    this.clickLoginMenuOption = this.clickLoginMenuOption.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutsideLoginMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutsideLoginMenu);
  }

  handleClickOutsideLoginMenu(e) {
    const clickLoginMenu = this.menu && this.menu.contains(e.target)
    const clickLoginButton = this.menuButton && this.menuButton.contains(e.target) === true
    const clickOutMenu = !(clickLoginMenu || clickLoginButton)
    const loginShouldClose = this.menu && clickOutMenu

    if (loginShouldClose) {
      this.setState({ splashLoginMenuOpen: false })
    }
  }

  keyDownSplashLink() {
    document.getElementById("splash-link").style.width = "124px";
    document.getElementById("splash-link").style.marginLeft = "3px";
    document.getElementById("splash-link").style.marginBottom = "1px";
    document.getElementById("splash-link").style.height = "14px";
    document.getElementById("splash-link").style.fontSize = "14px";
  }

  keyUpSplashLink() {
    document.activeElement.blur();
    document.getElementById("splash-link").style.marginLeft = "0px";
    document.getElementById("splash-link").style.marginBottom = "0px";
    document.getElementById("splash-link").style.width = "130px";
    document.getElementById("splash-link").style.height = "18px";
    document.getElementById("splash-link").style.fontSize = "15px";
  }

  toggleSplashLoginMenu() {
    this.setState({ splashLoginMenuOpen: !this.state.splashLoginMenuOpen });
  }

  clickLoginMenuOption(e) {
    this.toggleSplashLoginMenu()
    if (this.signup.contains(e.target)) {
      this.props.openModal("signup")
    } else if (this.login.contains(e.target)) {
      this.props.openModal("login")
    } else {
      this.props.demoLogin()
    }
  }

  render() {
    const splashMenu = () => {
      if (this.state.splashLoginMenuOpen) {
        return (
          <div
            ref={menu => this.menu = menu}
            className="splash-login-menu-container"
          >
            <div className="splash-login-menu-frame">
              <div className="splash-login-menu-item-container">
                <div className="splash-login-menu-item-frame">
                  <div
                    className="splash-login-menu-item-text-frame"
                    ref={signup => this.signup = signup}
                    onClick={this.clickLoginMenuOption}>
                    <div className="splash-login-menu-item-text-signup">
                      Sign up
                    </div>
                  </div>
                </div>
                <div
                  className="splash-login-menu-item-frame"
                  ref={login => this.login = login}
                  onClick={this.clickLoginMenuOption}>
                  <div className="splash-login-menu-item-text-frame">
                    Log in
                  </div>
                </div>
                <div
                  className="splash-login-menu-item-frame"
                  ref={demo => this.demo = demo}
                  onClick={this.clickLoginMenuOption}>
                  <div className="splash-login-menu-item-text-frame">
                    Demo Log in
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <></>;
      }
    };

    const nav = (
      <div className="splash-topbar">
        <section className="topsec">
          <div className="leftbar">
            <Link to="/greeting" className="navbar-left">
              <img src="./3d-meeple5.png" />
            </Link>
            <div className="leftbar-text">meeplebnb</div>
          </div>
          <div className="splash-search-container">
            <div className="splash-search-container-absolute">
              <div className="splash-search-padding">
                <div className="splash-search-frame" autoComplete="off">
                  <fieldset className="splash-search-top">
                    <div className="splash-search-top-tabs">
                      <div className="splash-search-top-tab">
                        <span className="search-tab-stay">Places to stay</span>
                      </div>
                    </div>
                  </fieldset>
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>

          <ul className="twobar">
            <nav className="splashbuttons">
              <button
                ref={menuButton => this.menuButton = menuButton}
                type="button"
                className="splashbuttons-button"
                onClick={this.toggleSplashLoginMenu}
              >
                <img
                  src="./menu-dashes.png"
                  className="splashbuttons-menu-dashes"
                />
                <div className="splashbuttons-user-img">
                  <img src="./profile.png" />
                </div>
              </button>
              {splashMenu()}
              {/* <li>
                <button
                  className="loginbuttons"
                  onClick={() => this.props.openModal("login")}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="loginbuttons"
                  onClick={() => this.props.openModal("signup")}
                >
                  Signup
                </button>
              </li>
              <li>
                <button
                  className="loginbuttons"
                  value="Login as Demo User"
                  onClick={() => this.props.demoLogin()}
                >
                  {" "}
                  Log In as Demo User
                </button>
              </li> */}
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
                <div className="tagline-main-text">Go Near or Far</div>
                <div className="tagline-main-text-mini">
                  Travel to a destination at your leisure
                </div>
                <Link
                  className="splash-link"
                  id="splash-link"
                  to="./greeting"
                  onFocus={this.keyDownSplashLink}
                  onClick={this.keyUpSplashLink}
                  onMouseOut={this.keyUpSplashLink}
                >
                  Explore New York
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );

    const splash = () => {
      return (
        <>
          <img className="splash" src="background1.jpg" aria-hidden="true" />
          {nav}
          {tagline}
        </>
      );
    };

    return splash();
  }
}
