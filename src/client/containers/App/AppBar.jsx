import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#FFFFFF',
    color: '#1E1E2F',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
  },
  search: {
    width: '20rem',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  logo: {
    width: '14rem',
  },
}));

const PrimarySearchAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" noWrap>
          VANCOUVER ZONES - DASHBOARD
        </Typography>
        <div className={classes.grow} />

        <div className={classes.grow} />
        <div>
          <Typography variant="subtitle1" noWrap>
            <a href="https://github.com/niranjan-ramesh/Vancouver-Commutes" style={{ textDecoration: 'none', color: '#1E1E2F' }}>View on GitHub</a>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default PrimarySearchAppBar;
