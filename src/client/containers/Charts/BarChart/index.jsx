import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWorkLocation, setSeekLocations } from 'actions/locationSelectAction';
import BarChart from './BarChart';

const mapStateToProps = (state, ownProps) => ({
  workLocation: state.locationSelectReducer.workLocation,
  seekLocations: state.locationSelectReducer.seekLocations,
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setWorkLocation, setSeekLocations,
}, dispatch);

const BarChartContainer = connect(mapStateToProps, mapDispatchToProps)(BarChart);

export default BarChartContainer;
