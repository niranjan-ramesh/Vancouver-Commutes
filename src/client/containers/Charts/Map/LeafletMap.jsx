import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Transit from 'images/Transit.svg'
import Bicycling from 'images/Bicycling.svg'
import Driving from 'images/Driving.svg'
import Vancouver from 'constants/commutes.json';
import LeafletMapView from './LeafletMapView';
import './index.scss';

const getColor = (time, name, workLocation) => {
  if(name === workLocation) return '#D34';
  if (time < 5) return '#CFF7FC';
  if (time < 10) return '#87EAF7';
  if (time < 20) return '#3FDDF3';
  if (time < 35) return '#0EBFD8';
  return '#098090';
};

const LeafletMap = ({ workLocation, seekLocations, setSeekLocations }) => {
  const [transportation, setTransportation] = useState('transit_time');

  const style = (feature) => ({
    fillColor: getColor(feature.properties[transportation], feature.properties.name, workLocation),
    weight: 2,
    opacity: 0.5,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  const handleLocationClick = (location) => {
    if (!seekLocations.includes(location) && location !== workLocation) {
      if(seekLocations.length < 4) {
        setSeekLocations([...seekLocations, location]);
      }
    } else {
      setSeekLocations(
        seekLocations.filter((l) => l !== location),
      );
    }
  };

  return (
    <div className="map-container">
      <div className="map-heading">
        <span className="title">Commutes</span>
        <span className="description">Find out the average rental pricing of your selected locations</span>
        <div className="map-control">
          <span className="title">TIME TO REACH</span>
          <div className="map-buttons">
            <button className={transportation === 'transit_time' ? 'button-active' : 'button-inactive'} 
              type="button" 
              onClick={() => setTransportation('transit_time')}>
              <Transit/>
              <span>Transit</span>
            </button>
            <button className={transportation === 'bicycling_time' ? 'button-active' : 'button-inactive'} 
              type="button" 
              onClick={() => setTransportation('bicycling_time')}>
              <Bicycling/>
              <span>Bicycling</span>
            </button>
            <button className={transportation === 'driving_time' ? 'button-active' : 'button-inactive'} 
              type="button" 
              onClick={() => setTransportation('driving_time')}>
              <Driving/>
              <span>Driving</span>
            </button>
          </div>
        </div>
      </div>
      <LeafletMapView
        key={workLocation}
        geojson={Vancouver[workLocation]}
        handleLocationClick={handleLocationClick}
        style={style}
      />
    </div>
  );
};

export default LeafletMap;

LeafletMap.propTypes = {
  seekLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSeekLocations: PropTypes.func.isRequired,
  workLocation: PropTypes.string.isRequired,
};
