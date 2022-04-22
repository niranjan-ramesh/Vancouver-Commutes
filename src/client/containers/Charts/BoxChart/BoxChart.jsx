import React, {useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import Data from 'constants/boxplots.json';

const BoxChart = ({ seekLocations }) => {

  if (seekLocations.length === 0) return <></>;
  const filteredData = Data.filter((item) => seekLocations.includes(item.district));
  const seriesData = filteredData.map((item) => ({
    x: item.district,
    y: [item.min, item.q1, item.q2, item.q3, item.max]
  }));

  const [series, setSeries] = useState([
    {
      type: 'boxPlot',
      data: seriesData
    }
  ]);

  useEffect(() => {
    console.log(seekLocations)
    const filteredData = Data.filter((item) => seekLocations.includes(item.district));
    const seriesData = filteredData.map((item) => ({
      x: item.district,
      y: [item.min, item.q1, item.q2, item.q3, item.max]
    }));
    setSeries([
      {
        type: 'boxPlot',
        data: seriesData
      }
    ]);
  }, [seekLocations]);
    
  const options= {
    yaxis: {
      decimalsInFloat: 0,
      title: {
        text: 'Selling Price of house in Million CAD',
        rotate: -90
      }
    },
    chart: {
      type: 'boxPlot',
      height: 350
    },
    title: {
      text: '',
      align: 'left'
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#FF9F0A',
          lower: '#FFD799'
        }
      }
    }
  }
  
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="boxPlot" height={350} />
    </div>)
};

export default BoxChart;
