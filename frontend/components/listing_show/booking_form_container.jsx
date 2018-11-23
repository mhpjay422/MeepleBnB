import { connect } from "react-redux";
import BookingForm from "./booking_form";
import { fetchUser } from "../../actions/user_actions";
import { fetchListing } from "../../actions/listing_actions";
import {
  createBooking,
  clearBookingErrors,
  fetchBookings
} from "../../actions/booking_actions";

const mapStateToProps = (state = {}, ownProps) => {
  return {
    listing: ownProps.listing,
    currentUserId: state.session.id,
    errors: state.errors.booking,
    bookings: Object.values(state.entities.bookings)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    fetchListing: id => dispatch(fetchListing(id)),
    fetchBookings: () => dispatch(fetchBookings()),
    createBooking: booking => dispatch(createBooking(booking)),
    clearBookingErrors: () => dispatch(clearBookingErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm);
