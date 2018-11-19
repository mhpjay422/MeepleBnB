import React from 'react';
import { withRouter } from 'react-router-dom';


class IndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="listing-index-item">
        <div className="index-item-img">
          <img className="list-img" src={this.props.listing.picture_url}/>
        </div>
        <div className="index-item-info">
          <span className="index-item-title">{this.props.listing.title}</span>
          <br/>
          <span className="index-item-price">${this.props.listing.price} per night · Free cancellation</span>
          <br/>
          <span className="index-item-rating">Rating:</span><br/>
        </div>
      </div>
    );
  }
}

export default withRouter(IndexItem);
