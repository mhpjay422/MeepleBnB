export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }

  updateMarkers(listings) {
    const markersSet = {};
    listings.forEach(listing => {
      if (!this.markers.id) {
        this.markers.id = listing ;
        this.createMarkerFromListing(listing);
      }
    });
  }

  createMarkerFromListing(listing) {
    debugger
    let latlng = new google.maps.LatLng(listing.lat, listing.lng);
    let newMarker = new google.maps.Marker({
      position: latlng,
      animation: google.maps.Animation.DROP,
      title: listing.title
    });
    newMarker.setMap(this.map);
  }
}
