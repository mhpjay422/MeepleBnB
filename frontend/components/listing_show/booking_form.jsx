import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import Rating from "react-rating";

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      guests: 1,
      price: this.props.listing.price,
      status: "PENDING"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuests = this.handleGuests.bind(this);
    this.finalForm = this.finalForm.bind(this);
    this.formHelper = this.formHelper.bind(this);
  }

  componentDidMount() {
    this.props.fetchBookings(this.props.currentUserId);
  }

  componentWillUnmount(oldProps) {
    this.props.clearBookingErrors();
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.currentUserId === null) {
      alert("Please log in to make a booking");
    } 
    else if (this.state.startDate === null || this.state.endDate === null) {
      alert("Please choose valid date");
    }


    const booking = {
      guests: this.state.guests,
      date_start: this.state.startDate._d,
      date_end: this.state.endDate._d,
      listing_id: parseInt(this.props.listing.id),
      status: this.state.status,
      price: this.props.listing.price
    };

    this.props.createBooking(booking);
  }

  handleGuests(e) {
    this.setState({ guests: e.target.value });
  }

  renderErrors() {
    const errorMess = this.props.errors.map((error, i) => {
      return (
        <li key={`error-${i}`} className="errors">
          {error}
        </li>
      );
    });
    return <ul>{errorMess}</ul>;
  }

  formHelper(booking) {
    return (this.props.listing.id === booking.listing_id && booking.renter_id === this.props.currentUserId);
  }

  finalForm(alreadyBookedForm, form) {
    if (this.props.bookings.some(this.formHelper)) {
      return alreadyBookedForm;
    } else {
      return form;
    }
  }

  render() {
    const form = (
      <div className="booking-form">
        <div className="booking-frame">
          <div className="booking-body">
            <div className="booking-body-margin">
              <div className="booking-price">
                <div className="booking-price-integer">
                  ${this.props.listing.price}
                </div>
                <div className="booking-price-pernight">
                  <div>per night</div>
                </div>
              </div>
              <div className="booking-rating">
                <div className="booking-rating-text">Rating: </div>
                <Rating
                  placeholderRating={3.5}
                  emptySymbol={<img src="./star-solid.svg" className="star" />}
                  placeholderSymbol={<img src="./star-solid.svg" className="star" />}
                  fullSymbol={<img src="./star-solid.svg" className="star" />}
                />
              </div>
              <div className="booking-dates-header">Dates</div>
              <div className="date-picker">
                <DateRangePicker
                  startDate={this.state.startDate}
                  startDateId="start-date"
                  endDate={this.state.endDate}
                  endDateId="end-date"
                  startDatePlaceholderText="Check In"
                  showClearDates={true}
                  endDatePlaceholderText="Check Out"
                  onDatesChange={({ startDate, endDate }) =>
                    this.setState({ startDate, endDate })
                  }
                  focusedInput={this.state.focusedInput}
                  onFocusChange={focusedInput => this.setState({ focusedInput })}
                  renderCalendarDay={undefined}
                />
              </div>
              <div className="booking-guests-header">Guests</div>
              <input
                type="integer"
                className="booking-guests-input"
                defaultValue="1"
                min="1"
                onChange={this.handleGuests}
              />
              <div>{this.renderErrors()}</div>
              <div className="button-hover">
                <button className="booking-submit" onClick={this.handleSubmit}>
                  <div className="book-button">Book</div>
                </button>
              </div>
              <div className="booking-charge-text">You won’t be charged yet</div>
              <div className="booking-divider" />
            </div>
          </div>
          <div className="booking-bottom-container">
            <div className="booking-bottom-container-inner">
              <span className="booking-bottom-text1">
                This home is on people’s minds.
                </span>
              <div>It’s been viewed 500+ times in the past week.</div>
            </div>
            <img
              className="lightbulb"
              src="./Screen Shot 2018-11-23 at 11.43.18 AM.png"
            />
          </div>
        </div>
      </div>
      
    );

    const alreadyBookedForm = (
      <div className="alreadybooked-container">
        <div className="alreadybooked-body">
          <div className="alreadybooked-text">Congratulations! </div>
          <div className="alreadybooked-text1">
            You are booked for this listing{" "}
          </div>
        </div>
      </div>
    );

    return this.finalForm(alreadyBookedForm, form);
  }
}

export default withRouter(BookingForm);
