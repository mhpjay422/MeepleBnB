import React from "react";
import { withRouter } from "react-router-dom";

class ListingDetailReviewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    debugger
  }

  render() {
    const { review } = this.props;
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
            {review.body}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ListingDetailReviewItem);