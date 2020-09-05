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
      checkInFocus:false,
      checkOutFocus:false,
      guestOpen: false,
      guestFocused: false,
      numGuests: 0,
      minusHovered: false,
      plusHovered: false,
    };
    
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isInclusivelyAfterDay = this.isInclusivelyAfterDay.bind(this);
    this.isBeforeDay = this.isBeforeDay.bind(this);
    this.handleClickOutsideCalendar = this.handleClickOutsideCalendar.bind(this);
    this.toggleCalendarStart = this.toggleCalendarStart.bind(this);
    this.toggleCalendarEnd = this.toggleCalendarEnd.bind(this);
    this.handleClickOutsideBar = this.handleClickOutsideBar.bind(this);
    this.focusBar = this.focusBar.bind(this);
    this.unFocusBar = this.unFocusBar.bind(this);
    this.focusGuest = this.focusGuest.bind(this);
    this.unfocusGuest = this.unfocusGuest.bind(this);
    this.openGuest = this.openGuest.bind(this);
    this.handleClickOutsideGuest = this.handleClickOutsideGuest.bind(this);
    this.handleClickMinus = this.handleClickMinus.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.hoverMinus = this.hoverMinus.bind(this);
    this.unhoverMinus = this.unhoverMinus.bind(this);
    this.hoverPlus = this.hoverPlus.bind(this);
    this.unhoverPlus = this.unhoverPlus.bind(this);
    this.handleClickOutsideCalendarStart = this.handleClickOutsideCalendarStart.bind(this);
    this.handleClickOutsideCalendarEnd = this.handleClickOutsideCalendarEnd.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.clearStartDate = this.clearStartDate.bind(this)
    this.setDates = this.setDates.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutsideCalendar);
    document.addEventListener('mouseup', this.handleClickOutsideBar);
    document.addEventListener('mouseup', this.handleClickOutsideGuest);
    document.addEventListener('mouseup', this.handleClickOutsideCalendarStart);
    document.addEventListener('mouseup', this.handleClickOutsideCalendarEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutsideCalendar);
    document.removeEventListener('mouseup', this.handleClickOutsideBar);
    document.removeEventListener('mouseup', this.handleClickOutsideGuest);
    document.removeEventListener('mouseup', this.handleClickOutsideCalendarStart);
    document.removeEventListener('mouseup', this.handleClickOutsideCalendarEnd);
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    });
    
    debugger
    this.dateContainerEnd.click();
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

  handleClickOutsideCalendar(e) {
    const clickPicker = this.picker.contains(e.target)
    const dateStart = this.dateContainerStart.contains(e.target)
    const dateEnd = this.dateContainerEnd.contains(e.target)
    const clickOutBar = !(clickPicker || dateStart || dateEnd)
    const pickerShouldClose = this.picker && clickOutBar && !(document.activeElement.id === "clear-button")

    if (pickerShouldClose) {
      this.setState({ pickerOpen: false })
    } else {
      if (this.picker && (this.dateContainerStart.contains(e.target) || this.dateContainerEnd.contains(e.target))) {
        this.setState({ pickerOpen: true })
      }
    }
  }

  handleClickOutsideCalendarStart(e) {
    if (document.activeElement.id === "clear-button") {
      return
    }
    if (!this.dateContainerStart.contains(e.target)) {
      this.setState({ checkInFocus: false })
    }
  }

  handleClickOutsideCalendarEnd(e) {
    if (document.activeElement.id === "clear-button") {
      return
    }
    if (!this.dateContainerEnd.contains(e.target)) {
      this.setState({ checkOutFocus: false })
    }
  }

  handleClickOutsideBar(e) {
    if (this.bar && !this.bar.contains(e.target)) {
      this.setState({ barFocused: false, checkInFocus: false, checkOutFocus:false })
    }
  }

  handleClickOutsideGuest(e) {
    if (document.activeElement.id === "clear-button"){
      return 
    }
    if (this.guest && !this.guest.contains(e.target)) {
      this.setState({ guestFocused: false, guestOpen: false })
    }
  }

  toggleCalendarStart(input) {

    if(input === "search" && !this.state.pickerOpen) {
      this.setState({pickerOpen: true})
    }

    if (this.state.checkInFocus && !(document.activeElement.id === "clear-button")) {
      this.setState({ pickerOpen: false })
    }

    this.setState({ focusedInput: 'startDate', checkInFocus: !this.state.checkInFocus })
  }

  toggleCalendarEnd() {
    
    if (this.state.checkOutFocus && !(document.activeElement.id === "clear-button")) {
      this.setState({ pickerOpen: false })
    }
    this.setState({ focusedInput: 'endDate', checkOutFocus: !this.state.checkOutFocus })
  }

  openGuest() {
    this.setState({ guestOpen: true, guestFocused: true })
  }

  focusBar() {
    this.setState({ barFocused: true })
  }

  unFocusBar() {
    this.setState({ barFocused: false })
  }

  focusGuest() {
    this.setState({ guestFocused: true })
  }

  unfocusGuest() {
    this.setState({ guestFocused: false })
  }

  handleClickMinus() {
    this.setState({ numGuests: this.state.numGuests - 1 })
  }

  handleClickPlus() {
    this.setState({ numGuests: this.state.numGuests + 1 })
  }

  hoverMinus() {
    this.setState({ minusHovered: true, plusHovered: false})
  }

  unhoverMinus() {
    this.setState({ minusHovered: false})
  }

  hoverPlus() {
    this.setState({ plusHovered: true, minusHovered: false})
  }

  unhoverPlus() {
    this.setState({ plusHovered: false})
  }
 
  handleFormSubmit() {
    this.searchBin.handleSubmit();
  }

  clearStartDate() {
    this.setState({ startDate: null, endDate: null, focusedInput: 'startDate'})
  }

  setDates({ startDate, endDate }) {
    this.setState({ startDate, endDate })

    if(!this.state.startDate && this.state.endDate) {
      this.dateContainerStart.click()
    }

    debugger
    if (startDate && !endDate && this.state.focusedInput === "endDate") {
      this.dateContainerEnd.click()
    }
  }

