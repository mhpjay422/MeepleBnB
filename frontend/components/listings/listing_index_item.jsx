import React from "react";
import { withRouter } from "react-router-dom";
import ListingShowContainer from "../listing_show/listing_show_container";

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const listingId = this.props.listing.id;
    this.props.history.push(`/listings/${listingId}`);
  }

  render() {
    return (
      <div className="listing-index">
        <div className="listing-index-item" onClick={this.handleClick}>
          <div className="index-item-img">
            <img className="list-img" src={this.props.listing.picture_url} />
          </div>
          <div className="index-item-info">
            <img
              className="plus"
              src="./Screen Shot 2018-11-23 at 11.15.19 AM.png"
            />
            <span className="index-item-title">{this.props.listing.title}</span>
            <br />
            <span className="index-item-price">
              ${this.props.listing.price} per night · Free cancellation
            </span>
            <br />
            <br />
        </div>
      </div>
      <span className="index-item-rating">
      <div>Rating: </div>
      <img className="star" src="./star-solid.svg" />
      <img className="star" src="./star-solid.svg" />
      <img className="star" src="./star-solid.svg" />
      <img className="star" src="./star-solid.svg" />
      <img className="star" src="./star-solid.svg" />
      </span>
      </div>
    );
  }
}

export default withRouter(IndexItem);
