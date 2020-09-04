import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term:'', 
      filteredList:[], 
      listOpen: false,
      focusLocation: false,
      searchFocused: false,
    };

    this.focusLocation = this.focusLocation.bind(this);
    this.unfocusLocation = this.unfocusLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.findListings = this.findListings.bind(this);
    this.openList = this.openList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focus = this.focus.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleClickOutsideLocation = this.handleClickOutsideLocation.bind(this);
    this.ifEnter = this.ifEnter.bind(this);
    // this.focusInput = this.focusInput.bind(this);
  }


  componentDidMount() {
    debugger
    if (this.props.onRef) {
      this.props.onRef(this)
    }
    this.props.fetchListings();
    document.addEventListener('mousedown', this.handleClickOutsideLocation, false)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
    document.removeEventListener('mousedown', this.handleClickOutsideLocation, false)
  }

  handleClickOutsideLocation(e) {
    if(!this.location.contains(e.target)) {
      this.unfocusLocation()
    }
  }

  handleChange(e) {
    this.setState({ term: e.target.value }, () => { 
      const term = this.state.term;
      const sortedListings = this.findListings(term);
      const objectListings = sortedListings.map(listing => {
        return {
          id: listing[0],
          address: listing[1]
        }
      })
      
      this.setState({ filteredList: objectListings }, () => {
        return;
      })
    });
  };

  findListings(term) {
    let list = [];

    this.props.listings.forEach(function (listing) {
      const matched = listing.address.toLowerCase().includes(term.toLowerCase());
      
      const noZipArray = listing.address.split(" ");
      const noZip = noZipArray.slice(0, noZipArray.length - 1);
      const newAddress = noZip.join(" ");
      
      if (matched) {
        list.push([listing.id,newAddress]);
      }

    });
    
    if(list.length === 0) {
      list.push([null, "no matches"])
    }

    if(list.length <= 4 ) {
      return list.slice(0, list.length)
    }
    return list.slice(0,5);
  }

  openList(){
    this.setState({ listOpen: true })
  }

  handleSubmit(e) {
    if(e) {
      e.preventDefault()
    }

    if(!this.state.filteredList) {
      this.props.fetchListings();
    }

    this.setState({ listOpen: false });

    this.props.history.push({
      pathname: `/search_greeting`,
      search: this.state.term,
      state: { detail: this.state.term },
    });
  }

  focus() {
    // if (document.activeElement.id !== "clear-button") {
      this.node.focus();
    // }  
  }

  ifEnter(e) {
    debugger
    if(e.charCode === 13) {
      debugger
      this.unfocusLocation()
      this.props.toggleStart("search")
    }
  }

  // focusInput() {
  //   document.querySelector('[class="search-bar-container"]').click();
  // }

  focusLocation() {
    this.setState({ 
      focusLocation: true,
      listOpen: true,
      searchFocused: true,
    })
  }

  unfocusLocation() {
    this.setState({ 
      focusLocation: false,
      listOpen: false,
      searchFocused: false
    })
  }

  clearInput() {
    this.node.value = ""
  }

  render() {

    const dropdownComponent = () => {
      if (this.state.term === "") {
        return (
          <ul className="searched-items">
            <div className="search-margin-bottom"></div>
              <div className="searched-item-row" >
                <div className="locpic-image">
                  <img className="locpic" src="./locpick.png" />
                </div>
                <Link 
                className="searched-item"
                to={`/search_greeting`}>
                  See locations in New York
                </Link>
              </div>
            <div className="search-margin-top"></div>
          </ul >
        )
      } else {
        return (
          <ul className="searched-items">
            <div className="search-margin-bottom"></div>
            {this.state.filteredList.map(listing => (
              <div className="searched-item-row" key={listing.id} >
                <div className="locpic-image">
                  <img className="locpic" src="./locpick.png" />
                </div>
                <Link
                  className="searched-item"
                  listing={listing}
                  to={`/listings/${listing.id}`}
                >
                  {listing.address}
                </Link>
              </div>
            ))}
            <div className="search-margin-top"></div>
          </ul >
        )
      }
    }

    const isDropdownOpen = () => {
      const shouldDropdownOpen = this.state.listOpen;

      if (shouldDropdownOpen) {
        return dropdownComponent()
      } 
    }

    const isHovered = () => {
      if (this.state.focusLocation) {
        return (
          <div
            className="splash-search-form-location-container-inner-focus"
            onFocus={() => setTimeout(this.focusLocation, 200)}
            autoFocus={true}
            autoComplete="off"
          >
            <div className="splash-search-form-location-container-inner-z">
              <div className="splash-search-form-location-input-header">
                Location
              </div>
              <form 
                // onSubmit={this.handleSubmit}
                className="search-bar-container-form">
                <input
                  id="input-search"
                  className="search-bar-container"
                  ref={node => this.node = node}
                  type="text"
                  onChange={this.handleChange}
                  onClick={this.openList}
                  placeholder="Where are you going?"
                  autoComplete="off"
                  onKeyPress={this.ifEnter}
                  >
                </input>
                {isDropdownOpen()}
              </form>
               
            </div>
          </div>  
        )
      } else {
        return (
          <div
            className="splash-search-form-location-container-inner"
            onFocus={() => setTimeout(this.focusLocation, 200)}
            autoFocus={true}
          >
            <div className="splash-search-form-location-container-inner-z">
              <div className="splash-search-form-location-input-header">
                Location
              </div>
              <div
                className="search-bar-container-form"
                autoComplete="off"
                >
                <input
                  id="input-search"
                  className="search-bar-container"
                  ref={node => this.node = node}
                  type="text"
                  onChange={this.handleChange}
                  onClick={this.openList}
                  placeholder="Where are you going?"
                  autoComplete="off"
                  >
                </input>
                {isDropdownOpen()}
              </div>
            </div>
          </div>
        )
      }
    }

    const clearSearchbar = () => {
      if (this.state.searchFocused && this.node.value !== "") {
        return (
          <div className="clear-button-container">
            <button 
            className="clear-button"
            id="clear-button"
            onClick={this.clearInput}>
              <div className="clear-button-image">
                <img className="clear-button-img" src="ex.png"></img>
              </div>
            </button>
          </div>
        )
      }
    }

    return (
      <div 
        className="splash-search-form-location-container"
        ref={location => this.location = location}
        id="location-search"
        onClick={this.focus}
        >
          {isHovered()}
          {clearSearchbar()}
      </div>
    );
  }
}
export default withRouter(SearchBar);

