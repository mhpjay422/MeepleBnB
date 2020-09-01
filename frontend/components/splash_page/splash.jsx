import React from 'react';
import {Link} from 'react-router-dom';
import SearchContainer from '../searchbar/searchbar_container.jsx';
import "react-dates/initialize";
import { DayPickerRangeController } from 'react-dates';
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: 'startDate',
      pickerOpen: false,
      barFocused: false,
      checkIn:false,
      checkOut:false,
    };
    
    this.checkinDate = this.checkinDate.bind(this);
    this.checkoutDate = this.checkoutDate.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isInclusivelyAfterDay = this.isInclusivelyAfterDay.bind(this);
    this.isBeforeDay = this.isBeforeDay.bind(this);
    this.handleClickOutsideCalendarStart = this.handleClickOutsideCalendarStart.bind(this);
    this.handleClickOutsideCalendarEnd = this.handleClickOutsideCalendarEnd.bind(this);
    this.openCalendarStart = this.openCalendarStart.bind(this);
    this.openCalendarEnd = this.openCalendarEnd.bind(this);
    this.handleClickOutsideBar = this.handleClickOutsideBar.bind(this);
    this.focusBar = this.focusBar.bind(this);
    this.unFocusBar = this.unFocusBar.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutsideCalendarStart);
    document.addEventListener('mouseup', this.handleClickOutsideCalendarEnd);
    document.addEventListener('mouseup', this.handleClickOutsideBar);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutsideCalendarStart);
    document.removeEventListener('mouseup', this.handleClickOutsideCalendarEnd);
    document.removeEventListener('mouseup', this.handleClickOutsideBar);
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    });
  }

  isInclusivelyAfterDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return !this.isBeforeDay(a, b);
  }

  isBeforeDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

    const aYear = a.year();
    const aMonth = a.month();

    const bYear = b.year();
    const bMonth = b.month();

    const isSameYear = aYear === bYear;
    const isSameMonth = aMonth === bMonth;

    if (isSameYear && isSameMonth) return a.date() < b.date();
    if (isSameYear) return aMonth < bMonth;
    return aYear < bYear;
  }

  checkinDate() {
    if(this.state.startDate) {
      const date = this.state.startDate._d.toDateString().split(" ");
      const month = date[1]
      const day = date[2]
      return `${month} ${day}`
    } else {
      return "Add dates"
    }
  }

  checkoutDate() {
    if(this.state.endDate) {
      const date = this.state.endDate._d.toDateString().split(" ");
      const month = date[1]
      const day = date[2]
      return `${month} ${day}`
    } else {
      return "Add dates"
    }
  }

  handleClickOutsideCalendar(e) {
    if (this.picker && !this.picker.contains(e.target)) {
      this.setState({ pickerOpen: false})
    }
  }

  handleClickOutsideCalendarStart(e) {
    this.setState({ checkIn: false })
    if (this.picker && !this.picker.contains(e.target)) {
      this.setState({ pickerOpen: false })
    }
  }
  
  handleClickOutsideCalendarEnd(e) {
    this.setState({ checkOut: false })
    if (this.picker && !this.picker.contains(e.target)) {
      this.setState({ pickerOpen: false })
    }
  }

  handleClickOutsideBar(e) {
    if (this.bar && !this.bar.contains(e.target)) {
      this.setState({ barFocused: false })
    }
  }

  openCalendarStart() {
    this.setState({ pickerOpen: true, focusedInput: 'startDate', checkIn: true })
  }

  openCalendarEnd() {
    this.setState({ pickerOpen: true, focusedInput: 'endDate', checkOut: true })
  }

  focusBar() {
    this.setState({ barFocused: true })
  }

  unFocusBar() {
    this.setState({ barFocused: false })
  }

  render() {

    const dayPicker = () => {
      if(this.state.pickerOpen) {
        return (
          <DayPickerRangeController
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
            minimumNights={2}
            noBorder={true}
            numberOfMonths={2}
            renderCalendarDay={undefined}
            enableOutsideDays={false}
            isOutsideRange={day => !this.isInclusivelyAfterDay(day, moment())}
          />
        )
      } else {
        return (
          <>
          </>
        )
      }
    }

    const searchsubmit = () => {
      if(this.state.barFocused) {
        return (
          <button className="splash-search-submit-frame-focused">
            <div className="splash-search-submit-icon-container">
              <div className="splash-search-submit-icon">
                Search
              </div>
            </div>
          </button>
        )
      } else {
        return (
          <button className="splash-search-submit-frame">
            <div className="splash-search-submit-icon-container">
              <div className="splash-search-submit-icon">
                <img src="search.png"></img>
              </div>
            </div>
          </button>
        )
      }
    }

    const formDates1 = () => {
      if(this.state.checkIn) {
        return "splash-search-form-dates-item-container-1-focus"
      } else {
        return "splash-search-form-dates-item-container-1"
      }
    }

    const formDates2 = () => {
      if(this.state.checkOut) {
        return "splash-search-form-dates-item-container-2-focus"
      } else {
        return "splash-search-form-dates-item-container-2"
      }
    }
 
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
                      <div 
                      className="splash-search-form-frame"
                      onClick={this.focusBar}
                      ref={bar => this.bar = bar}>
                        <SearchContainer />
                        <div className="splash-search-form-border-1" id="border1"></div>
                        <div 
                        className={formDates1()}
                        onClick={this.openCalendarStart}>
                          <div className="splash-search-form-dates-item-container-inner">
                            <div className="splash-search-form-dates-item-frame">
                              <div className="splash-search-form-dates-item-header">Check in</div>
                            <div className="splash-search-form-dates-item-body">{this.checkinDate()}</div>
                            </div>
                          </div>
                        </div>
                        <div className="splash-search-form-border-2"></div>
                        <div 
                        className="splash-daypicker"
                        ref={picker => this.picker = picker}>
                          {dayPicker()}
                        </div>
                        <div 
                        className={formDates2()} 
                        onClick={this.openCalendarEnd}>
                          <div className="splash-search-form-dates-item-container-inner">
                            <div className="splash-search-form-dates-item-frame">
                              <div className="splash-search-form-dates-item-header">Check out</div>
                            <div className="splash-search-form-dates-item-body">{this.checkoutDate()}</div>
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
                            {searchsubmit()}
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
  
    const splash = () => {
      if (this.props.loggedIn) {
        return (
          <nav/>
        );
      } else {
        return(
          <>
            <img className="splash" src="background1.jpg"/>
            {nav}
          </>
          );
      }
    };
  
    return splash();
  };
}