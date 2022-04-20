import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWorkLocation, setSeekLocations } from 'actions/locationSelectAction';
import LineChart from './LineChart';

const mapStateToProps = (state, ownProps) => ({
  workLocation: state.locationSelectReducer.workLocation,
  seekLocations: state.locationSelectReducer.seekLocations,
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setWorkLocation, setSeekLocations,
}, dispatch);

const LineChartContainer = connect(mapStateToProps, mapDispatchToProps)(LineChart);

export default LineChartContainer;
