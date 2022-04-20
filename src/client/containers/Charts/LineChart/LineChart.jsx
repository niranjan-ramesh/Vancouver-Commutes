import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SampleData from 'constants/bus-frequency.json';
import {
  scaleLinear, max, line, scaleBand,
} from 'd3';

const xValue = (d) => d.time;
const yValue = (d) => d.buses;

const margin = {
  top: 40, right: 40, bottom: 60, left: 40,
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const LineChart = ({ workLocation, seekLocations }) => {
  if (seekLocations.length === 0) return <></>;

  const [locationColours, setLocationColours] = useState([]);
  useEffect(() => {
    console.log(seekLocations)
    setLocationColours(seekLocations.map((item) => ({ name: item, color: getRandomColor() })));
  }, [seekLocations]);

  const width = window.innerWidth - 80;
  const height = window.innerHeight;
  // const width = 1100;
  // const height = 600;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const dataArray = SampleData[workLocation]
    .filter((item) => seekLocations.includes(item.destination));
  const randomData = dataArray[0].frequency;

  const xScale = scaleBand()
    .range([0, innerWidth])
    .domain(randomData.map(xValue));

  const yScale = scaleLinear()
    .range([innerHeight, 0])
    .domain([0, max(randomData, yValue)]);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  return (
    <div className="line-chart-container">
      <div className="line-chart-heading">
        <span className="title">Transit Frequency</span>
        <span className="description">Find out the frequency of transit busses for your selected locations</span>
      </div>
      <svg className="line-chart" width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
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

          {dataArray.map((item) => {
            const { destination, frequency } = item;
            const locationColour = locationColours.filter((i) => i.name === destination)[0];
            const color = locationColour ? locationColour.color : '';
            return <path key={destination} style={{ stroke: color }} d={lineGenerator(frequency)} transform={`translate(${xScale.bandwidth() / 2}, 0)`} />;
          })}

          {xScale.domain().map((tickValue) => (
            <g key={tickValue} transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2}, 0)`}>
              {/* <line x1={0} y1={0} x2={0} y2={height} stroke="white" /> */}
              <text
                style={{ textAnchor: 'middle' }}
                y={innerHeight + 40}
                fill="white"
              >
                {tickValue}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div className="colour-hue">
        {locationColours.map((item) => {
          const { name, color } = item;
          return (
            <div key={name} className="colour-section">
              <div className="colour-info">
                <div className="colour" style={{ border: `10px solid ${color}` }} />
                <span>{name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LineChart;

LineChart.propTypes = {
  seekLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  workLocation: PropTypes.string.isRequired,
};
