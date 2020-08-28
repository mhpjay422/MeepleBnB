import React from "react";
import { withRouter, Redirect } from "react-router-dom";
// import Rating from "react-rating";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
// import momentPropTypes from "react-moment-proptypes";
// import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import { avgRating } from "../helper_methods/helper_methods"

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      focusedInput: null,
      guests: 1,
      price: this.props.listing.price,
      status: "PENDING"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finalForm = this.finalForm.bind(this);
    this.formHelper = this.formHelper.bind(this);
    this.handleCounterMinus = this.handleCounterMinus.bind(this);
    this.handleCounterPlus = this.handleCounterPlus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.focusMethod = this.focusMethod.bind(this);
    this.nights = this.nights.bind(this);
    this.nightsTotalPrice = this.nightsTotalPrice.bind(this);
    this.bookingTotalPrice = this.bookingTotalPrice.bind(this);
  }

  componentDidMount() {
    this.props.fetchBookings(this.props.currentUserId);
  }

  // componentWillUnmount(oldProps) {
  //   this.props.clearBookingErrors();
  // }

  componentDidUpdate(prevProps) {
    if ((prevProps.startDate !== this.props.startDate) || (prevProps.endDate !== this.props.endDate)) {
      this.setState({
        startDate: this.props.startDate,
        endDate: this.props.endDate
      });
    }
  }

  handleChange(data) {
    this.setState(data);
    this.props.liftStateToParent(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.currentUserId === null) {
      alert("Please log in to make a booking");
    } else if (this.state.startDate === null || this.state.endDate === null) {
      alert("Please choose a valid date");
    } else if (!(this.state.guests >= 1 && this.state.guests <= 4)) {
      alert("Please choose a valid number of guests")
    } else {

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
  }

  handleCounterMinus() {
    if(this.state.guests > 1) {
      this.setState({ guests: this.state.guests - 1})
    } 
  }

  handleCounterPlus() {
    if(this.state.guests < 4) {
      this.setState({ guests: this.state.guests + 1})
    }
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
    return (this.props.listing.id === booking.listing_id) && (booking.renter_id === this.props.currentUserId);
  }

  finalForm(alreadyBookedForm, form) {
    if (this.props.bookings.some(this.formHelper)) {
      return alreadyBookedForm;
    } else {
      return form;
    }
  }

  focusMethod() {
    document.getElementById("start-date").focus();
  }

  nights() {
    return (this.state.endDate._d.getTime() - this.state.startDate._d.getTime()) / (1000 * 60 * 60 * 24)
  }

  nightsTotalPrice() {
    return this.nights() * this.props.listing.price
  }

  bookingTotalPrice() {
    return this.nightsTotalPrice() + 449 + 430 + 300
  }

  render() {

    const isMinusAllowed = () => {
      if(this.state.guests === 1) {
        return <img className="minus-button-not-allowed" src="minus-light.png"></img>;
      } else {
        return <img className="minus-button-allowed" src="minus.png"></img>;
      }
    }

    const isPlusAllowed = () => {
      if(this.state.guests === 4) {
        return <img className="plus-button-not-allowed" src="plus-light.png"></img>;
      } else {
        return <img className="plus-button-allowed" src="plus.png"></img>;
      }
    }

    const openOrReserve = () => {
      if(!this.state.startDate && !this.state.endDate) {
        return <button className="booking-submit" onClick={this.focusMethod}>
                 <div className="book-button">Check Availability</div>
               </button>
          
      } else {
        return <button className="booking-submit" onClick={this.handleSubmit}>
                 <div className="book-button">Reserve</div>
               </button>
      }
    }

    const readyToBook = () => {
      if(this.state.startDate && this.state.endDate) {
        debugger
        return (
          <div className="booking-reserve-detail-container">
            <div className="booking-reserve-detail-frame">
              <div className="booking-reserve-detail-charges">
                <div className="booking-reserve-detail-charges-item">
                  <div className="booking-reserve-detail-charges-item-text">${this.props.listing.price} x {this.nights()} nights</div>
                  <div className="booking-reserve-detail-charges-item-price">${this.nightsTotalPrice()}</div>
                </div>
                <div className="booking-reserve-detail-charges-item">
                  <div className="booking-reserve-detail-charges-item-text">Cleaning fee</div>
                  <div className="booking-reserve-detail-charges-item-price">$449</div>
                </div>
                <div className="booking-reserve-detail-charges-item">
                  <div className="booking-reserve-detail-charges-item-text">Service fee</div>
                  <div className="booking-reserve-detail-charges-item-price">$430</div>
                </div>
                <div className="booking-reserve-detail-charges-item">
                  <div className="booking-reserve-detail-charges-item-text">Occupancy taxes and fees</div>
                  <div className="booking-reserve-detail-charges-item-price">$300</div>
                </div>
              </div>
              <div className="booking-reserve-total">
                <div className="booking-reserve-total-text">Total</div>
                <div className="booking-reserve-total-price">${this.bookingTotalPrice()}</div>
              </div>
            </div>
          </div> 
        )
      } else {
        return 
          <>
          </>
      }
    }

    const form = (
      <div className="booking-form">
        <div className="booking-frame">
          <div className="booking-body">
            <div className="booking-padding">
              <div className="booking-body-margin">
                <div className="booking-body-header">
                  <div className="booking-price">
                    <div className="booking-price-integer">
                      ${this.props.listing.price}
                    </div>
                    <div className="booking-price-pernight">
                      <div>/ night</div>
                    </div>
                  </div>                  
                  <div className="booking-rating-container">
                    <img src="bnbstarxsm.png" className="booking-rating-img"/>
                    <div className="booking-rating-score">
                      {avgRating(this.props.reviews)}
                    </div>
                    <div className="booking-rating-count">
                      ({this.props.reviews.length})
                    </div>
                    {/* <Rating
                      placeholderRating={3.5}
                      emptySymbol={<img src="./star-solid.svg" className="star" />}
                      placeholderSymbol={<img src="./star-solid.svg" className="star" />}
                      fullSymbol={<img src="./star-solid.svg" className="star" />}
                    /> */}
                  </div>
                </div>
                <div className="date-picker">
                  <DateRangePicker
                    startDate={this.props.startDate}
                    startDateId="start-date"
                    endDate={this.props.endDate}
                    endDateId="end-date"
                    startDatePlaceholderText="Check-In"
                    showClearDates={true}
                    endDatePlaceholderText="Check-Out"
                    onDatesChange={({ startDate, endDate }) => 
                      this.handleChange({ startDate, endDate })
                    }
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    renderCalendarDay={undefined}
                    minimumNights= {2}
                  />
                </div>
                <div className="booking-guests-container">
                  <div className="booking-guests-text">
                    Guests
                  </div>
                  <div className="booking-guests-counter">
                      <button className="booking-guests-minus" onClick={this.handleCounterMinus}>
                        {isMinusAllowed()}  
                      </button>
                      <div className="booking-guests-value">
                        {this.state.guests}
                      </div>
                      <button className="booking-guests-plus" onClick={this.handleCounterPlus}>
                        {isPlusAllowed()}
                      </button>
                  </div>
                </div>
                <div>{this.renderErrors()}</div>
                <div className="button-hover">
                  {openOrReserve()}
                </div>
                <div className="booking-charge-text">You won’t be charged yet</div>
                {readyToBook()}
              </div>
            </div>
          </div>
          <div className="booking-bottom-container">
            <div className="booking-bottom-container-inner">
              <div className="booking-bottom-text">
                <div className="booking-bottom-text1">
                  This home is on people’s minds.
                </div>
                <div className="booking-bottom-text2">
                  It’s been viewed 500+ times in the past week.
                </div>
              </div>
              <img className="lightbulb" src="./Screen Shot 2018-11-23 at 11.43.18 AM.png"/>
            </div>
          </div>
        </div>
      </div>
      
    );

    const alreadyBookedForm = (
      <div className="alreadybooked-container">
        <div className="alreadybooked-body">
          <div className="alreadybooked-padding">
            <div className="alreadybooked-body">
              <div className="alreadybooked-body-margin">
                <div className="alreadybooked-text">Congratulations! </div>
                <div className="alreadybooked-text1">
                  You are booked for this listing{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return this.finalForm(alreadyBookedForm, form);
  }
}

export default withRouter(BookingForm);
