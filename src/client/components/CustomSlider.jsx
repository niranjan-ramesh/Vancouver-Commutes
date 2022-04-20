import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}


const CustomSlider = ({
  lowerRange, upperRange, label,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([lowerRange, upperRange]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
  ];

  return (
    <div className={classes.root}>
      <div>{label}</div>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        marks={marks}
      />
    </div>
  );
};

export default CustomSlider;

CustomSlider.defaultProps = {
  label: 'Offset Range',
  lowerRange: 0,
  upperRange: 100,
};

CustomSlider.propTypes = {
  label: PropTypes.string,
  lowerRange: PropTypes.number,
  upperRange: PropTypes.number,
};
