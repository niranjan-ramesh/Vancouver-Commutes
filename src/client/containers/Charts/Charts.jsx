import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from 'components/CustomSelect';
import DropdownWithChips from 'components/DropdownWithChips';
import Vancouver from 'constants/commutes.json';
import BarChart from './BarChart';
import LineChart from './LineChart';
import Map from './Map';
import './index.scss';
import BoxChart from './BoxChart';

const locations = Object.keys(Vancouver);

const Charts = ({
  hoverLocation, workLocation, setWorkLocation, seekLocations, setSeekLocations,
}) => {
  const [locationSearch, setLocationSearch] = useState('');

  const handleChipsChange = (chips) => {
    setSeekLocations(chips)
  };
  const handleSearch = (text) => setLocationSearch(text);

  return (
    <div className="charts-container">
      <div className="chart-with-filter-menu">
        <div className="filter-menu">
          <span className="title">Find residence options based on your commute preferences</span>
          <div className="filter-menu-container">
            <CustomSelect
              label="Work Location"
              options={locations}
              handleChange={setWorkLocation}
              value={workLocation}
              tooltipText="Select the location where you work from the drop down"
            />
            <DropdownWithChips
              chips={seekLocations}
              dropDownList={locations}
              getChips={handleChipsChange}
              getText={handleSearch}
              text={locationSearch}
              placeholder="Choose Upto 4 Locations"
              label="Prefered residence"
              tooltipText="Add those locations you are interested in"
            />
          </div>
        </div>
          <div className="chart">
            <Map />
            <div className="map-helper">
              <div className="location-indicator">
                <span>{hoverLocation}</span>
              </div>
              <div className="colour-hue">
                <div className="colour-section">
                  <div className="colour-info">
                    <div className="colour-1" />   
                    <div className="colour-2" /> 
                    <div className="colour-3" />  
                    <div className="colour-4" />          
                    <div className="colour-5" />
                    <div className="colour-6" />          
                  </div>
                  <span style={{color: 'white', marginRight: '3rem'}}>0 min</span>
                  <span style={{color: 'white', marginRight: '2.5rem'}}>5 mins</span>
                  <span style={{color: 'white', marginRight: '2.20rem'}}>10 mins</span>
                  <span style={{color: 'white', marginRight: '2.15rem'}}>20 mins</span>
                  <span style={{color: 'white', marginRight: '11rem'}}>35+ mins</span>
                  <span style={{color: 'white'}}>Current work location</span>
                </div>
              </div>
            </div>
          </div>
        <div className="chart">
          <BarChart />
        </div>
      </div>
      <div className="chart">
        <LineChart />
      </div>
      <div className="chart box-plot-container">
        <div style={{display: 'grid'}}>
          <span className="title">Housing Prices</span>
          <span className="description">Find the selling price distribution of houses in selected regions</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className="chart box-chart">
            <BoxChart/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;

Charts.propTypes = {
  hoverLocation: PropTypes.string.isRequired,
  seekLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSeekLocations: PropTypes.func.isRequired,
  setWorkLocation: PropTypes.func.isRequired,
  workLocation: PropTypes.string.isRequired,
};
