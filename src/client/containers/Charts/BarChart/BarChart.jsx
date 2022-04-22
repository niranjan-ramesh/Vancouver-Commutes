import React, { useState } from 'react';
import { scaleLinear, scaleBand, max } from 'd3';
import OneB from 'images/OneB.svg'
import TwoB from 'images/TwoB.svg'
import ThreeB from 'images/ThreeB.svg'
import Overall from 'images/Overall.svg'
import './index.scss';
import PropTypes from 'prop-types';
import SampleData from 'constants/bar-graph.json';

const BarChart = ({ seekLocations }) => {
  if (seekLocations.length === 0) return <></>;
  seekLocations = seekLocations.sort();
  const [bedrooms, setBedrooms] = useState('overall-average');
  const data = SampleData.filter((item) => seekLocations.includes(item.district));

  // const width = window.innerWidth - 80;
  // const width = 700;
  // const height = window.innerHeight;
  const height = 500;
  const width = 1280;
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
    .domain([0, 3100]);

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
        <span className="description">Find out the average monthly rental pricing of your selected locations in CAD</span>
        <div className="bedrooms-control">
          <span className="title">BEDROOMS</span>
          <div className="bedrooms-buttons">
            <button type="button" className={bedrooms === '1br-average' ? 'button-active' : 'button-inactive'} onClick={() => setBedrooms('1br-average')}>
              <OneB/>
              <span>1BR</span>
            </button>
            <button type="button" className={bedrooms === '2br-average' ? 'button-active' : 'button-inactive'} onClick={() => setBedrooms('2br-average')}>
              <TwoB/>
              <span>2BR</span>
            </button>
            <button type="button" className={bedrooms === '3br-average' ? 'button-active' : 'button-inactive'} onClick={() => setBedrooms('3br-average')}>
              <ThreeB/>
              <span>3BR+</span>
            </button>
            <button type="button" className={bedrooms === 'overall-average' ? 'button-active' : 'button-inactive'} onClick={() => setBedrooms('overall-average')}>
              <Overall/>
              <span>Overall</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bar-chart-content">
        <div className="line-chart-label">
          <span>Price</span>
        </div>
        <svg className="bar-svg" width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* <text className="line-chart-label" transform={`rotate(270deg)`} x={-210} y={-25}>No of buses</text> */}
            <line x1={0} y1={1} x2={0} y2={innerHeight} stroke="white" />
            
            {yScale.ticks().map((tickValue, i) => (
              <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                {i === 0 ? (<line x1={0} y1={0} x2={innerWidth} y2={0} stroke="white" />) : (<></>)/*  */}
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
              <g className="bar-element">
                <rect
                  style={{fill: getColor(i)}}
                  key={d.district}
                  x={xScale(d.district)}
                  y={yScale(d[bedrooms])}
                  width={55}
                  height={innerHeight - yScale(d[bedrooms])}
                />
                <text
                  x={xScale(d.district)+5}
                  y={yScale(d[bedrooms])-10}
                >
                  {`\$${d[bedrooms]}`}
                </text>
              </g>
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
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  seekLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};
