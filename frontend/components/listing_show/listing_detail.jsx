import React from 'react';
import { Link } from 'react-router';
import NavbarContainer from '../navbar/navbar_container';

const ListingDetail = ({ listing }) => {
  return (
    <div>
      <NavbarContainer/>
      <div className="sidefill">
      </div>
      <ul className="listing-list">
        <img className="index-image" src={listing.picture_url}/>
        <li>Title: {listing.title}</li>
        <li>Description: {listing.description}</li>
        <li>Address: {listing.address}</li>
        <li>Price: {listing.price}</li>
        <li>Latitude: {listing.lat}</li>
        <li>Longitude: {listing.lng}</li>
      </ul>
      <div className="sidefill">
      </div>
    </div>
  );
};

export default ListingDetail;
