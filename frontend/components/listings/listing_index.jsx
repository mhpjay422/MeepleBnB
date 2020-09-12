import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";
import Navbar from "../navbar/navbar_container";
import {convertMoment} from "../helper_methods/helper_methods.jsx";

export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.history.location.state) {
      this.state = {
        searchTerm: this.props.history.location.state.detail,
        startDate: this.props.history.location.state.startDate,
        endDate: this.props.history.location.state.endDate,
        guests: this.props.history.location.state.guests,
        hovered: [null, null],
        priceFilterOpen: false,
      };
    } else {
      this.state = {
        searchTerm: "",
        startDate: null,
        endDate: null,
        guests: 0,
        hovered: [null, null],
        priceFilterOpen: false,
      };
    }
    this.filteredListings = this.filteredListings.bind(this);
    this.allPropsOrFiltered = this.allPropsOrFiltered.bind(this);
    this.setHoveredListItem = this.setHoveredListItem.bind(this);
    this.unhovered = this.unhovered.bind(this);
    this.togglePriceFilter = this.togglePriceFilter.bind(this);
  }

  componentDidMount() {
    window.scroll(0,0)
    this.props.fetchReviews("all");
  }

  componentWillUnmount() {
    this.props.history.replace({
      search: ``,
    });
  }

  componentDidUpdate(newProps) {
    if(this.props !== newProps) {
      if (newProps.location.state) {
        this.setState({ 
          searchTerm: newProps.location.state.detail,
          endDate: newProps.location.state.endDate,
          startDate: newProps.location.state.startDate,
          guests: newProps.location.state.guests
         }, () => {
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

  unhovered() {
    let newArray = this.state.hovered.slice(1).concat(null);
    this.setState({ hovered: newArray })
  }

  setHoveredListItem(listing) {
    let newArray = this.state.hovered.slice(1).concat(listing);
    this.setState({ hovered: newArray})
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

  togglePriceFilter() {
    this.setState({priceFilterOpen: !this.state.priceFilterOpen})
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

    const ifSearch = (searchTerm) => {
      let text = `Showing results for "${this.state.searchTerm}" in New York`

      if(this.state.searchTerm !== "") {
        return (
        <div className="if-search-container">
          <div className="if-search">{text}</div>
        </div>
        )
      }
    }

    const miniText = () => {
      const numStays = `${this.props.listings.length} stays`
      
      const guests = () => {
        if(this.state.guests === 1) {
          return `${this.state.guests} guest`;
        } else {
          return `${this.state.guests} guests`;
        }
      }
      
      const ifStartorEnd = () => {
        
        if(convertMoment(this.state.startDate, this.state.endDate) === "") {
          return ""
        } else {
          return `· ${convertMoment(this.state.startDate, this.state.endDate)}`
        }
      }

      const ifGuests = () => {
        if(this.state.guests) {
          return `· ${guests()}`
        } else {
          return ""
        }
      }

      return `${numStays} ${ifStartorEnd()} ${ifGuests()}`
    }

    const isPriceFilterPressed = () => {
      if(this.state.priceFilterOpen) {
        return "list-header-filter-button-pressed"
      } else {
        return "list-header-filter-button"
      }
    }

    const priceFilter = () => {
      if(this.state.priceFilterOpen) {
        return (
          <div className="price-filter-container">
            <div className="price-filter-main-container">
              <div className="price-filter-main-frame">
                <div className="price-filter-main-avg-text">
                  The average nightly price is $95
                </div>
                <div className="price-filter-main-display-dir" dir="ltr">
                  <div className="price-filter-main-graph-container">
                    <div className="price-filter-main-graph-display-container">
                      <div className="price-filter-main-graph-display1toMany">
                        Logic to display graph
                      </div>
                    </div>
                    <div className="price-filter-main-graph-slider-container">
                      <div className="price-filter-main-graph-slider-topline"/>
                      <div className="price-filter-main-graph-slider-innerline">
                        <div 
                        className="price-filter-main-graph-slider-button"
                        >
                          <div className="price-filter-main-graph-slider-button-line"/>
                          <div className="price-filter-main-graph-slider-button-line"/>
                          <div className="price-filter-main-graph-slider-button-line"/>
                        </div>
                        <div 
                        className="price-filter-main-graph-slider-button"
                          >
                          <div className="price-filter-main-graph-slider-button-line"/>
                          <div className="price-filter-main-graph-slider-button-line"/>
                          <div className="price-filter-main-graph-slider-button-line"/>
                        </div>
                      </div>
                      <div className="price-filter-main-graph-slider-bottomline"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return <></>
      }
    }
    

    const listIndexItem = (
      <div className="list-body">
        <div className="list-header-container">
          <div className="list-header-top">
            <section>
              <div className="list-header-list-items-mini-text">
                {miniText()}
              </div>
              <div className="list-header-list-items-description">
                <h1 className="list-header-list-items-description-text">
                  Stays in New York
                </h1>
              </div>
            </section>
          </div> 
          <div className="list-header-filter-container">
            <div className="list-header-filter-frame">
              <div className="list-header-filter-frame-inner">
                <div className="list-header-filter-frame-inner-inner">
                  <div className="list-header-filter-frame-inner-inner">
                    <div className="list-header-filter-button-container">
                      <button 
                      className={isPriceFilterPressed()}
                      onClick={this.togglePriceFilter}>
                          <span className="list-header-filter-button-text">
                            Price
                          </span>
                      </button>
                    </div>
                    {priceFilter()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {ifSearch(this.state.searchTerm)}
        <ul className="list-items" onMouseLeave={this.unhovered}>
          {this.allPropsOrFiltered(this.state, this.props).map(listing => (
            <ListingIndexItem 
            listing={listing} 
            key={listing.id} 
            setHoveredListItem={this.setHoveredListItem}
            allReviews={this.props.allReviews}
            />
          ))}
        </ul >
        <div className="list-items-bottom-container">
          <div className="list-items-bottom-frame">
            <div className="list-items-bottom-text-main-container">
              <div className="list-items-bottom-text-main-frame">
                <div className="list-items-bottom-text-main-text">
                  1
                  <span> - </span>
                  {`${this.props.listings.length} `}
                  {`  of `}
                  {`${this.props.listings.length} places to stay`}
                </div>
              </div>
            </div>
            <div className="list-items-bottom-text-bottom-container">
              <div className="list-items-bottom-text-bottom-text">
                Additional fees apply. Taxes may be added.
              </div>
            </div>
          </div>
        </div>
        <div className="footer-buffer">footer</div>
      </div>
    )

    const hiddenShadow = (
      <div className="hidden-shadow">hello</div>
    )

    return (
      <div className="index-body">
          {hiddenShadow}
          <Navbar 
          searchTerm={this.state.searchTerm}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          guests={this.state.guests}
          />
          {listIndexItem}
          {sidenav}
      </div>
    );
  }
}
