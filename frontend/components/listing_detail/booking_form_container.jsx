import { connect } from "react-redux";
import BookingForm from "./booking_form";
import { fetchUser } from "../../actions/user_actions";
import { fetchListing } from "../../actions/listing_actions";
import { updateStayOptions } from '../../actions/stay_options_actions';
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
    bookings: Object.values(state.entities.bookings),
    startDate: ownProps.startDate,
    endDate: ownProps.endDate,
    guests: ownProps.guests,
    liftStateToParent: ownProps.liftStateToParent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    fetchListing: id => dispatch(fetchListing(id)),
    fetchBookings: () => dispatch(fetchBookings()),
    createBooking: booking => dispatch(createBooking(booking)),
    clearBookingErrors: () => dispatch(clearBookingErrors()), 
    updateStayOptions: (value) => dispatch(updateStayOptions(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm);
