import React from 'react';
import { Link } from 'react-router';
import NavbarContainer from '../navbar/navbar_container';

const ListingDetail = ({ listing }) => {
  return (
    <div>
      <NavbarContainer/>
      <div className="list-show-body">

        <div className="list-show-images">
          <div className="list-show-image-main">
            <img className="index-image-main-1" src={listing.picture_url}/>
          </div>
          <div className="list-show-image-side">
            <img className="index-image" src={listing.picture_url}/>
            <img className="index-image" src={listing.picture_url}/>
            <img className="index-image" src={listing.picture_url}/>
            <img className="index-image" src={listing.picture_url}/>
          </div>

        </div>
        <ul className="listing-list">
          <li>Title: {listing.title}</li>
          <li>Description: {listing.description}</li>
          <li>Address: {listing.address}</li>
          <li>Price: {listing.price}</li>
          <li>Latitude: {listing.lat}</li>
          <li>Longitude: {listing.lng}</li>
        </ul>
        <form className="booking-form">
        </form>
      </div>
    </div>
  );
};

export default ListingDetail;
