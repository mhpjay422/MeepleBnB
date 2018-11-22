export const fetchBookings = () =>
  $.ajax({
    url: "api/bookings",
    method: "get"
  });

export const fetchBooking = id =>
  $.ajax({
    url: `api/bookings/${id}`,
    method: "get"
  });

export const createBooking = booking => {
  debugger;
  return $.ajax({
    url: `api/listings/${booking.listing_id}/bookings`,
    method: "post",
    data: { booking }
  });
};

export const deleteBooking = id =>
  $.ajax({
    url: `api/bookings/${id}`,
    method: "delete"
  });
