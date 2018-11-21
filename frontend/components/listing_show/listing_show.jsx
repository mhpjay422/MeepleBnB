import React from 'react';
import { Link } from 'react-router-dom';
import ListingDetail from './listing_detail';

class ListingShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { listingId } = this.props;
    this.props.fetchListing(listingId);
  }

  render() {
    const { listing } = this.props;
    return(
      <div className="single-listing-show">
        <div className="single-listing-map">
        </div>
        <div className="listing-details">
          <ListingDetail listing={listing}/>
        </div>
      </div>
    );
  }
}

export default ListingShow;
