import { connect } from 'react-redux';
import BookingForm from './booking_form';
import { fetchUser } from '../../actions/user_actions';
import { fetchListing } from '../../actions/listing_actions';
import {createBooking, clearBookingErrors} from '../../actions/booking_actions';


const mapStateToProps = (state = {}, ownProps) => {
  return {
    listing: state.entities.listings[ownProps.listingId],
    currentUserId: state.session.currentUserId,
    errors: state.errors.booking
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchListing: (id) => dispatch(fetchListing(id)),
    createBooking: (booking) => dispatch(createBooking(booking)),
    clearBookingErrors: () => dispatch(clearBookingErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
