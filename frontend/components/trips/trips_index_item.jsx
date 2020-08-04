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
      <div className="trip-index-item-container" onClick={this.handleClick}>
        <div className="trip-index-item-frame">
          <div className="trip-index-item-img">
            <img
              className="trip-iiimg"
              src={this.props.listings[this.props.trip.listing_id].picture_url}
            />
          </div>
          <div className="trip-index-item-body">
            <div className="trip-index-item-body-date">

            </div>
            <div className="trip-index-item-body-location">

            </div>
            <div className="trip-index-item-body-description">
              <div className="trip-item-title">
                {this.props.listings[this.props.trip.listing_id].title}
              </div>
            </div>


            <div className="trip-plus-container">
              <img className="trip-plus" src="./Screen Shot 2018-11-23 at 11.15.19 AM.png" />
            </div>


            <div className="trip-item-info">
              <div className="trip-item-rating">
                <div>Rating: </div>
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
              </div>
            </div>

            
          </div>
        </div>  
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
