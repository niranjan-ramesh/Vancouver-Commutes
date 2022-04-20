import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  text: {
    fontSize: '0.8rem !important',
  },
}));

const CustomListItem = ({ label, onClick }) => {
  const classes = useStyles();
  return (
    <ListItem button>
      <ListItemText
        secondary={(
          <Typography
            component="span"
            variant="body2"
            className={classes.text}
            color="textPrimary"
          >
            {label}
          </Typography>
        )}
        onClick={onClick}
      />
      <Divider />
    </ListItem>
  );
};

export default CustomListItem;

CustomListItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
