import React from "react";
import { withRouter } from "react-router-dom";
import ListingShowContainer from "../listing_show/listing_show_container";

class TripIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const listingId = this.props.trip.listing_id;
    this.props.history.push(`/listings/${listingId}`);
  }

  render() {
    return (
      <div className="trip-index-item" onClick={this.handleClick}>
        <div className="trip-index-item-img">
          <img
            className="trip-list-img"
            src={this.props.listings[this.props.trip.listing_id].picture_url}
          />
        </div>

        <hr />

        <span className="trip-item-title">
          {this.props.listings[this.props.trip.listing_id].title}
        </span>
        <div className="trip-item-info">
          <br />
          <span className="trip-item-price">
            ${this.props.listings[this.props.trip.listing_id].price} per night ·
            Free cancellation
          </span>
          <br />
          <span className="trip-item-rating">Rating:</span>
          <br />
        </div>

        <hr />
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
