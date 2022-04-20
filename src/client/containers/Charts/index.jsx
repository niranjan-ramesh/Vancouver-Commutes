import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWorkLocation, setSeekLocations } from 'actions/locationSelectAction';
import Charts from './Charts';

const mapStateToProps = (state) => ({
  hoverLocation: state.locationSelectReducer.hoverLocation,
  workLocation: state.locationSelectReducer.workLocation,
  seekLocations: state.locationSelectReducer.seekLocations,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setWorkLocation, setSeekLocations,
}, dispatch);

const ChartsContainer = connect(mapStateToProps, mapDispatchToProps)(Charts);

export default ChartsContainer;
