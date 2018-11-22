import { connect } from 'react-redux';
import {fetchBookings} from '../../actions/booking_actions';
import UserTrips from './user_trips';

const msp = state => ({
  bookings: Object.values(state.entities.bookings),
});

const mdp = dispatch => ({
  fetchBookings: () => dispatch(fetchBookings())
});

export default connect(msp,mdp)(UserTrips);
