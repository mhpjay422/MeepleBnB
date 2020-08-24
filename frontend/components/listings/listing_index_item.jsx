import React from "react";
import { withRouter } from "react-router-dom";
// import Rating from "react-rating";
import { avgRating } from "../helper_methods/helper_methods"

class IndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.hovered = this.hovered.bind(this);
  }

  handleClick() {
    const listingId = this.props.listing.id;
    window.scroll(0,0)
    this.props.history.push(`/listings/${listingId}`);
  }

  hovered() {
    this.props.setHoveredListItem(this.props.listing)
  }

  render() {
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
                    {avgRating(this.props.allReviews)}
                  </div>
                  <div className="index-item-rating-total">
                    ({this.props.allReviews.length})
                  </div>
                </div>
                <div className="index-item-price-container">
                  <div className="index-item-price">
                    <div className="index-item-price-text">
                      <span className="index-item-price-integer">
                        ${this.props.listing.price} 
                      </span>
                      /night
                    </div>
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
