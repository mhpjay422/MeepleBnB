import React from 'react';
import ListingIndexItem from './listing_index_item';

export default class ListingIndex extends React.Component {
  constructor (props) {
  super(props);
  }

  componentDidMount() {
    this.props.fetchListings();
  }


  render() {
    return (
      <div className="list-body">
      <h1>Top-Rated homes: </h1>
        <ul className="list-items">
          {this.props.listings.map(listing => (
            <ListingIndexItem
              listing={listing}
              key={listing.id}
            />
          ))}
        </ul>
      </div>
    );
  }
}
