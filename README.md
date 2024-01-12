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

### Search and Filter

![](./public/Search.gif)

The Search and Filter menu bar provides a search field where the user can search by address, city or state. A dropdown of listings will appear with available listings within the search parameter.  The addresses may be clicked to redirect directly to the listing or onEnter reload the index page showing listings within the search parameter. You may also adjust additional filter options such as the date range and the number of guests within the search.  

```javascript
const filteredListings = () => {
  let list = [];

  listings.forEach(function (listing) {
    const searched = listing.address.toLowerCase().includes(searchTerm.toLowerCase());
    const inPriceRange = (listing.price > priceRangeMin) && (listing.price < priceRangeMax)
    const matched = searched && inPriceRange
    const noZipArray = listing.address.split(" ");
    const noZip = noZipArray.slice(0, noZipArray.length - 1);
    const newAddress = noZip.join(" ");
    const newList = Object.assign({}, listing);
    newList.address = newAddress
    
    if (matched) {
      list.push(newList);
    }
  });

  if (list.length || !priceRangeDefault) {
    return list;
  } else {
    return listings;
  }
}    
```


&nbsp;
&nbsp;
### Bookings

![](./public/Bookings.gif)

A logged in user is able to book a listing from the listing's show page.  Using the booking form, a date range may be selected using the actual "AirBnB date picker" along with the number of guests. If a user has already booked this property, a message will in place of the booking form will be in place of the booking form. 

Redux is used to store Booking Detail state across pages.  On the listing show page, the parent component stores and distributes the Booking details as the details change on each child component. This is achieved by lifting state back to the parent from child through a method that is passed as props to the child. When the method is called, a "setState" is invoked which updates the state in the parent. And by doing so, so does update the state in sibling components of the originating child component.

The AirBnB datepicker API is imported, customized and used to handle the calendar portion of the Bookingform. 
```javascript
componentDidMount() {
    this.props.fetchBookings(this.props.currentUserId);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.startDate !== this.props.startDate) || (prevProps.endDate !== this.props.endDate)) {
      this.setState({
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        guests: this.props.guests,
      });
    }
  }

  handleChange({ startDate, endDate }) {
    this.props.liftStateToParent({ startDate, endDate });
    this.setState({ startDate, endDate })

    this.props.updateStayOptions({
      searchTerm: "",
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      guests: this.state.guests
    })

    this.forceUpdate()
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.currentUserId === null) {
      alert("Please log in to make a booking");
    } else if (this.state.startDate === null || this.state.endDate === null) {
      alert("Please choose a valid date");
    } else if (!(this.state.guests >= 1 && this.state.guests <= 4)) {
      alert("Please choose a valid number of guests")
    } else {


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
  }

  <div className="date-picker">
    <DateRangePicker
      startDate={this.state.startDate}
      startDateId="start-date"
      endDate={this.state.endDate}
      endDateId="end-date"
      startDatePlaceholderText="Check-In"
      showClearDates={true}
      endDatePlaceholderText="Check-Out"
      onDatesChange={({ startDate, endDate }) =>
        this.handleChange({ startDate, endDate })
      }
      focusedInput={this.state.focusedInput}
      onFocusChange={this.handleFocusChange}
      renderCalendarDay={undefined}
      minimumNights={2}
    />
  </div>
```
&nbsp;
&nbsp;