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

const getColor = (i) => {
  const colors = ['#FF9F0A',
  '#BF5AF2',
  '#FF2D55',
  '#64FFB5'];
  return colors[i];
};


const LineChart = ({ workLocation, seekLocations }) => {
  if (seekLocations.length === 0) return <></>;

  const [locationColours, setLocationColours] = useState([]);
  useEffect(() => {
    console.log(seekLocations)
    setLocationColours(seekLocations.map((item, i) => ({ name: item, color: getColor(i) })));
  }, [seekLocations]);

  // const width = window.innerWidth - 80;
  // const height = window.innerHeight - 100;
  const width = 1279;
  const height = 450;

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

  const yAxisTicks = yScale.ticks()
    .filter(tick => Number.isInteger(tick));

  return (
    <div className="line-chart-container">
      <div className="line-chart-heading">
        <span className="title">Transit Frequency</span>
        <span className="description">Find out the frequency of transit busses for your selected locations</span>
      </div>
      <svg className="line-chart" width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <line x1={0} y1={1} x2={0} y2={innerHeight} stroke="white" />
          {/* <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="white" /> */}
          <text className="line-chart-label" x={-210} y={-25}>No of buses</text>
          {yAxisTicks.map((tickValue, i) => (
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

          {dataArray.map((item) => {
            const { destination, frequency } = item;
            const locationColour = locationColours.filter((i) => i.name === destination)[0];
            const color = locationColour ? locationColour.color : '';
            return <path key={destination} style={{ stroke: color }} d={lineGenerator(frequency)} transform={`translate(${xScale.bandwidth() / 2}, 0)`} />;
          })}
          {/* <line x1={0} y1={1} y2={1} x2={innerWidth} /> */}
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
