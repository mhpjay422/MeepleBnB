import React from "react";
import { Link } from "react-router";
import NavbarContainer from "../navbar/navbar_container";
import BookingFormContainer from "./booking_form_container";
import Rating from "react-rating";
import "react-dates/initialize";
import { DayPickerRangeController } from 'react-dates';
import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";


class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: props.autoFocusEndDate ? 'endDate' : 'startDate',
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.receiveNewDatesFromBookingForm = this.receiveNewDatesFromBookingForm.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.isInclusivelyAfterDay = this.isInclusivelyAfterDay.bind(this);
    this.isBeforeDay = this.isBeforeDay.bind(this);
    this.daysDiff = this.daysDiff.bind(this);
  }
  
  componentDidMount() {
    
    const mapOptions = {
      position: { lat: this.props.listing.lat, lng: this.props.listing.lng },
      zoom: 10.4,
      pov: {
        heading: 34
      }
    };
    
    this.map = new google.maps.StreetViewPanorama(this.mapNode, mapOptions);
  }
  componentDidUpdate() {
    
    const mapOptions = {
      position: { lat: this.props.listing.lat, lng: this.props.listing.lng },
      zoom: 10.4,
      pov: {
        heading: 34
      }
    };
    
    this.map = new google.maps.StreetViewPanorama(this.mapNode, mapOptions);
  }
  
  clearDates() {
    this.setState({ startDate: null, endDate:null })
  }
  
  receiveNewDatesFromBookingForm(data) {
    this.setState(data)
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

  daysDiff() {
    return this.state.endDate.diff(this.state.startDate, "days")
  }

  render() {

    const bodyIntro = (

      <div className="listing-body-intro">
        <div className="property-type">Entire house hosted by Jason</div>
        <div className="listing-amenities-preview">
          <div className="preview-house">
            <div className="preview-body">
              <div className="amenities-preview">
                <div className="amenities-text">
                  <img
                    className="amenities-icon"
                    src="./Screen Shot 2018-11-23 at 12.21.41 PM.png"
                  />
                          4 guests
                      </div>
                <span className="show-interpunct"> · </span>
                <div className="amenities-text">
                  <img
                    className="amenities-icon"
                    src="./Screen Shot 2018-11-23 at 12.24.07 PM.png"
                  />
                        3 bedrooms
                      </div>
                <span className="show-interpunct"> · </span>
                <div className="amenities-text">
                  <img
                    className="amenities-icon"
                    src="./Screen Shot 2018-11-23 at 12.23.28 PM.png"
                  />
                        3 beds
                      </div>
                <span className="show-interpunct"> · </span>
                <div className="amenities-text">
                  <img
                    className="amenities-icon"
                    src="Screen Shot 2018-11-23 at 12.23.48 PM.png"
                  />
                        1 bath
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

    const introDescription = (

      <div className="listing-intro-description-container">
        <div className="listing-intro-description">
          <div className="listing-intro-description-item">
            <div className="LID-item-image">
              <img className="LID-item-image-img" src="house.png" />
            </div>
            <div className="LID-item-text">
              <div className="LID-item-text-header">
                Entire Home
                    </div>
              <div className="LID-item-text-description">
                You'll have the house to yourself
                    </div>
            </div>
          </div>
          <div className="listing-intro-description-item">
            <div className="LID-item-image">
              <img className="LID-item-image-img" src="door.png" />
            </div>
            <div className="LID-item-text">
              <div className="LID-item-text-header">
                Self check-in
                    </div>
              <div className="LID-item-text-description">
                Check yourself in from the app
                    </div>
            </div>
          </div>
          <div className="listing-intro-description-item">
            <div className="LID-item-image">
              <img className="LID-item-image-img" src="clean.png" />
            </div>
            <div className="LID-item-text">
              <div className="LID-item-text-header">
                Enhanced cleaning
                    </div>
              <div className="LID-item-text-description">
                Part of the enhanced cleaning program to ensure a deep clean between each stay
                    </div>
            </div>
          </div>
          <div className="listing-intro-description-item-bottom">
            <div className="LID-item-image">
              <img className="LID-item-image-img" src="fun.png" />
            </div>
            <div className="LID-item-text">
              <div className="LID-item-text-header">
                Fun guaranteed
                    </div>
              <div className="LID-item-text-description">
                Plus verified locations are highly rated and commited to providing great stays for guests
                    </div>
            </div>
          </div>
        </div>
      </div>

    )

    const bodyInfo = (

      <div className="listing-body-info-container">
        <div className="listing-body-info-description">
          *** <strong>Minimum two night stay</strong> ***
            <br />
            <br />
            <br />
          {this.props.listing.description}.
            <br />
            <br />
          If you're looking for an affordable place to stay in the middle of it all then welcome to my home! This cozy queen size private bedroom has a true city feeling, only a few minutes walk to the nearest train station!. We offer coffee to all the guests :)
            <br />
            <br />
          <div className="bold">The space</div>
          The apartment is in the center of it all, near the subway station, lots of restaurants and shops around. The building has a a lovely rooftop space in which you can go relax with view to the skyline.
            <br />
            <br />
          Two people per room, but if there's more than two then I can offer my couch or sleeping bags ($30 per extra person), the room is big enough to fit more; or they can sleep in the living room if needed.
            <br />
            <br />
          I also rent extra rooms on meeplebnb, same apartment.
            <br />
            <br />
          <div className="bold">Guest access</div>
          You will have access to the entire shared apartment, be free to chill in the living room and make your meals in the kitchen, please buy your own ingredients and the kitchen is all yours! (You can store your food in the fridge if you need).
            <br />
            <br />
          (ROOFTOP IS CLOSED DURING WINTER AND FALL SEASON)
            <br />
            <br />
          Fresh towels are provided.
            <br />
          There's laundry in the building (not free).
            <br />
          Shared bathroom, ALWAYS clean.
        </div>
      </div>

    )

    const sleepingArrangements = (

      <div className="sleeping-arrangements-container">
        <div className="sleeping-arrangements-header">
          <div className="sleeping-arrangements-text">
            Sleeping arrangements
                </div>
        </div>
        <div className="sleeping-arrangements-images-container">
          <div className="sleeping-arrangements-images-item-frame">
            <div className="sleeping-arrangements-images-item">
              <div className="sleeping-arrangements-images-item-frame-inner">
                <div className="sleeping-arrangements-image-container">
                  <div className="bed-image-1">
                    <img className="bed-img" src="doublebed.png"></img>
                  </div>
                  <div className="bed-image-header">
                    Bedroom 1
                        </div>
                  <div className="bed-image-text">
                    1 queen bed
                        </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sleeping-arrangements-images-item-frame">
            <div className="sleeping-arrangements-images-item">
              <div className="sleeping-arrangements-images-item-frame-inner">
                <div className="sleeping-arrangements-image-container">
                  <div className="bed-image-2">
                    <img className="bed-img" src="singlebed.png"></img>
                  </div>
                  <div className="bed-image-header">
                    Bedroom 2
                        </div>
                  <div className="bed-image-text">
                    1 single bed
                        </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sleeping-arrangements-images-item-frame">
            <div className="sleeping-arrangements-images-item">
              <div className="sleeping-arrangements-images-item-frame-inner">
                <div className="sleeping-arrangements-image-container">
                  <div className="bed-image-2">
                    <img className="bed-img" src="singlebed.png"></img>
                  </div>
                  <div className="bed-image-header">
                    Common Space
                        </div>
                  <div className="bed-image-text">
                    1 single bed
                        </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

    const dayPickerHeaderTop = () => {

      if(!this.state.startDate && !this.state.endDate) {
        return "Select check-in date"
      } else if(this.state.startDate && !this.state.endDate) {
        return "Select checkout date";
      } else {
        return `${this.daysDiff()} nights in New York`
      }
    
    }

    const dayPickerHeaderBottom = () => {

      if (!this.state.startDate && !this.state.endDate) {
        return "Add your travel dates for exact pricing"
      } else if (this.state.startDate && !this.state.endDate) {
        return "Minimum stay: 2 nights";
      } else {
        return `${this.state.startDate.format('MMM DD, YYYY')} - ${this.state.endDate.format('MMM DD, YYYY')}`
      }

    }

    const dayPicker = (

      <div className="daypicker-container">
        <div className="daypicker-header">
          <div className="daypicker-header-text1">
            {dayPickerHeaderTop()}
          </div>
          <div className="daypicker-header-text2">
            {dayPickerHeaderBottom()}
          </div>
        </div>
        <div className="daypicker-calendar-container">
          <DayPickerRangeController
            startDate={this.state.startDate} 
            endDate={this.state.endDate} 
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
            minimumNights={2}
            noBorder= {true}
            numberOfMonths= {2}
            renderCalendarDay={undefined}
            enableOutsideDays={false}
            isOutsideRange={day => !this.isInclusivelyAfterDay(day, moment())}
          />
          <div className="daypicker-calendar-clear-dates-container">
            <button className="daypicker-calendar-clear-dates-button"
                    onClick={this.clearDates}
            >
              Clear dates
            </button>
          </div>
        </div>
      </div>

    )

    const location = (

      <div className="listing-body-location-container">
        <div className="listing-body-info-location">Location</div>
        <div className="listing-body-info-addy">Address:
                <div className="listing-body-info-addy-prop">
            {this.props.listing.address}
          </div>
        </div>
        <div className="street-map" ref={map => (this.mapNode = map)}></div>
      </div>

    )

    const headerDetail = (

      <div className="list-show-header">
        <div className="list-show-header-description-container">
          <div className="list-show-header-description">
            <div className="list-show-header-description-text">
              {this.props.listing.title}
            </div>
            <div className="list-show-header-description-otherInfo">
              {/* <Rating
                  className="show-rating"
                  placeholderRating={1}
                  emptySymbol={<img src="./star-solid.svg" className="star" />}
                  placeholderSymbol={<img src="./star-solid.svg" className="star" />}
                  fullSymbol={<img src="./star-solid.svg" className="star" />}
                /> */}
              <div className="show-rating">
                <img src="./star-solid.svg" className="star" />
                <img src="./star-solid.svg" className="star" />
                <img src="./star-solid.svg" className="star" />
                <img src="./star-solid.svg" className="star" />
                <img src="./star-solid.svg" className="star" />
              </div>
              <span className="show-interpunct"> · </span>
              <img
                className="plus-show"
                src="./Screen Shot 2018-11-23 at 11.15.19 AM.png"
              />
              <span className="show-interpunct"> · </span>
              <div className="list-show-header-location">
                New York, United States
                </div>
            </div>
          </div>
        </div>
        <div className="list-show-images-container">
          <div className="list-show-images">
            <div className="list-show-images-pad">
              <div className="list-show-images-frame">
                <div className="list-show-image-main">
                  <img className="index-image-main-1" src={this.props.listing.picture_url} />
                </div>
                <div className="list-show-image-side">
                  <div className="list-show-image-1-2">
                    <img className="index-image-top" src={"3-1200x800.jpg"} />
                    <img
                      className="index-image-bottom"
                      src={"Black-looks-exquisite-in-the-bachelor-pad-bedroom.jpg"}
                    />
                  </div>
                  <div className="list-show-image-1-2">
                    <img
                      className="index-image-top"
                      src={"pharrell-williams-miami-penthouse-kitchen-1.jpg"}
                    />
                    <img
                      className="index-image-bottom"
                      src={
                        "luxury-pictures-of-modern-bathrooms-21-ideas-beautiful-bathroom-designs-from-schmidt.jpg"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

    const host = (
      <>
        <div className="host-border-top"></div>
        <div className="host-body">
          <div className="host-body-header">
            <div className="host-body-header-images-container">
              <img className="host-body-header-img" src="mememe.png"></img>
              <div className="host-plus-detail">
                <img
                  className="plus-detail"
                  src="./Screen Shot 2018-11-23 at 10.49.36 AM.png"
                />
              </div>
            </div>
            <div className="host-body-header-text-container">
              <div className="host-body-header-text-top">
                Hosted by Jason
              </div>
              <div className="host-body-header-text-bottom">
                Joined in August 2020
              </div>
            </div>
          </div>
          <div className="host-body-main">
            
            <div className="host-body-main-left">
              <div className="host-body-main-left-container">
                <div className="host-body-main-left-icons">
                  <div className="host-body-main-left-icons-item-container">
                    <div className="host-body-left-icons-item-icon">
                      <img src="./star-solid.svg" className="star" />
                      <img src="./star-solid.svg" className="star" />
                      <img src="./star-solid.svg" className="star" />
                      <img src="./star-solid.svg" className="star" />
                      <img src="./star-solid.svg" className="star" />
                    </div>
                    <div className="host-body-left-icons-item-icon-text">
                      {this.props.listing.id} Reviews
                    </div>
                  </div>
                  <div className="host-body-main-left-icons-item-container-right">
                    <div className="host-body-main-left-icons-item-icon2">
                      <img className="plus-detail-main-left-img" src="./Screen Shot 2018-11-23 at 11.15.19 AM.png"></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="host-body-main-left-intro-container">
                <div className="host-body-main-left-intro-frame">
                  <span>Born and raised in NYC. World traveler, foodie, coffee lover, and board game enthusiast. Always making the best out every life experience. I love people, making new friends and of course hosting incredible people from all over the world!!!</span>
                </div>
              </div>
              <div className="host-body-main-left-description">
                <div className="host-body-main-left-description-text-top-container">
                  <div className="host-body-main-left-description-text-top-header">
                    During your stay
                  </div>
                  <div className="host-body-main-left-description-text-top-body">
                    My goal as a host is to provide a phenomenal guest experience. I want to provide something memorable worthy that will want turn into something you will constantly return to. Something that will refer us to your family and friends. I’m committed to make your stay the most pleasant one so please don’t hesitate emailing or texting anytime, I’ll do my best to get back to you as fast as I can!
                  </div>
                </div>
                <div className="host-body-main-left-description-text-bottom-container">
                  <div className="host-body-main-left-description-text-bottom-header">
                    Jason is Plus Verified
                  </div>
                  <div className="host-body-main-left-description-text-bottom-body">
                    Plus Verified hosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="host-body-main-right">
              <div className="host-body-main-right-response">Blah</div>
              <div className="host-body-main-right-icon">Blah Blah</div>
            </div>

          </div>
        </div>
      </>
    )


    const bodyDetail = (
      <div className="listing-body-container">
        <div className="listing-body-frame">
          <div className="listing-body-top">
            <div className="listing-body-description">
              {bodyIntro}
              {introDescription}
              {bodyInfo}
              {sleepingArrangements}
              {dayPicker}
              {location}
            </div>
            <BookingFormContainer
              listing={this.props.listing}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              liftStateToParent={this.receiveNewDatesFromBookingForm}
            />
          </div>
        </div>
      </div>
    )

    const bodySectionHost = (
      <div className="body-section-container">
        <div className="body-section-frame">
          {host}
        </div>
      </div>
    )


  return (
    <div className="listing-detail-page">
      <NavbarContainer />
      { headerDetail }
      { bodyDetail }
      { bodySectionHost }
    </div>
  );
};
}

export default ListingDetail;
