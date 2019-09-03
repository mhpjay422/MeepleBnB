import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = [];
  }

  handleSubmit() {
    e.preventDefault();
  }

render () {
  return (
    <div className="search">
      <input type="text" className="search-bar" onSubmit={this.handleSubmit}>
      </input>
    </div>
  );
  }
}
  export default withRouter(SearchBar);
