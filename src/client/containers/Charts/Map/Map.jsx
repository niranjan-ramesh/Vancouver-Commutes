import React from 'react';
import PropTypes from 'prop-types';
import Vancouver from 'constants/vancouver.json';
import Marks from './Marks';
import './index.scss';

const Map = ({
  workLocation, seekLocations, setHoverLocation, setSeekLocations,
}) => (
  <svg className="map-svg">
    {Vancouver && (
    <Marks
      scale={145800}
      x={224300}
      y={135800}
      data={Vancouver}
      workLocation={workLocation}
      seekLocations={seekLocations}
      setHoverLocation={setHoverLocation}
      setSeekLocations={setSeekLocations}
    />
    )}
  </svg>
);
export default Map;

Map.propTypes = {
  seekLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setHoverLocation: PropTypes.func.isRequired,
  setSeekLocations: PropTypes.func.isRequired,
  workLocation: PropTypes.string.isRequired,
};
