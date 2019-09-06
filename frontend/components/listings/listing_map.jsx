import React from "react";
import MarkerManager from "../../util/marker_manager";
import { withRouter } from 'react-router-dom';

const mapOptions = {
  center: { lat: 40.782598, lng: -73.971915 },
  zoom: 10.4
};

class ListingMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
    this.registerListeners();
  }

  componentDidUpdate(prevProps) {
    if(this.props.listings !== prevProps.listings){
      this.MarkerManager.updateMarkers(this.props.listings);
    }
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      debugger
      const { north, south, east, west } = this.map.getBounds().toJSON();
      debugger
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      debugger
      this.props.updateFilter('bounds', bounds);
    });
  }

  handleMarkerClick(listing) {
      this.props.history.push(`listings/${listing.id}`);
  }


  render() {
    return (
      <div className="map" ref={map => (this.mapNode = map)}></div>
    );
  }
}

export default ListingMap;
