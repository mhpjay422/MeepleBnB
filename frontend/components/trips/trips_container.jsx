import { connect } from "react-redux";
import { fetchBookings } from "../../actions/booking_actions";
import TripsIndex from "./trips_index";

const msp = state => {
  return {
    trips: Object.values(state.entities.bookings),
    listings: state.entities.listings
  };
};

const mdp = dispatch => ({
  fetchBookings: () => dispatch(fetchBookings())
});

export default connect(
  msp,
  mdp
)(TripsIndex);
