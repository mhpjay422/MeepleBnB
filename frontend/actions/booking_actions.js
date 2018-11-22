import * as BookingAPIUtil from "../util/booking_api_util";

export const RECEIVE_ALL_BOOKINGS = "RECEIVE_ALL_BOOKINGS";
export const RECEIVE_BOOKING = "RECEIVE_BOOKING";
export const RECEIVE_BOOKING_ERRORS = "RECEIVE_BOOKING_ERRORS";
export const CLEAR_BOOKING_ERRORS = "CLEAR_BOOKING_ERRORS";
export const DELETE_BOOKING = "DELETE_BOOKING";

const receiveBookings = bookings => {
  return {
    type: RECEIVE_ALL_BOOKINGS,
    bookings
  };
};

const receiveBooking = booking => {
  return {
    type: RECEIVE_BOOKING,
    booking
  };
};

const removeBooking = id => {
  return {
    type: DELETE_BOOKING,
    bookingId: id
  };
};

const receiveBookingErrors = errors => {
  return {
    type: RECEIVE_BOOKING_ERRORS,
    errors
  };
};

export const clearBookingErrors = () => {
  return {
    type: CLEAR_BOOKING_ERRORS
  };
};

export const fetchBookings = () => dispatch => {
  return BookingAPIUtil.fetchBookings().then(payload => {
    return dispatch(receiveBookings(payload));
  });
};

export const fetchBooking = id => dispatch => {
  return BookingAPIUtil.fetchBooking(id).then(payload => {
    return dispatch(receiveBooking(payload));
  });
};

export const createBooking = booking => dispatch => {
  return BookingAPIUtil.createBooking(booking).then(
    payload => dispatch(receiveBooking(payload)),
    err => dispatch(receiveBookingErrors(err.responseJSON))
  );
};

export const deleteBooking = id => dispatch => {
  return BookingAPIUtil.deleteBooking(id).then(payload => {
    return dispatch(removeBooking(payload));
  });
};
