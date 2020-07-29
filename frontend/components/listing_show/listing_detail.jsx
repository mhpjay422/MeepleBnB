import React from "react";
import { Link } from "react-router";
import NavbarContainer from "../navbar/navbar_container";
import BookingFormContainer from "./booking_form_container";
import Rating from "react-rating";


class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
  return (
    <div className="listing-detail-page">
      <NavbarContainer />
      <div className="list-show-body">
        <div className="list-show-header">
          <div className="list-show-header-description-container">
            <div className="list-show-header-description">
              <div className="list-show-header-description-text">
                {this.props.listing.title}
              </div>
              <div className="list-show-header-description-otherInfo">
                <Rating
                  className="show-rating"
                  placeholderRating={1}
                  emptySymbol={<img src="./star-solid.svg" className="star" />}
                  placeholderSymbol={<img src="./star-solid.svg" className="star" />}
                  fullSymbol={<img src="./star-solid.svg" className="star" />}
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
        <div className="listing-body">
          <div className="listing-lis">
            <div className="property-type">ENTIRE HOUSE</div>
            <div className="listing-title">
            </div>
            <div className="listing-amenities-preview">
              <div className="preview-house">
                <div className="house-box" />
                <div className="preview-body">
                  <div className="house-type">
                    <img className="house-icon" src="house.svg" />
                    Entire House
                  </div>
                  <div className="amenities-preview">
                    <li>
                      <img
                        className="amenities-icon"
                        src="./Screen Shot 2018-11-23 at 12.21.41 PM.png"
                      />
                      4 guests
                    </li>
                    <li>
                      <img
                        className="amenities-icon"
                        src="./Screen Shot 2018-11-23 at 12.24.07 PM.png"
                      />
                      1 bedroom
                    </li>
                    <li>
                      <img
                        className="amenities-icon"
                        src="./Screen Shot 2018-11-23 at 12.23.28 PM.png"
                      />
                      2 beds
                    </li>
                    <li>
                      <img
                        className="amenities-icon"
                        src="Screen Shot 2018-11-23 at 12.23.48 PM.png"
                      />
                      1 bath
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <span className="the-space">The space</span>
            <div>{this.props.listing.description}</div>

            <li>Address: {this.props.listing.address}</li>
            <div className="lat-lng">
              {this.props.listing.lat}
              {this.props.listing.lng}
            </div>
            <div className="street-map" ref={map => (this.mapNode = map)}></div>

            
            
          </div>
          <BookingFormContainer listing={this.props.listing} />
        </div>
      </div>
    </div>
  );
};
}

export default ListingDetail;
