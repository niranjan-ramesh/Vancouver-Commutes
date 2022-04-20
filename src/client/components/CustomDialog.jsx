import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(() => ({
  content: {
    margin: '1rem 2rem',
    minWidth: '30rem',
    minHeight: '30rem',
  },
}));

const CustomDialog = ({
  handleClose, isDialogOpen, content, actions,
}) => {
  const classes = useStyles();
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={isDialogOpen}>
      <div className={classes.content}>{content}</div>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;

CustomDialog.defaultProps = {
  actions: <></>,
};

CustomDialog.propTypes = {
  content: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  actions: PropTypes.element,
};
