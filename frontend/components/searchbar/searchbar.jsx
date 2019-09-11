import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.findListings = this.findListings.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      term:'', 
      filteredList:[], 
      listOpen: false
    };
  }

  handleClick(e){
    if (this.node.contains(e.target)) {
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
    debugger
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
    
    return list.slice(0,8);
  }

  toggleList(){
    this.setState({ listOpen: !this.state.listOpen })
  }

render () {
  return (
    <div className="search">
      <div to="/greeting" className="magglass">
        <img className="magpic" src="./magglass.png" />
      </div>
      <div className="search-drop">
        <input ref={node => this.node = node}
          type="text"
          className="search-bar"
          onChange={this.handleChange}
          onClick={this.toggleList}
          placeholder="Search...">
        </input>
        <ul className="searched-items">
          {this.state.filteredList.map(listing => (
            <div listing={listing} key={listing.id}>
              <div className="searched-item" key={listing.address}>
                {listing.address}
              </div>
            </div>
          ))}
        </ul>
      </div>
      
    </div>
  );
  }
}
export default withRouter(SearchBar);``