import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      term:'', 
      autoResults:[],
      itemSelected:{},
      showItemSelected: false
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
    debugger
    this.setState({ 
      term: e.target.value,
      autoResults: this.props.listings.filter( word => word.includes(this.state.term))
     });
     debugger
    // setTimeout(function () { }, 100000);
    
    
  };

render () {
  return (
    <div className="search">
      <div to="/greeting" className="magglass">
        <img className="magpic" src="./magglass.png" />
      </div>
      <input type="text" className="search-bar" onChange={this.handleChange} placeholder="Search...">
      </input>
    </div>
  );
  }
}
export default withRouter(SearchBar);