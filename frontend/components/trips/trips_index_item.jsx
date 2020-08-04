import React from "react";
import { withRouter } from "react-router-dom";
import ListingShowContainer from "../listing_show/listing_show_container";

class TripIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const listingId = this.props.trip.listing_id;
    this.props.history.push(`/listings/${listingId}`);
  }

  render() {

    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    }

    const dateStart = this.props.trip.date_start
    const dateEnd = this.props.trip.date_end

    const splitDate = (date) => {
      return date.toString().split("-")
    }

    const month = (date) => {
      return months[splitDate(date)[1]]
    }

    const day = (date) => {
      return splitDate(date)[2].slice(0,2)
    }

    const dateRange = () => {
      return `${month(dateStart)}. ${day(dateStart)} - ${month(dateEnd)}. ${day(dateEnd)}`
    }

    return (
      <div className="trip-index-item-container" onClick={this.handleClick}>
        <div className="trip-index-item-frame">
          <div className="trip-index-item-img">
            <img
              className="trip-iiimg"
              src={this.props.listings[this.props.trip.listing_id].picture_url}
            />
          </div>
          <div className="trip-index-item-body">
            <div className="trip-index-item-body-date">
              {dateRange()} 
            </div>
            <div className="trip-index-item-body-location">

            </div>
            <div className="trip-index-item-body-description">
              <div className="trip-item-title">
                {this.props.listings[this.props.trip.listing_id].title}
              </div>
            </div>


            <div className="trip-plus-container">
              <img className="trip-plus" src="./Screen Shot 2018-11-23 at 11.15.19 AM.png" />
            </div>


            <div className="trip-item-info">
              <div className="trip-item-rating">
                <div>Rating: </div>
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
                <img className="star" src="./star-solid.svg" />
              </div>
            </div>


          </div>
        </div>  
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
