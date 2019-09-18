import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchContainer from '../searchbar/searchbar_container.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault()

    debugger
    
    if (this.props.history.location.pathname === "/"){
      debugger
      return
      
    } else if (this.props.history.location.pathname === "/greeting") {
      debugger
      {this.props.history.location.pathname = "/", () => {return }}
      debugger
      this.props.history.push({
        pathname: "/greeting/icon",
        search: "",
        state: { detail: "" }
      })
      debugger
      
      }

    // if (this.props.history.location.pathname === "/") {
    //   return
    // } else {
      // this.props.history.push({
      //   pathname: "/greeting",
      //   search: "",
      //   state: { detail: "" }
    //   })
    // }
  }

  render() {

  const demo = () => {
    if (this.props.loggedIn) {
      return (
        <div className="loggedin-buttons" >
          <Link className="header-button" to={`/bookings/${this.props.users.id}`}>
            <button className="header-button">Trips</button>
          </Link>
          <button className="header-button" onClick={this.props.logout}>
            Log Out
          </button>
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
            <button
              className="greet-loginbuttons"
              value="Login as Demo User"
              onClick={this.props.demoLogin}
            >
              {" "}
              Log In as Demo User
            </button>
          </li>
        </nav>
      );
    }
  };

  const navbar = (
    <div className="topbar">
      <section className="greet-topsec">
        <section className="greet-leftsec">
          <img src="./3d-meepleneg.png" className="navbar-left" onClick={this.handleClick} />
          <SearchContainer />
        </section>
        <ul className="twobar">{demo()}</ul>
      </section>
    </div>
  );

  const linkToSessions = () => {
    return <nav>{navbar}</nav>;
  };

  return linkToSessions();

  };
}

export default withRouter(Navbar)
