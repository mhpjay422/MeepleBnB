import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";
import Navbar from "../navbar/navbar_container";

export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.history.location.state) {
      this.state = {
        searchTerm: this.props.history.location.state.detail,
        startDate: this.props.history.location.state.startDate,
        endDate: this.props.history.location.state.endDate,
        guests: this.props.history.location.state.guests,
        hovered: [null, null]
      };
    } else {
      this.state = {
        searchTerm: "",
        startDate: null,
        endDate: null,
        guests: 0,
        hovered: [null, null]
      };
    }
    this.filteredListings = this.filteredListings.bind(this);
    this.allPropsOrFiltered = this.allPropsOrFiltered.bind(this);
    this.setHoveredListItem = this.setHoveredListItem.bind(this);
    this.unhovered = this.unhovered.bind(this)
  }

  componentDidMount() {
    this.props.fetchReviews("all");
  }

  componentWillUnmount() {
    
    this.props.history.replace({
      search: ``,
    });
  }

  componentDidUpdate() {
    debugger
  }

  componentWillUpdate(newProps) {
    debugger
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
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;

        if (startDate) {
          const cloneStart = startDate.clone();
          const formatStart = cloneStart.format(`MMM DD`);
          const formatStartMonth = cloneStart.format("MMM");
          const startPlusOne = cloneStart.add(1, 'days').format(`MMM DD`);
          const startPlusOneMonth = cloneStart.add(1, 'days').format(`MMM`);
          const startPlusOneDay = cloneStart.add(1, 'days').format(`DD`);

          if(startDate && !endDate) {

            if (formatStartMonth === startPlusOneMonth) {
              
              return `· ${formatStart} - ${startPlusOneDay}`
            } else {

              return `· ${formatStart} - ${startPlusOne}`
            }
          } else {
            const cloneEnd = endDate.clone();
            const formatEnd = cloneEnd.format(`MMM DD`);
            const formatEndMonth = cloneEnd.format("MMM");
            const formatEndDay = cloneEnd.format("DD")

            if(formatStartMonth === formatEndMonth) {
              return `· ${formatStart} - ${formatEndDay}`
            } else {
              return `· ${formatStart} - ${formatEnd}`
            }

          }

        } else if (!startDate && endDate){
          const cloneEnd = endDate.clone();
          const formatEnd = cloneEnd.format(`MMM DD`);
          const formatEndMonth = cloneEnd.format("MMM");
          const formatEndDay = cloneEnd.format("DD")
          const endMinusOne = cloneEnd.subtract(1, 'days').format(`MMM DD`);
          const endMinusOneMonth = cloneEnd.subtract(1, 'days').format(`MMM`);

          if (formatEndMonth === endMinusOneMonth) {
            
            return `· ${endMinusOne} - ${formatEndDay}`
          } else {
            
            return `· ${endMinusOne} - ${formatEnd}`
          } 
        } else {

          return ""
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

    const listIndexItem = (
      <div className="list-body">
        <div className="list-header">
          <div className="list-header-container">
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
        <div className="footer-buffer">footer</div>
      </div>
    )

    return (
      <div className="index-body">
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
