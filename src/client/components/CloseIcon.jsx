import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  button: {
    margin: '0.25rem',
  },
  input: {
    display: 'none',
  },
}));

const CloseIcon = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} size="small" onClick={handleClick}>
      <Clear fontSize="small" />
    </IconButton>
  );
};
export default CloseIcon;

CloseIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
