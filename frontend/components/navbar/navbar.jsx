import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchForm from "../search_form/search_form.jsx";
import { convertMoment } from "../helper_methods/helper_methods.jsx";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarType: "mini",
      searchTerm: this.props.searchTerm,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      guests: this.props.guests,
    }

    this.toggleSearch = this.toggleSearch.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.logInDemo = this.logInDemo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.setDataFromSearchForm = this.setDataFromSearchForm.bind(this);
    this.propSearchTerm = this.propSearchTerm.bind(this);
    this.propStartDate = this.propStartDate.bind(this);
    this.propEndDate = this.propEndDate.bind(this);
    this.propGuests = this.propGuests.bind(this);
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

  toggleSearch() {
    if(this.state.searchBarType === "mini") {
      this.setState({ searchBarType: "full"})
    } else {
      this.setState({ searchBarType: "mini"})
    }
  }

  setDataFromSearchForm(search, start, end, numGuests) {
    this.setState({
      searchTerm: search,
      startDate: start, 
      endDate: end, 
      guests: numGuests
    })
  }
  
  propSearchTerm() {
    return this.props.stayOptions.searchTerm
  }

  propStartDate() {
    return this.props.stayOptions.startDate
  }

  propEndDate() {
    return this.props.stayOptions.endDate
  }

  propGuests() {
    return this.props.stayOptions.guests
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

  const miniOrFull = () => {
    if(this.state.searchBarType === "mini") { 
      return "mini"
    } else {
      return "full"
    }
  }

  const searchLocation = () => {
    if (this.propSearchTerm()) {
      return this.propSearchTerm()
    } else {
      return "Add Location"
    }
  }

  const searchDates = () => {

    if (convertMoment(this.propStartDate(), this.propEndDate())) {
      return convertMoment(this.propStartDate(), this.propEndDate())
    } else {
      return "Add Dates"
    }     
  }

  const searchGuests = () => {
    if (this.propGuests()) {
      if(this.propGuests() === 1) {

        return (
          `${this.propGuests()} guest`
        )
      } else {

        return (
          `${this.propGuests()} guests`
        )
      }

    } else {
      return "Add Guests"
    }
  }



  const greetSearchMini = () => {
    return (
      <div 
      className={`greet-search-mini-container-${miniOrFull()}`}
      onClick={this.toggleSearch}
      >
        <div className="greet-search-mini-frame">
          <button className="greet-search-mini-item">
            <div className="greet-search-mini-text">
              {searchLocation()}
            </div>
          </button>
          <div className="greet-search-mini-divider" />
          <button className="greet-search-mini-item">
            <div className="greet-search-mini-text">
              {searchDates()}
            </div>
          </button>
          <div className="greet-search-mini-divider" />
          <button className="greet-search-mini-item">
            <div className="greet-search-mini-text">
              {searchGuests()}
                  </div>
            <div className="greet-search-mini-submit">
              <div className="greet-search-mini-submit-image">
                <img className="greet-search-mini-submit-img" src="magsm.png"></img>
              </div>
            </div>
          </button>
        </div>
      </div>
    )
  }

  const greetSearchFull = () => {
    return (
      <div className={`greet-search-full-container-${miniOrFull()}`}>
        <div className="splash-search-padding">
          <div
            className="splash-search-frame"
            autoComplete="off"
          >
            <fieldset className="splash-search-top">
              <div className="splash-search-top-tabs">
                <div className="splash-search-top-tab">
                  <span className="search-tab-stay-index">
                    Places to stay
                  </span>
                </div>
              </div>
            </fieldset>
            <SearchForm 
            toggleSearch={this.toggleSearch}
            setDataFromSearchForm={this.setDataFromSearchForm}
            />
          </div>
        </div>
      </div>
    )
  }

  const greetGrayout = () => {
    if(this.state.searchBarType === "full") {
      return (
        <div
          className="greet-screen-grayout"
          onClick={this.toggleSearch}
        />
      )
    } else {
      return <></>
    }
  }

  const topbar = () => {
    if(this.state.searchBarType === "mini") {
      return "topbar"
    } else {
      return "topbar-full"
    }
  }

  const navbar = () => {
    return (
      <div className="navbarZ">
        <div className={topbar()}>
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
              {greetSearchMini()}
              {greetSearchFull()}
            </div>
            <div className="twobar">{demo()}</div>
          </section>
        </div>
        {greetGrayout()}
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
