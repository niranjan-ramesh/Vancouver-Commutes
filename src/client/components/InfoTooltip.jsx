import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

export default function InfoTooltip({ title }) {
  return (
    <Tooltip title={title} placement="bottom-end" arrow>
      <InfoIcon className="icon" fontSize="small" htmlColor="#FFFFFF40" />
    </Tooltip>
  );
}

InfoTooltip.propTypes = {
  title: PropTypes.string.isRequired,
};
