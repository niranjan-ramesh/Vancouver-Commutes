import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '0.9rem',
    color: '#53565a',
  },
}));

const CooperColorCheckbox = withStyles({
  root: {
    color: '#009fc7',
    '&$checked': {
      color: '#009fc7',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />); // eslint-disable-line

export default function CustomCheckbox({ checked, setChecked, label }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        classes={{ label: classes.label }}
        control={(
          <CooperColorCheckbox
            checked={checked}
            onChange={handleChange}
            value="secondary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        )}
        label={label}
      />
    </div>
  );
}

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  setChecked: PropTypes.func.isRequired,
};
