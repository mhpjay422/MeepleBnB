import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";
import { fetchListings } from "../../actions/listing_actions";

export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  componentDidMount() {
    if(this.props.location.state) {
      this.setState({ searchTerm: this.props.location.state.detail })
    }
  }

  componentWillUpdate(newProps) {
    if (newProps.location.state) {
      if ((newProps.location.state.detail === "") && (this.state.searchTerm !== "")) {
        this.setState({ searchTerm: "" }, () => {
          return
        })
      }
    }
  }

  render() {

    const filteredListings = (state, props) => {
      let list = [];

      props.listings.forEach(function (listing) {
        const matched = listing.address.toLowerCase().includes(state.searchTerm.toLowerCase());
        const noZipArray = listing.address.split(" ");
        const noZip = noZipArray.slice(0, noZipArray.length - 1);
        const newAddress = noZip.join(" ");
        const newList = listing;
        newList.address = newAddress

        if (matched) {
          list.push(newList);
        }
      });

      return list;
    }

    const emptySearchTerm = this.state.searchTerm === ""

    const allPropsOrFiltered = () => {
      if(emptySearchTerm) {
        return this.props.listings
      } else {
        return filteredListings(this.state, this.props)
      }
    }

    const sidenav = (
      <div className="sidenav">
        <ListingMap listings={allPropsOrFiltered()} updateFilter={this.props.updateFilter} />
      </div>
    );

    const listIndexItem = (
      <div className="list-body">
        <h1>Top-Rated Homes: </h1>
        <ul className="list-items">
          {allPropsOrFiltered().map(listing => (
            <ListingIndexItem listing={listing} key={listing.id} />
          ))}
        </ul >
      </div>
    )

    return (
      <>
        {sidenav}
        {listIndexItem}
      </>
    );
  }
}
