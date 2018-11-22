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
        <div className="index-item-img">
          <img
            className="list-img"
            src={this.props.listings[this.props.trip.listing_id].picture_url}
          />
        </div>
        <div className="index-item-info">
          <span className="index-item-title">{this.props.trip.title}</span>
          <br />
          <span className="index-item-price">
            ${this.props.trip.price} per night · Free cancellation
          </span>
          <br />
          <span className="index-item-rating">Rating:</span>
          <br />
        </div>
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
