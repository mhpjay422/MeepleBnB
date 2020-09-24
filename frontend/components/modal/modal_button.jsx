import React from "react";

export default class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashLoginMenuOpen: false,
    };

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

    const buttonModal = () => {
      return (

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
        </nav>

      )
    }

    return buttonModal();
  }
}