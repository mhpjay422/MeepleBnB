import { connect } from 'react-redux';
import Searchbar from './searchbar.jsx';


const msp = state => ({
    listings: Object.values(state.entities.listings),
});

export default connect(msp)(Searchbar);