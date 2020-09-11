import React from "react";
import { withRouter } from "react-router-dom";
// import Rating from "react-rating";
import { avgRating } from "../helper_methods/helper_methods";


class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.history.location.state) {
      this.state = {
        startDate: this.props.history.location.state.startDate,
        endDate: this.props.history.location.state.endDate,
        guests: this.props.history.location.state.guests,
      }
    } else {
      this.state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        guests: this.props.guests,
      }
    }

    this.handleClick = this.handleClick.bind(this);
    this.hovered = this.hovered.bind(this);
    this.filteredReviews = this.filteredReviews.bind(this);
    this.nights = this.nights.bind(this);
    this.nightsTotalPrice = this.nightsTotalPrice.bind(this);
    this.bookingTotalPrice = this.bookingTotalPrice.bind(this);
  }

  handleClick() {
    const listingId = this.props.listing.id;
    window.scroll(0,0)

    const dateStart = () => {
      if (this.props.history.location.state)  {
        if (!this.props.history.location.state.startDate && this.props.history.location.state.endDate) {
          return this.props.history.location.state.endDate.clone().subtract(1, 'days')
        } else {
          return this.props.history.location.state.startDate
        }
      } else {
        return null
      }
    }

    const dateEnd = () => {
      if (this.props.history.location.state) {
        if (!this.props.history.location.state.endDate && this.props.history.location.state.startDate) {
          return this.props.history.location.state.startDate.clone().add(1, 'days')
        } else {
          return this.props.history.location.state.endDate
        }
      } else {
        return null
      }
    }

    const numGuests = () => {
      if (this.props.history.location.state) {
        return this.props.history.location.state.guests
      } else {
        return 1
      }
    }

    this.props.history.replace({
      pathname: `/listings/${listingId}`,
      state: {
        startDate: dateStart(),
        endDate: dateEnd(),
        guests: numGuests()
      },
    });
  }

  hovered() {
    this.props.setHoveredListItem(this.props.listing)
  }

  filteredReviews(reviews) {
    const listingId = this.props.listing.id;
    if(reviews) {
      return reviews.filter(review => review.listing_id === listingId) || []
    } else {
      return []
    }
  }

  nights() {
    return (this.props.history.location.state.endDate._d.getTime() - this.props.history.location.state.startDate._d.getTime()) / (1000 * 60 * 60 * 24)
  }

  nightsTotalPrice() {
    return this.nights() * this.props.listing.price
  }

  bookingTotalPrice() {
    return `$${(this.nightsTotalPrice() + 500 + (this.nights() * 30) + (this.nights() * this.props.listing.price * .11)).toFixed(0)} total`
      
  }

  render() {

    const isStartandEndDateSelected = () => {
      if (this.props.history.location.state) {
        if (this.props.history.location.state.startDate && this.props.history.location.state.endDate) {
          return (
            <div className="index-item-price-total-container">
              <div className="index-item-price-total-frame">
                <div className="index-item-price-total-frame">
                  <div className="index-item-price-total-button">
                    {this.bookingTotalPrice()}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      } else {
        return <></>
      }
    }

    return (
      <div className="listing-index" onClick={this.handleClick} onMouseEnter={this.hovered}>
        <div className="listing-index-container">
          <div className="listing-info" >
            <div className="listing-index-item">
              <div className="index-item-img">
                <img className="list-img" src={this.props.listing.picture_url} />
              </div>
            </div>
            <div className="index-item-info">
              <div className="index-item-info-description">
                <div className="index-item-info-description-container">
                  <img
                    className="plus"
                    src="./Screen Shot 2018-11-23 at 11.15.19 AM.png"
                  />
                  <div className="index-item-title">{this.props.listing.title}</div>
                </div>
              </div>
              <div className="index-item-divider"></div>
              <div className="index-item-amenities1">
                4 guests
                <span> · </span>
                3 bedrooms
                <span> · </span>
                3 beds
                <span> · </span>
                1 bath
              </div>
              <div className="index-item-amenities2">
                Wifi
                <span> · </span>
                Air conditioning
                <span> · </span>
                Kitchen
              </div>
              <div className="index-item-footer">
                <div className="index-item-rating">
                  <div className="index-item-rating-image">
                    <img className="index-item-rating-img" src="bnbstarsm.png"/>
                  </div>
                  <div className="index-item-rating-avg">
                    {avgRating(this.filteredReviews(this.props.allReviews))}
                  </div>
                  <div className="index-item-rating-total">
                    ({this.filteredReviews(this.props.allReviews).length})
                  </div>
                </div>
                <div className="index-item-price-container">
                  <div className="index-item-price">
                    <div className="index-item-price-text">
                      <span>
                      <span className="index-item-price-integer">
                        {`$${this.props.listing.price} `}
                      </span>
                        {` / night`}
                      </span>
                    </div>
                    {isStartandEndDateSelected()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(IndexItem);
