import React from "react";
import TripsIndexItem from "./trips_index_item";
import Navbar from "../navbar/navbar_container";

export default class TripsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBookings(this.props.match.params.renterId);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="trip-container">
          <div className="trip-body">
            <div className="trip-header">Trips</div>
            <div className="trip-content">
              <ul className="trip-items">
                {this.props.trips.map(trip => (
                  <TripsIndexItem
                    trip={trip}
                    listings={this.props.listings}
                    key={trip.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
