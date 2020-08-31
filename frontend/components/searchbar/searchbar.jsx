import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term:'', 
      filteredList:[], 
      listOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.findListings = this.findListings.bind(this);
    this.openList = this.openList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textInput = React.createRef();
    this.focus = this.focus.bind(this);
    this.changeBackgroundHover = this.changeBackgroundHover.bind(this);
    this.changeBackgroundUnhover = this.changeBackgroundUnhover.bind(this);
    this.focusInput = this.focusInput.bind(this);
  }

  handleClick(e){
    if (this.node.contains(e.target) || (e.target.classList[0] === "searched-item")) {
      return
    }
    this.setState({ listOpen: false });
  }

  componentDidMount() {
    this.props.fetchListings();
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
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
    e.preventDefault()

    if(this.state.filteredList[0].id === null) {
      this.props.fetchListings();
    }

    this.setState({ listOpen: false });

    this.props.history.push({
      pathname: `/search_greeting`,
      search: this.state.term,
      state: { detail: this.state.term }
    });
  }

  focus() {
    this.textInput.current.focus();
  }

  focusInput() {
    document.querySelector('[class="search-bar-container"]').click();
  }

  changeBackgroundHover(e) {
    e.stopPropagation()
    this.setState({ splashInner: true })
  }

  changeBackgroundUnhover(e) {
    e.stopPropagation()
    this.setState({ splashInner: false })
  }

  render() {

    const dropdownComponent = 
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

    const shouldDropdownOpen = this.state.listOpen 

    const isDropdownOpen = () => {
      if (shouldDropdownOpen && (this.state.term !== "")) {
        return dropdownComponent
      } 
    }

    const searchBarClass = () => {
      if (shouldDropdownOpen) {
        return "search-bar-open"
      } else {
        return "search-bar-closed"
      }
    }

    const searchDropClass = () => {
      if (this.state.listOpen) {
        return "search-drop-open"
      } else {
        return "search-drop-closed"
      }
    }

    const isHovered = () => {
      if (this.state.splashInner) {
        return "splash-search-form-location-container-inner-hovered"
      } else {
        return "splash-search-form-location-container-inner"
      }
    }

    return (
      <div className="splash-search-form-location-container"
        id="location-search"
        onClick={this.focus}>
        <div className={isHovered()}
          onMouseOver={this.changeBackgroundHover}
          onMouseLeave={this.changeBackgroundUnhover}
          onClick={this.focus}>
          <div className="splash-search-form-location-container-inner-z"
            onClick={this.focus}>
            <div className="splash-search-form-location-input-header"
              onClick={this.focus}>
              Location
            </div>
            <form onSubmit={this.handleSubmit}
              className="search-bar-container-form">
              <input
                className="search-bar-container"
                ref={node => this.node = node}
                type="text"
                onChange={this.handleChange}
                onClick={this.openList}
                placeholder="Where are you going?"
                onKeyPress={this.openList}>
              </input>
              {isDropdownOpen()}
            </form>
          </div>
        </div>
      </div>
      
    );
  }
}
export default withRouter(SearchBar);

