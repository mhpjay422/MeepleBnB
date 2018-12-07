import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";


export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchListings();
  }

  render() {

    const sidenav = (
      <div className="sidenav">
        <ListingMap listings={this.props.listings} updateFilter={this.props.updateFilter}/>
      </div>
    );

    return (
      <>
      {sidenav}
      <div className="list-body">
        <h1>Top-Rated Homes: </h1>
        <ul className="list-items">
          {this.props.listings.map(listing => (
            <ListingIndexItem listing={listing} key={listing.id} />
          ))}
        </ul>
      </div>
      </>
    );
  }
}
