import React from "react";
import { Link } from "react-router";
import NavbarContainer from "../navbar/navbar_container";
import BookingFormContainer from "./booking_form_container";

const mapOptions = {
  center: { lat: 40.782598, lng: -73.971915 },
  zoom: 10.4
};

class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

// const ListingDetail = ({ listing }) => {

  render() {
  return (
    <div className="listing-detail-page">
      <NavbarContainer />
      <div className="list-show-body">
        <div className="list-show-images">
          <div className="list-show-image-main">
            <img className="index-image-main-1" src={this.props.listing.picture_url} />
          </div>
          <div className="list-show-image-side">
            <img className="index-image" src={"3-1200x800.jpg"} />
            <img
              className="index-image"
              src={"Black-looks-exquisite-in-the-bachelor-pad-bedroom.jpg"}
            />
            <img
              className="index-image"
              src={"pharrell-williams-miami-penthouse-kitchen-1.jpg"}
            />
            <img
              className="index-image"
              src={
                "luxury-pictures-of-modern-bathrooms-21-ideas-beautiful-bathroom-designs-from-schmidt.jpg"
              }
            />
          </div>
        </div>
        <ul className="listing-body">
          <div className="listing-lis">
            <div className="property-type">ENTIRE HOUSE</div>
            <div className="listing-title">
              <li>{this.props.listing.title}</li>
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
            <li />
            <li />
            <li>Address: {this.props.listing.address}</li>
            <div className="lat-lng">
              {this.props.listing.lat}
              {this.props.listing.lng}
            </div>
            <div className="street-map" ref={map => (this.mapNode = map)}></div>
            <li />
            <li />
            
            
          </div>
          <BookingFormContainer listing={this.props.listing} />
        </ul>
      </div>
    </div>
  );
};
}

export default ListingDetail;
