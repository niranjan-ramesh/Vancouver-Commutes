import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loaderContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    color: '#004261',
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <CircularProgress className={classes.loader} disableShrink />
    </div>
  );
}
