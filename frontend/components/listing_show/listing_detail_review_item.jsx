import React from "react";
import { withRouter } from "react-router-dom";

class ListingDetailReviewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reviews-body-item-container">
        <div className="reviews-body-item">
          <div className="reviews-body-item-header">
            <div className="reviews-body-item-header-icon">
              Icon
                    </div>
            <div className="reviews-body-item-header-text-top">
              Name
                      <div className="reviews-body-item-header-text-bottom">
                Date
                      </div>
            </div>
          </div>
          <div className="reviews-body-item-text">
            We loved staying at David's beautiful home! The pool is perfect and the house is close to wonderful hiking trails. The kitchen was well stocked. It was the perfect place for a family getaway.
                  </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ListingDetailReviewItem);