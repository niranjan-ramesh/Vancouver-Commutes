import React, {useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import Data from 'constants/boxplots.json';

const BoxChart = ({ seekLocations }) => {

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
    chart: {
      type: 'boxPlot',
      height: 350
    },
    title: {
      text: 'Basic BoxPlot Chart',
      align: 'left'
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#5C4742',
          lower: '#A5978B'
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
