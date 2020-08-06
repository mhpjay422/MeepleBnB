import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.findListings = this.findListings.bind(this);
    this.openList = this.openList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      term:'', 
      filteredList:[], 
      listOpen: false
    };
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
      list.push(["a", term])
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

    if (this.props.history.location.pathname === "/greeting") {
      this.props.history.replace(this.props.history.location.pathname)
    }

    this.props.history.push({
      pathname: `/greeting`,
      search: this.state.term,
      state: { detail: this.state.term }
    });
  }


  render() {

    const dropdownComponent = 
      <ul className="searched-items">{
        this.state.filteredList.map(listing => (
          <div className="searched-item-row" key={listing.id} >
            <img className="locpic" src="./locpic.png" />
            <Link 
              className="searched-item" 
              listing={listing} 
              to={`/listings/${listing.id}`}
            >
              {listing.address}
            </Link>
          </div>
        ))}
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

    return (
      <div className="search">
        <div className={searchDropClass()}>
          <div className="search-bar">
            <div className="magglass">
              <img className="magpic" src="./magglass.png" />
            </div>
            <form onSubmit={this.handleSubmit} >
              <input
                ref={node => this.node = node}
                type="text"
                className={searchBarClass()}
                onChange={this.handleChange}
                onClick={this.openList}
                placeholder="Search..."
              >
              </input>
            </form>
          </div>
          {isDropdownOpen()}
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);