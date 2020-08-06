import React from 'react';
import { Link } from 'react-router-dom';
import ListingDetail from './listing_detail';
import Footer from "../footer/footer.jsx"

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
        <ListingDetail listing={listing}/>
        <Footer/>
      </div>
    );
  }
}

export default ListingShow;