//   if(!this.state.startDate && this.state.endDate) {
//   this.dateContainerStart.click()
// } else if (!this.state.checkInFocus && this.state.checkOutFocus) {
//   debugger
//   this.dateContainerStart.click()
// }

  

  render() {

    const dayPicker = () => {
      if(this.state.pickerOpen) {
        return (
          <DayPickerRangeController
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.setDates}
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
          <button className="splash-search-submit-frame-focused"
            onClick={this.handleFormSubmit}
            >
            <div className="splash-search-submit-icon-container">
              <div className="splash-search-submit-icon">
                <img className="splash-search-submit-icon-img" src="search.png"></img>
                <div className="splash-search-submit-text">Search</div>
              </div>
            </div>
          </button>
        )
      } else {
        return (
          <button className="splash-search-submit-frame"
            onClick={this.handleFormSubmit}
            >
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
      if (this.state.checkInFocus) {
        return "splash-search-form-dates-item-container-1-focus"
      } else {
        return "splash-search-form-dates-item-container-1"
      }
    }

    const formDates2 = () => {
      if (this.state.checkOutFocus) {
        return "splash-search-form-dates-item-container-2-focus"
      } else {
        return "splash-search-form-dates-item-container-2"
      }
    }

    const checkinDate = () => {
      if (this.state.startDate) {
        const date = this.state.startDate._d.toDateString().split(" ");
        const month = date[1]
        const day = date[2]
        return (
          <div className="splash-search-form-dates-item-body-selected">
            {`${month} ${day}`}
          </div>
        )
      } else {
        return (
          <div className="splash-search-form-dates-item-body">Add dates</div>
        )
      }
    }

    const checkoutDate = () => {
      if (this.state.endDate) {
        const date = this.state.endDate._d.toDateString().split(" ");
        const month = date[1]
        const day = date[2]
        return (
          <div className="splash-search-form-dates-item-body-selected">
            {`${month} ${day}`}
          </div>
          
        )
      } else {
        return (
          <div className="splash-search-form-dates-item-body">Add dates</div>
        )
      }
    }

    const formGuests = () => {
      if (this.state.guestFocused) {
        return "splash-search-guest-container-focus"
      } else {
        return "splash-search-guest-container"
      }
    }

    const isHoverMinus = () => {
      if(this.state.minusHovered) {
        return "minus-dark.png"
      } else {
        return "minus.png"
      }
    }

    const isHoverPlus = () => {
      if(this.state.plusHovered) {
        return "plus-dark.png"
      } else {
        return "plus.png"
      }
    }

    const buttonMinus = () => {
      if(this.state.numGuests) {
        return (
          <button
            className="guest-counter-item-counter-minus"
            onClick={this.handleClickMinus}
            onMouseOver={this.hoverMinus}
            onMouseLeave={this.unhoverMinus}>
            <img className="guest-counter-item-counter-minus-image" src={isHoverMinus()} />
          </button>
        )
      } else {
        return (
          <button className="guest-counter-item-counter-minus-disabled">
            <img className="guest-counter-item-counter-minus-image" src="minus-light.png" />
          </button>
        )
      }
    }

    const buttonPlus = () => {
      if(this.state.numGuests < 4) {
        return (
          <button
            className="guest-counter-item-counter-plus"
            onClick={this.handleClickPlus}
            onMouseOver={this.hoverPlus}
            onMouseLeave={this.unhoverPlus}>
            <img className="guest-counter-item-counter-plus-image" src={isHoverPlus()} />
          </button>
        )
      } else {
        return (
          <button
            className="guest-counter-item-counter-plus-disabled">
            <img className="guest-counter-item-counter-plus-image" src="plus-light.png" />
          </button>
        )
      }
    }

    const guestCounter = () => {
      if(this.state.guestOpen) {
        return (
          <div 
          className="guest-counter-absolute-container"
          ref={guest => this.guest = guest}>
            <div className="guest-counter-container">
              <div className="guest-counter-item">
                <div className="guest-counter-item-text">
                  <div className="guest-counter-item-text-header">
                    Guests
                  </div>
                  <div className="guest-counter-item-text-main">
                    All Guests including children
                  </div>
                </div>
                <div className="guest-counter-item-counter">
                  {buttonMinus()}
                  <div className="guest-counter-item-counter-num">
                    {this.state.numGuests}
                  </div>
                  {buttonPlus()}
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <></>
        )
      }
    }

    const displayNumGuests = () => {      
      if (!this.state.numGuests) {
        return "Add guests"
      } else {
        if(this.state.numGuests === 1) {
          return (
            <div className="selected-num-guests">
              {`${this.state.numGuests} guest`}
            </div>
          )
        } else {
          return (
            <div className="selected-num-guests">
              {`${this.state.numGuests} guests`}
            </div>
          )
        }
      }
    }

    const clearDateStart = () => {
      if (this.state.checkInFocus && this.state.startDate) {
        return (
          <div className="clear-button-date-start-container" >
            <button
              className="clear-button"
              id="clear-button"
              onClick={this.clearStartDate}
              >
              <div className="clear-button-image">
                <img className="clear-button-img" src="exe.png"></img>
              </div>
            </button>
          </div>
        )
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
                  <form 
                    className="splash-search-frame"
                    // onSubmit={this.handleFormSubmit}
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
                    <div className="splash-search-form-container">
                      <div 
                      className="splash-search-form-frame"
                      onClick={this.focusBar}
                      ref={bar => this.bar = bar}>
                        <SearchContainer onRef={searchBin => this.searchBin = searchBin} toggleStart={this.toggleCalendarStart}/>
                        <div className="splash-search-form-border-1" id="border1"></div>
                        <div 
                        className={formDates1()}
                        onClick={this.toggleCalendarStart}
                        ref={dateContainerStart => this.dateContainerStart = dateContainerStart}
                        >
                          <div className="splash-search-form-dates-item-container-inner">
                            <div className="splash-search-form-dates-item-frame">
                              <div className="splash-search-form-dates-item-header">Check in</div>
                              {checkinDate()}
                            </div>
                          </div>
                        </div>
                        {clearDateStart()}
                        <div className="splash-search-form-border-2"></div>
                        <div 
                        className="splash-daypicker"
                        ref={picker => this.picker = picker}>
                          {dayPicker()}
                        </div>
                        <div 
                        className={formDates2()}
                        onClick={this.toggleCalendarEnd}
                        ref={dateContainerEnd => this.dateContainerEnd = dateContainerEnd}>
                          <div className="splash-search-form-dates-item-container-inner">
                            <div className="splash-search-form-dates-item-frame">
                              <div className="splash-search-form-dates-item-header">Check out</div>
                              {checkoutDate()}
                            </div>
                          </div>
                        </div>
                        <div className="splash-search-form-border-3"></div>
                        <div 
                        className={formGuests()}
                        onClick={this.openGuest}>
                          <div className="splash-search-guest-container-inner">
                            <div className="splash-search-guest-frame">
                                <div className="splash-search-guest-header">Guests</div>
                            <div className="splash-search-guest-body">{displayNumGuests()}</div>
                            </div>
                          </div>
                          <div className="splash-search-submit-container">
                            {searchsubmit()}
                          </div>
                        </div>
                        {guestCounter()}
                      </div>
                    </div>
                  </form>
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
      return(
          <>
            <img className="splash" src="background1.jpg" aria-hidden="true"/>
            {nav}
          </>
      );
    };
  
    return splash();
  };
}