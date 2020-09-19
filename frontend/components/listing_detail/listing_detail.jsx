import React from 'react';
// import { Link } from "react-router";
import NavbarContainer from "../navbar/navbar_container";
import BookingFormContainer from "./booking_form_container";
import "react-dates/initialize";
import { DayPickerRangeController } from 'react-dates';
// import momentPropTypes from "react-moment-proptypes";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import ListingDetailReviewItem from "./listing_detail_review_item"
import Footer from "../footer/footer_show_frame.jsx"
import { avgRating } from "../helper_methods/helper_methods"

class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.stayOptions.startDate,
      endDate: this.props.stayOptions.endDate,
      guests: this.props.stayOptions.guests || 1,
      focusedInput: props.autoFocusEndDate ? 'endDate' : 'startDate',
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.receiveNewDatesFromBookingForm = this.receiveNewDatesFromBookingForm.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.isInclusivelyAfterDay = this.isInclusivelyAfterDay.bind(this);
    this.isBeforeDay = this.isBeforeDay.bind(this);
    this.daysDiff = this.daysDiff.bind(this);
    this.focusMap = this.focusMap.bind(this);
  }

  componentDidMount() {
    const { listingId } = this.props;
    this.props.fetchListingReviews(listingId);
    this.props.fetchListing(listingId);
    window.scroll(0, 0)

    const mapOptions = {
      position: { lat: this.props.listing.lat, lng: this.props.listing.lng },
      zoom: 10.4,
      pov: {
        heading: 34
      },
      addressControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      },
    };

    this.map = new google.maps.StreetViewPanorama(this.mapNode, mapOptions);
  }

  componentDidUpdate() {
    const mapOptions = {
      position: { lat: this.props.listing.lat, lng: this.props.listing.lng },
      zoom: 10.4,
      pov: {
        heading: 34
      },
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
    };

    this.map = new google.maps.StreetViewPanorama(this.mapNode, mapOptions);
  }

  focusMap() {
    document.querySelector('[class="gm-control-active gm-fullscreen-control"]').click();
  }

  clearDates() {
    this.setState({ startDate: null, endDate: null })
    this.forceUpdate()
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
        <div className="listing-body-intro-left">
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
        <div className="listing-body-intro-right">
          <div className="listing-body-intro-right-images-container">
            <img className="listing-body-intro-right-img" src="mememe.png"></img>
            <div className="listing-body-intro-right-detail">
              <img
                className="plus-detail"
                src="./Screen Shot 2018-11-23 at 10.49.36 AM.png"
              />
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

    const amenities = (
      <>
        <div className="amenities-container">
          <div className="amenities-header">
            <div className="amenities-header-text">
              Amenities
            </div>
          </div>
          <div className="amenities-body-container">
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Kitchen</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="kitchen.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Wifi</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="wifi.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Hot Tub</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="hottub.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Free parking on premises</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="parking.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Laptop-friendly workspace</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="laptop.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Cable TV</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="fun.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Iron</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="iron.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Hair Dryer</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="dryer.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Washer</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="washer.png" />
                </div>
              </div>
            </div>
            <div className="amenities-body-item-container">
              <div className="amenities-body-item">
                <div>Dryer</div>
                <div className="amenities-body-item-image">
                  <img className="amenities-body-item-img" src="dryerr.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="amenities-button">

          </div>
        </div>
      </>
    )

    const dayPickerHeaderTop = () => {

      if (!this.state.startDate && !this.state.endDate) {
        return "Select check-in date"
      } else if (this.state.startDate && !this.state.endDate) {
        return "Select checkout date";
      } else {
        return `${this.daysDiff()} nights in New York`
      }

    }

    const dayPickerHeaderBottom = () => {

      if (!this.state.startDate && !this.state.endDate) {
        return "Add your travel dates for exact pricing"
      } else if (this.state.startDate && !this.state.endDate || !this.state.startDate && this.state.endDate) {
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
            noBorder={true}
            numberOfMonths={2}
            renderCalendarDay={undefined}
            enableOutsideDays={false}
            isOutsideRange={day => !this.isInclusivelyAfterDay(day, moment())}
          />
          <div className="daypicker-calendar-clear-dates-container">
            <button className="daypicker-calendar-clear-dates-button" onClick={this.clearDates}>
              Clear dates
            </button>
          </div>
        </div>
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
              <div className="list-show-header-reviews">
                <div className="list-show-header-reviews-image">
                  <img className="list-show-header-reviews-img" src="bnbstarsm.png"></img>
                </div>
                <div className="list-show-header-reviews-text">
                  {avgRating(this.props.reviews)}
                  <div className="list-show-header-reviews-text-count">
                    ({this.props.reviews.length})
                  </div>
                </div>
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

    const location = (
      <>
        <div className="listing-body-location">Location</div>
        <div className="street-map" ref={map => (this.mapNode = map)}></div>
        <div className="listing-body-location-bottom-container">
          <div className="listing-body-location-bottom-left">
            <div className="listing-addy">Address:
              <div className="listing-addy-prop">
                {this.props.listing.address}
              </div>
            </div>
            <div className="listing-addy-description">We are located in the heart of New York. Steps from local shops, bars, and restuarants. Public transit is readily available to get to wherever you would like to go around the city. The nightlife in the area is vibrant and shows why this is the city that never sleeps.</div>
            <div className="full-map-container">
              {/* CREATE new page to move panorama map and switch out a flat map */}
              {/* <button className="full-map" type="button" onClick={this.focusMap}>Explore the area</button> */}
            </div>
          </div>
          <div className="listing-body-location-bottom-right">
            <div className="listing-body-location-bottom-right-header">Getting Around</div>
            <div className="listing-body-location-bottom-right-score">
              <div className="listing-body-location-bottom-right-score-integer">100</div>
              <div className="listing-body-location-bottom-right-score-description">
                <div className="listing-body-location-bottom-right-score-description-type">Walk Score</div>
                <div className="listing-body-location-bottom-right-score-description-text">
                  <span className="detail-interpunct"> · </span>
                  Daily errands don't require a car.
                </div>
              </div>
            </div>
            <div className="listing-body-location-bottom-right-score">
              <div className="listing-body-location-bottom-right-score-integer">100</div>
              <div className="listing-body-location-bottom-right-score-description">
                <div className="listing-body-location-bottom-right-score-description-type">Transit Score</div>
                <div className="listing-body-location-bottom-right-score-description-text">
                  <span className="detail-interpunct"> · </span>
                  World-class public transportation.
                </div>
              </div>
            </div>
            <div className="listing-body-location-bottom-right-score">
              <div className="listing-body-location-bottom-right-score-integer">97</div>
              <div className="listing-body-location-bottom-right-score-description">
                <div className="listing-body-location-bottom-right-score-description-type">Bike Score</div>
                <div className="listing-body-location-bottom-right-score-description-text">
                  <span className="detail-interpunct"> · </span>
                  Daily errands can be accomplished on a bike.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )

    const reviews = (
      <>
        <div className="reviews-top-container">
          <div className="reviews-top-main">
            <div className="reviews-top-image">
              <img src="bnbstar.png"></img>
            </div>
            <div className="reviews-top-text">
              {avgRating(this.props.reviews)} ({this.props.reviews.length} reviews)
            </div>
          </div>
        </div>
        <div className="reviews-top-description">

        </div>
        <div className="reviews-body-container">
          {this.props.reviews.map(review => (
            <ListingDetailReviewItem key={review.id} review={review} />
          ))}
        </div>
        <div className="reviews-bottom"></div>
      </>
    )

    const host = (
      <>
        <div className="host-border-top"></div>
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
                    <img src="./bnbstar.png" className="star" />
                  </div>
                  <div className="host-body-left-icons-item-icon-text">
                    {this.props.hostReviews} Reviews
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
                <span>Born and raised in NYC. World traveler, foodie, coffee lover, and tabletop game enthusiast. Always making the best out every life experience. I love people, making new friends and of course hosting incredible people from all over the world!!!</span>
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
            <div className="host-body-main-right-response-container">
              <div className="host-body-main-right-response">
                Response rate: 100%
                </div>
              <div className="host-body-main-right-response">
                Response time: within an hour
                </div>
            </div>
            <div className="host-body-main-right-contact-button">
              <a className="contact-host" href="mailto:mhpjay@gmail.com">Contact Host</a>
            </div>
            <div className="host-body-main-right-warning">
              <div className="keylock-icon">
                <img className="keylock-img" src="keylock.png" />
              </div>
                To protect your payment, never transfer money or communicate outside of the Meeplebnb website or app.
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
              {amenities}
              {dayPicker}
            </div>
            <BookingFormContainer
              listing={this.props.listing}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              guests={this.state.guests}
              liftStateToParent={this.receiveNewDatesFromBookingForm}
              reviews={this.props.reviews}
            />
          </div>
        </div>
      </div>
    )

    const bodySectionLocation = (
      <div className="body-section-container">
        <div className="body-section-frame">
          {location}
        </div>
      </div>
    )

    const bodySectionReviews = (
      <div className="body-section-container">
        <div className="body-section-frame">
          {reviews}
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

    const things = (
      <>
        <div className="things-header-container">
          <div className="things-header">
            Things to know
          </div>
        </div>
        <div className="things-body-container">
          <div className="things-body-third-container">
            <div className="things-body-third-blueprint">
              <div className="things-body-third-header">
                House Rules
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="clock.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Check-in: After 4:00 PM
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="clock.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Checkout: 11:00 AM
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="opendoor.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Self check-in with smart lock
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="smoke.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  No smoking
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="party.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  No parties or events
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="paw.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Pets are allowed
                </div>
              </div>
            </div>
          </div>
          <div className="things-body-third-container">
            <div className="things-body-third-blueprint">
              <div className="things-body-third-header">
                Health & safety
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image-spray">
                  <img className="things-body-third-item-img" src="spray.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Airbnb's social-distancing and other COVID-19-related guidelines apply
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="mark.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Security camera/recording device
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="check.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Carbon monoxide alarm
                </div>
              </div>
              <div className="things-body-third-item">
                <div className="things-body-third-item-image">
                  <img className="things-body-third-item-img" src="check.png"></img>
                </div>
                <div className="things-body-third-item-text">
                  Smoke alarm
                </div>
              </div>
            </div>
          </div>
          <div className="things-body-third-container">
            <div className="things-body-third-blueprint">
              <div className="things-body-third-header">
                Cancellation policy
              </div>
              <div className="things-body-third-item">
                Cancel before 4:00 PM one week prior and get a 50% refund, minus the service fee.
              </div>
            </div>
          </div>
        </div>
      </>
    )

    const bodySectionThings = (
      <div className="body-section-container">
        <div className="body-section-frame-things">
          {things}
        </div>
      </div>
    )


    return (
      <>
      <div className="single-listing-show">
        <div className="listing-detail-page">

          <div className="hidden-shadow">hello</div>
          <NavbarContainer />
          <div className="header-buffer">header</div>
          {headerDetail}
          {bodyDetail}
          {bodySectionLocation}
          {bodySectionReviews}
          {bodySectionHost}
          {bodySectionThings}
        </div>
        <div className="footer-buffer">footer</div>
        <Footer />
      </div >
      </>
    );
  };
}

export default ListingDetail;
