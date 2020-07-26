import React from "react";
import { withRouter } from "react-router-dom";
import Rating from "react-rating";
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
      <div className="listing-index" onClick={this.handleClick}>
        <div className="listing-index-container">
          <div className="listing-info" >
            <div className="listing-index-item">
              <div className="index-item-img">
                <img className="list-img" src={this.props.listing.picture_url} />
              </div>
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
              <span className="index-item-rating">
                <div>Rating: </div>
                <Rating
                  placeholderRating={3.5}
                  emptySymbol={<img src="./star-solid.svg" className="star" />}
                  placeholderSymbol={<img src="./star-solid.svg" className="star" />}
                  fullSymbol={<img src="./star-solid.svg" className="star" />}
                />
              </span>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default withRouter(IndexItem);
