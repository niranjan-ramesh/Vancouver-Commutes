import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setHoverLocation, setWorkLocation, setSeekLocations } from 'actions/locationSelectAction';
// import Map from './Map';
import LeafletMap from './LeafletMap';

const mapStateToProps = (state, ownProps) => ({
  workLocation: state.locationSelectReducer.workLocation,
  seekLocations: state.locationSelectReducer.seekLocations,
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setHoverLocation, setWorkLocation, setSeekLocations,
}, dispatch);

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(LeafletMap);

export default MapContainer;
