import React, { useState } from 'react';
import { scaleLinear, scaleBand, max } from 'd3';
import './index.scss';
import PropTypes from 'prop-types';
import SampleData from 'constants/bar-graph.json';

const BarChart = ({ seekLocations }) => {
  if (seekLocations.length === 0) return <></>;

  const [bedrooms, setBedrooms] = useState('overall-average');
  const data = SampleData.filter((item) => seekLocations.includes(item.district));

  // const width = window.innerWidth - 80;
  const width = 700;
  // const height = window.innerHeight;
  const height = 500;
  // const width = 1100;
  // const height = 600;

  const margin = {
    top: 30, right: 30, bottom: 30, left: 38,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xScale = scaleBand()
    .range([0, innerWidth])
    .domain(data.map((d) => d.district))
    .padding(0.2);
  const yScale = scaleLinear()
    .range([innerHeight, 0])
    .domain([0, max(data, (d) => d[bedrooms])]);

  const getColor = (i) => {
    const colors = ['#FF9F0A',
    '#BF5AF2',
    '#FF2D55',
    '#64FFB5'];
    return colors[i];
  };

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-heading">
        <span className="title">Rental Prices</span>
        <span className="description">Find out the average rental pricing of your selected locations</span>
        <div className="bedrooms-control">
          <span className="title">BEDROOMS</span>
          <div className="bedrooms-buttons">
            <button type="button" onClick={() => setBedrooms('1br-average')}>1BR</button>
            <button type="button" onClick={() => setBedrooms('2br-average')}>2BR</button>
            <button type="button" onClick={() => setBedrooms('3br-average')}>3BR+</button>
            <button type="button" onClick={() => setBedrooms('overall-average')}>Overall</button>
          </div>
        </div>
      </div>
      <svg className="bar-svg" width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {yScale.ticks().map((tickValue) => (
            <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
              {/* <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="white" /> */}
              <text
                dy=".3em"
                style={{ textAnchor: 'end' }}
                x={-4}
                fill="white"
              >
                {tickValue}
              </text>
            </g>
          ))}
          {data.map((d, i) => (
            <rect
              style={{fill: getColor(i)}}
              key={d.district}
              x={xScale(d.district)}
              y={yScale(d[bedrooms])}
              width={55}
              height={innerHeight - yScale(d[bedrooms])}
            />
          ))}
          {xScale.domain().map((tickValue) => (
            <g key={tickValue} transform={`translate(${xScale(tickValue) + 55 / 2}, 0)`}>
              {/* <line x1={0} y1={0} x2={0} y2={height} stroke="white" /> */}
              <text
                style={{ textAnchor: 'middle' }}
                y={innerHeight + 20}
                fill="white"
              >
                {tickValue}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  seekLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};
