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

  handleChange(e) {
    
    this.setState({ term: e.target.value });
    // searchedResults(this.state.term);
    // setTimeout(function () { }, 100000);
    debugger
  }

  searchedResults() {
    debugger
  }

render () {
  return (
    <div className="search">
      <div to="/greeting" className="magglass">
        <img className="magpic" src="./magglass.png" />
      </div>
      <input type="text" className="search-bar" onKeyPress={this.handleChange} placeholder="Search...">
      </input>
    </div>
  );
  }
}

export default withRouter(SearchBar);