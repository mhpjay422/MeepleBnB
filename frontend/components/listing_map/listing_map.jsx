import React from "react";

const mapOptions = {
  center: { lat: 37.7758, lng: -122.435 },
  zoom: 13
};

class ListingMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
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
