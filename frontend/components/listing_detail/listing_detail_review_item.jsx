import React from "react";
import { withRouter } from "react-router-dom";

class ListingDetailReviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(date) {
    const calendarYear = {
      1: "January", 
      "2": "February", 
      "3": "March", 
      "4": "April", 
      "5": "May", 
      "6": "June", 
      "7": "July", 
      "8": "August", 
      "9": "September", 
      "10": "October", 
      "11": "November", 
      "12": "December", 
    }
    const splitDate = date.split("-");
    const dateYear = splitDate[0];
    const monthDigit = parseInt(splitDate[1])
    const dateMonth = calendarYear[monthDigit];

    return `${dateMonth} ${dateYear}`    
  }

  render() {
    const { review } = this.props;

    const item = (review) => {
      if (review.author) {
        return (
          <div className="reviews-body-item">
            <div className="reviews-body-item-header">
              <div className="reviews-body-item-header-icon">
                <img src="userimage.png"></img>
              </div>
              <div className="reviews-body-item-header-text-top">
                {review.author.username}
                <div className="reviews-body-item-header-text-bottom">
                  {this.formatDate(review.created_at)}
                </div>
              </div>
            </div>
            <div className="reviews-body-item-text">
              {review.body}
            </div>
          </div>
        )
      } else {
        return <></>
      }
    }

    return (
      <div className="reviews-body-item-container">
        {item(review)}
      </div>
    )
  }
}

export default withRouter(ListingDetailReviewItem);