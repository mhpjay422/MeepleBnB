export default class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
  }

  updateMarkers(listings) {
    const markersSet = {};
    listings.forEach(listing => markersSet[listing.id] = listing);

    listings
      .filter(listing => !this.markers[listing.id])
      .forEach(newListing => this.createMarkerFromListing(newListing, this.handleClick));

    Object.keys(this.markers)
      .filter(listingId => !markersSet[listingId])
      .forEach((listingId) => this.removeMarker(this.markers[listingId]));
  }

  createMarkerFromListing(listing) {
    let latlng = new google.maps.LatLng(listing.lat, listing.lng);
    let newMarker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      listingId: listing.id,
      animation: google.maps.Animation.DROP,
      title: listing.title
    });
    newMarker.addListener('click', () => this.handleClick(listing));
    this.markers[newMarker.listingId] = newMarker;
    }

  removeMarker(marker) {
    this.markers[marker.listingId].setMap(null);
    delete this.markers[marker.listingId];
  }
}
