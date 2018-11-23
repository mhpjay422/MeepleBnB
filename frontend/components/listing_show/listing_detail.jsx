import React from "react";
import { Link } from "react-router";
import NavbarContainer from "../navbar/navbar_container";
import BookingFormContainer from "./booking_form_container";

const ListingDetail = ({ listing }) => {
  return (
    <div>
      <NavbarContainer />
      <div className="list-show-body">
        <div className="list-show-images">
          <div className="list-show-image-main">
            <img className="index-image-main-1" src={listing.picture_url} />
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
              <li>{listing.title}</li>
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
            <div>{listing.description}</div>
            <li />
            <li />
            <li>Address: {listing.address}</li>
            <li />
            <li />
            <li>Latitude: {listing.lat}</li>
            <li>Longitude: {listing.lng}</li>
          </div>
          <BookingFormContainer listing={listing} />
        </ul>
      </div>
    </div>
  );
};

export default ListingDetail;
