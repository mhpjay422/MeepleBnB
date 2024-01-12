import React from "react";
import MarkerManager from "../../util/marker_manager";
import { withRouter } from 'react-router-dom';

const mapOptions = {
  center: { lat: 40.740508, lng: -73.971915 },
  zoom: 11.5,
  gestureHandling: 'greedy',
  zoomControl: true, 
  fullscreenControl: true, 
  mapTypeControl: true,
  streetViewControlOptions: {
    position: google.maps.ControlPosition.RIGHT
  },
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT
  },
};

class ListingMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
    this.registerListeners();
  }

  componentDidUpdate(prevProps) {
    if (this.props.listings !== prevProps.listings){
      this.MarkerManager.updateMarkers(this.props.listings);
    }

    if (this.props.hovered !== prevProps.hovered) {
      this.MarkerManager.updateHovered(this.props.hovered);
    }
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      this.props.updateFilter('bounds', bounds);
    });
  }

  handleMarkerClick(listing) {
      this.props.history.push(`listings/${listing.id}`);
  }


  render() {
    return (
      <div className="map" >
        <div className="google-map" ref={map => (this.mapNode = map)}/>
      </div>
    );
  }
}

export default withRouter(ListingMap);
