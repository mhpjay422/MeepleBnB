import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';


class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      guests: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuests = this.handleGuests.bind(this);
    this.alreadyBooked = this.alreadyBooked.bind(this);
  }

  componentWillUnmount(oldProps) {
     this.props.clearBookingErrors();
  }

  alreadyBooked(date) {
  }

  handleSubmit(e) {
    e.preventDefault();
    const booking = {
      guests: this.state.guests,
      check_in: this.state.startDate,
      check_out: this.state.endDate,
      listing_id: parseInt(this.props.listingId),
    };
    this.props.createBooking(booking);
  }

  handleGuests(e) {
    this.setState({ guests: e.target.value });
  }

  renderErrors() {
    const errorMess = this.props.errors.map((error, i) => {
      return (
        <li
          key={`error-${i}`}
          className="errors"
        >
        {error}
        </li>
      );
    });

    return(
      <ul>{errorMess}</ul>
    );
  }

  render() {
    debugger
    return (
        <form className="booking-form">
          <div className="booking-body">
            <div className="booking-price">
              <div className="booking-price-integer">
                X
              </div>
              <div className="booking-price-pernight">
              <div>
                per night
              </div>
              </div>
            </div>
            <div className="booking-rating">
              rating
            </div>
            <div className="booking-dates-header">Dates</div>
            <div className="date-picker">
              X
            </div>
            <div className="booking-guests-header">Guests</div>
            <input type="integer"
                   className="booking-guests-input"
                   defaultValue="1" min="1"
                   onChange={this.handleGuests}>
            </input>
            <div>{this.renderErrors()}</div>
            <button className="booking-submit"
                    onClick={this.handleSubmit} >
                    <div className="Book-button">
                      Book
                    </div>
            </button>
            <div className="booking-charge-text">You won’t be charged yet</div>
            <div className="booking-divider"></div>
            <div className="booking-bottom-container">
              <div className="booking-bottom-container-inner">
                <span>This home is on people’s minds.</span>
                <br/>
                <div>It’s been viewed 500+ times in the past week.</div>
              </div>s
              <img className="lightbulb" src="./lightbulb.svg"/>
            </div>
          </div>
        </form>
    );
  }
}

export default withRouter(BookingForm);

// ${this.props.listing.price}

// <DateRangePicker
//   startDate={this.state.startDate}
//   startDateId="start-date"
//   endDate={this.state.endDate}
//   endDateId="end-date"
//   startDatePlaceholderText="Check In"
//   showClearDates={true}
//   endDatePlaceholderText="Check Out"
//   onDatesChange={({ startDate, endDate }) =>
//     this.setState({ startDate, endDate })}
//   isDayBlocked={day => this.alreadyBooked()}
//   focusedInput={this.state.focusedInput}
//   onFocusChange={focusedInput => this.setState({ focusedInput })}
// />
