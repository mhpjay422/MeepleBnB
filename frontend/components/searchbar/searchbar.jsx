import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from 'react-select';
import styled from '@emotion/styled';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.findListings = this.findListings.bind(this);
    this.state = {
      term:'', 
      autoResults:[]
    };
  }

  componentDidMount() {
    const bounds = { 
      northEast: { lat: 40.99024168884798, lng: -73.69725679687497 },
      southWest: { lat: 40.57430312176032, lng: -74.24657320312497 }
    };
    this.props.updateFilter('bounds', bounds);
  }

  handleChange(e) {
    

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

render () {
  
  return (
    <div className="search">
      <div to="/greeting" className="magglass">
        <img className="magpic" src="./magglass.png" />
      </div>
      <Select 
        type="text" 
        className="search-bar" 
        onChange={this.handleChange} 
        placeholder="Search..."
        options={this.state.autoResults}
        openMenuOnClick={false}
        styles={searchStyles}
        >
        
      </Select>
    </div>
  );
  }
}
export default withRouter(SearchBar);