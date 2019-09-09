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
      autoResults:[], 
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
    const bounds = { 
      northEast: { lat: 40.99024168884798, lng: -73.69725679687497 },
      southWest: { lat: 40.57430312176032, lng: -74.24657320312497 }
    };
    this.props.updateFilter('bounds', bounds);
    // debugger
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

      this.setState({ autoResults: sortedListings })
    });
  };

  findListings(term) {
    let list = [];
    this.props.listings.forEach(function (listing) {
      if (listing.address.toLowerCase().includes(term.toLowerCase())) {
        list.push(listing);
      }
    });
    return list;
  }

  toggleList(){
    debugger
    this.setState({ listOpen: !this.state.listOpen })
    debugger
  }

render () {
  return (
    <div className="search">
      <div to="/greeting" className="magglass">
        <img className="magpic" src="./magglass.png" />
      </div>
      <input ref={node => this.node = node}
             type="text" 
             className="search-bar" 
             onChange={this.handleChange}
             onClick={this.toggleList} 
             placeholder="Search..."
             >
      </input>
    </div>
  );
  }
}
export default withRouter(SearchBar);