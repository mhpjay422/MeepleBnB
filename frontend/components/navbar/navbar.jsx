import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchContainer from '../searchbar/searchbar_container.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
    this.logInDemo = this.logInDemo.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logInDemo(e) {
    this.props.demoLogin()
    this.setState({ state: this.state });
  }

  logOut() {
    this.props.logout()
    this.setState({ state: this.state });
  }

  handleClick(e) {
    e.preventDefault()

    window.scroll(0, 0)

    if (this.props.history.location.pathname !== "/greeting") {

      this.props.history.push({
        pathname: "/greeting",
        search: "",
        state: { detail: "" }
      })

    } else {
      this.props.history.push({
        pathname: "/",
        search: "",
        state: { detail: "" }
      })
    }
  }

  render() {
  
  const demo = () => {
    if (this.props.loggedIn) {
      return (
        <div className="loggedin-buttons" >
          <Link className="header-button" to={`/bookings/${this.props.users.id}`}>
            <button className="header-button">Trips</button>
          </Link>
          <Link className="header-button" onClick={this.logOut} to={`/greeting`}>
            <button className="header-button">Log Out</button>
          </Link>
        </div>
      );
    } else {
      return (
        <nav className="greet-splashbuttons">
          <li>
            <button
              className="greet-loginbuttons"
              onClick={() => this.props.openModal("login")}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="greet-loginbuttons"
              onClick={() => this.props.openModal("signup")}
            >
              Signup
            </button>
          </li>
          <li>
            <Link to={`/greeting`}>
              <button
                className="greet-loginbuttons"
                value="Login as Demo User"
                onClick={this.logInDemo}
              >
                {" "}
                LogIn as Demo User
              </button>
            </Link>
          </li>
        </nav>
      );
    }
  };

  const navbar = () => {
    return (
      <div className="topbar">
        <section className="greet-topsec">
          <section className="greet-leftsec">
            <div className="greet-logo">
              <img src="./3d-meepleneg.png" className="navbar-left" onClick={this.handleClick} />
            </div>
            <div className="greetbar-text">
              <div>meeplebnb</div>
            </div>
          </section>
          <div className="greet-search-container">
            <div className="greet-search-mini-container">
              <div className="greet-search-mini-frame">

              </div>
            </div>
          </div>
          <div className="twobar">{demo()}</div>
        </section>
      </div>
    )
  }

  const linkToSessions = () => {
    return <nav>{navbar()}</nav>;
  };

  return linkToSessions();

  };
}

export default withRouter(Navbar)
