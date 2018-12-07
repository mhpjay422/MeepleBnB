import React from "react";
import MarkerManager from "../../util/marker_manager";

const mapOptions = {
  center: { lat: 40.782598, lng: -73.971915 },
  zoom: 12
};

class ListingMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers(this.props.listings);
  }

  componentDidUpdate() {
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers(this.props.listings);
  }

  render() {
    return (
      <div id="map-conatiner" ref="map">
        <div className="map" ref={map => (this.mapNode = map)} />
        map
      </div>
    );
  }
}

export default ListingMap;
