import React from 'react';
import ListingDetail from './listing_detail';
import Footer from "../footer/footer_show_frame.jsx"

class ListingShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { listingId } = this.props;
    this.props.fetchReviews(listingId);
    this.props.fetchListing(listingId);
  }

  render() {
    const { listing, reviews } = this.props;
    return(
      <div className="single-listing-show">
        <ListingDetail 
          listing={listing}
          reviews={reviews}
        />
        <Footer/>
      </div>
    );
  }
}

export default ListingShow;
