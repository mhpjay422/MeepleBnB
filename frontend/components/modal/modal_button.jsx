import React from "react";
import { Link } from "react-router-dom";

export default class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashLoginMenuOpen: false,
    };

    this.toggleSplashLoginMenu = this.toggleSplashLoginMenu.bind(this);
    this.handleClickOutsideLoginMenu = this.handleClickOutsideLoginMenu.bind(this);
    this.clickLoginMenuOption = this.clickLoginMenuOption.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutsideLoginMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutsideLoginMenu);
  }

  handleClickOutsideLoginMenu(e) {
    const clickLoginMenu = this.menu && this.menu.contains(e.target)
    const clickLoginButton = this.menuButton && this.menuButton.contains(e.target)
    const clickOutMenu = !(clickLoginMenu || clickLoginButton)
    const loginShouldClose = this.menu && clickOutMenu

    if (loginShouldClose) {
      this.setState({ splashLoginMenuOpen: false })
    }
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

  logOut() {
    this.props.logout()
    // this.setState({ state: this.state });
  }

  render() {
    const splashMenu = () => {
      if (this.state.splashLoginMenuOpen) {
        if (this.props.loggedIn) {

          return (

            <div
              ref={menu => this.menu = menu}
              className="buttonModal-login-menu-container"
            >
              <div className="buttonModal-login-menu-frame">
                <div className="buttonModal-login-menu-item-container">
                  <div className="buttonModal-login-menu-item-frame">
                    <Link
                      className="buttonModal-login-menu-item-text-frame"
                      to={`/bookings/${this.props.users.id}`}>
                      <div className="buttonModal-login-menu-item-text-bolder">
                        Trips
                      </div>
                    </Link>
                  </div>
                  <div
                    className="buttonModal-login-menu-item-frame"
                    ref={login => this.login = login}>
                    <Link
                      className="buttonModal-login-menu-item-text-frame"
                      onClick={this.logOut}
                      to={`/greeting`}>
                      <div className="buttonModal-login-menu-item-text-bolder">
                        Log out
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          );
        } else {

          return (

            <div
              ref={menu => this.menu = menu}
              className="buttonModal-login-menu-container"
            >
              <div className="buttonModal-login-menu-frame">
                <div className="buttonModal-login-menu-item-container">
                  <div className="buttonModal-login-menu-item-frame">
                    <div
                      className="buttonModal-login-menu-item-text-frame"
                      ref={signup => this.signup = signup}
                      onClick={this.clickLoginMenuOption}>
                      <div className="buttonModal-login-menu-item-text-signup">
                        Sign up
                      </div>
                    </div>
                  </div>
                  <div
                    className="buttonModal-login-menu-item-frame"
                    ref={login => this.login = login}
                    onClick={this.clickLoginMenuOption}>
                    <div className="buttonModal-login-menu-item-text-frame">
                      Log in
                    </div>
                  </div>
                  <div
                    className="buttonModal-login-menu-item-frame"
                    ref={demo => this.demo = demo}
                    onClick={this.clickLoginMenuOption}>
                    <div className="buttonModal-login-menu-item-text-frame">
                      Demo Log in
                    </div>
                  </div>
                </div>
              </div>
            </div>

          );

        }
      } else {
        return <></>;
      }
    };

    const ifLoggedInPic = () => {
      if (this.props.loggedIn) {
        return "./favicon.ico"
      } else {
        return "./profile.png"
      }
    }

    const buttonModal = () => {

      return (

        <nav className="buttonModal">
          <button
            ref={menuButton => this.menuButton = menuButton}
            type="button"
            className="buttonModal-button"
            onClick={this.toggleSplashLoginMenu}
          >
            <img
              src="./menu-dashes.png"
              className="buttonModal-menu-dashes"
            />
            <div className="buttonModal-user-image">
              <img src={ifLoggedInPic()} className="buttonModal-user-img" />
            </div>
          </button>
          {splashMenu()}
        </nav>

      );
    }
    // }

    return buttonModal();
  }
}