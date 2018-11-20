import React from 'react';
import { Link } from 'react-router-dom';
import ListingDetail from './listing_detail';

const ListingShow = ({ listingId, fetchListing, listing}) => {
  const listings = {
    [listingId]: listing
  };

  return(
    <div className="single-listing-show">
      <div className="single-listing-map">
      </div>
      <div className="listing-details">
        <ListingDetail listing={listing}/>
      </div>
    </div>
  );


};

export default ListingShow;
