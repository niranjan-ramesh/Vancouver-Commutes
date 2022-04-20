import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWorkLocation, setSeekLocations } from 'actions/locationSelectAction';
import BoxChart from './BoxChart';

const mapStateToProps = (state, ownProps) => ({
  workLocation: state.locationSelectReducer.workLocation,
  seekLocations: state.locationSelectReducer.seekLocations,
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setWorkLocation, setSeekLocations,
}, dispatch);

const BoxChartContainer = connect(mapStateToProps, mapDispatchToProps)(BoxChart);

export default BoxChartContainer;