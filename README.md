# MeepleBnB

## Architecture and Technologies

MeepleBnB was built using:

* React v16.6.3

* Redux v4.0.1

* PostgresSql v10.5

* Ruby v2.3.7

* Rails v5.2.1

* Javascript v9

* webpack v4.25.1
&nbsp;
&nbsp;
&nbsp;
## Background and Overview

MeepleBnB is an AirBnB inspired web application that allows users to search and book houses around the world.   It utilizes Rails API connected to a PostgreSQL database, serving data to React/Redux frontend.

This application is hosted on Heroku. It also uses Google Places API to obtain city or country coordinates from a user's search.

[Live Site](https://meeplebnb.herokuapp.com/)

![](./public/B&O.gif)
&nbsp;
&nbsp;
&nbsp;
## Key Features

### Google Maps API

The index page shows a list of available listings. When the user zooms or pans on the map, a new fetch request is invoked, bringing back only the listings within the boundaries of the map. 

![](./public/Maps.gif)

```javascript
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
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      this.props.updateFilter('bounds', bounds);
    });
  }
```

### Search 

![](./public/Search.gif)

The nav bar provides a search field where the user can search by address, city or state. A dropdown of listings will appear with available listings within the search parameter.  The addresses may be clicked to redirect directly to the listing or onEnter reload the index page showing listings within the search parameter.  

```javascript
const filteredListings = (state, props) => {
    let list = [];

    props.listings.forEach(function (listing) {
      const matched = listing.address.toLowerCase().includes(state.searchTerm.toLowerCase());
      const noZipArray = listing.address.split(" ");
      const noZip = noZipArray.slice(0, noZipArray.length - 1);
      const newAddress = noZip.join(" ");
      const newList = Object.assign({},listing);
      newList.address = newAddress

      if (matched) {
        list.push(newList);
      }
    });

    return list;
  }

  const emptySearchTerm = this.state.searchTerm === ""

  const allPropsOrFiltered = () => {
    if(emptySearchTerm) {
      return this.props.listings
    } else {
      return filteredListings(this.state, this.props)
    }
  }
```


&nbsp;
&nbsp;
### Bookings

A logged in user is able to book a listing from the listing show page.  Using the booking form, a date range may be selected using the actual "AirBnB date picker" along with the number of guests. If a user has already booked this property, a message will in place of the booking form will be in place of the booking form.



```javascript
class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      guests: 1,
      price: this.props.listing.price,
      status: "PENDING"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuests = this.handleGuests.bind(this);
    this.finalForm = this.finalForm.bind(this);
    this.formHelper = this.formHelper.bind(this);
  }

  componentDidMount() {
    this.props.fetchBookings(this.props.currentUserId);
  }

  componentWillUnmount(oldProps) {
    this.props.clearBookingErrors();
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.currentUserId === null) {
      alert("Please log in to make a booking");
    } 
    else if (this.state.startDate === null || this.state.endDate === null) {
      alert("Please choose valid date");
    }


    const booking = {
      guests: this.state.guests,
      date_start: this.state.startDate._d,
      date_end: this.state.endDate._d,
      listing_id: parseInt(this.props.listing.id),
      status: this.state.status,
      price: this.props.listing.price
    };

    this.props.createBooking(booking);
  }

  handleGuests(e) {
    this.setState({ guests: e.target.value });
  }

  renderErrors() {
    const errorMess = this.props.errors.map((error, i) => {
      return (
        <li key={`error-${i}`} className="errors">
          {error}
        </li>
      );
    });
    return <ul>{errorMess}</ul>;
  }

  formHelper(booking) {
    return (this.props.listing.id === booking.listing_id && booking.renter_id === this.props.currentUserId);
  }

  finalForm(alreadyBookedForm, form) {
    if (this.props.bookings.some(this.formHelper)) {
      return alreadyBookedForm;
    } else {
      return form;
    }
  }
```
&nbsp;
&nbsp;