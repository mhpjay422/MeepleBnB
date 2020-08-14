export default class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
    this.price = this.price.bind(this);
  }

  price() {
    return listing.price;
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
    var image = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/wht-blank.png',
      // This marker is 35 pixels wide by 35 pixels high.
      size: new google.maps.Size(100, 100),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(-17, -31),
      // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 0)
    };
    let price = "10";
    let newMarker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      listingId: listing.id,
      title: listing.title,
      icon : image,
      label: {
        fontfamily: "sans-serif",
        text: `$${listing.price}`,
        color: 'black',
        fontSize: '11px',
        fontWeight: 'bolder'
      }
    });
    newMarker.addListener('click', () => this.handleClick(listing));
    this.markers[newMarker.listingId] = newMarker;
    }

  removeMarker(marker) {
    this.markers[marker.listingId].setMap(null);
    delete this.markers[marker.listingId];
  }
}
