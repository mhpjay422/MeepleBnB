import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";
import { fetchListings } from "../../actions/listing_actions";

export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hovered: null
    };
    this.filteredListings = this.filteredListings.bind(this);
    this.allPropsOrFiltered = this.allPropsOrFiltered.bind(this);
    this.setHoveredListItem = this.setHoveredListItem.bind(this);
  }

  componentWillUpdate(newProps) {
    if(this.props !== newProps) {
      if (newProps.location.state) {
        this.setState({ searchTerm: newProps.location.state.detail }, () => {
          return
        })
      }
    }
    
    if (newProps.location.state) {
      if ((newProps.location.state.detail === "") && (this.state.searchTerm !== "")) {
        this.setState({ searchTerm: "" }, () => {
          return
        })
      }
    }
  }

  setHoveredListItem(data) {
    this.setState({hovered: data})
    debugger
  }

  filteredListings(state, props) {
    let list = [];

    props.listings.forEach(function (listing) {
      const matched = listing.address.toLowerCase().includes(state.searchTerm.toLowerCase());
      const noZipArray = listing.address.split(" ");
      const noZip = noZipArray.slice(0, noZipArray.length - 1);
      const newAddress = noZip.join(" ");
      const newList = Object.assign({},listing);
      newList.address = newAddress

      if (matched) {
        list.push(newList);
      }
    });

    if(list.length) {
      return list;
    } else {
      return this.props.listings;
    }
  }
  
  allPropsOrFiltered(state, props) {
    if (this.state.searchTerm === "") {
      return this.props.listings
    } else {
      return this.filteredListings(state, props)
    }
  }

  render() {
    

    const sidenav = (
      <div className="sidenav">
        <ListingMap 
          listings={this.allPropsOrFiltered(this.state, this.props)} 
          updateFilter={this.props.updateFilter } 
          hovered={this.state.hovered}
        />
      </div>
    );

    const listIndexItem = (
      <div className="list-body">
        <div className="list-header">
          <div className="list-header-container">
            <section>
              <div className="list-header-list-items-mini-text">
                {this.props.listings.length} stays
              </div>
              <div className="list-header-list-items-description">
                <h1 className="list-header-list-items-description-text">
                  Stays in New York
                </h1>
              </div>
            </section>
          </div> 
        </div>
        <ul className="list-items">
          {this.allPropsOrFiltered(this.state, this.props).map(listing => (
            <ListingIndexItem listing={listing} key={listing.id} setHoveredListItem={this.setHoveredListItem}/>
          ))}
        </ul >
      </div>
    )

    return (
      <div className="index-body">
          {listIndexItem}
          {sidenav}
      </div>
    );
  }
}
