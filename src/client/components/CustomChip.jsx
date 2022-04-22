import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Location from 'images/Location.svg';

const CustomChip = ({
  label, onDelete, isDelete, icon,
}) => {
  if (isDelete) {
    return (
      <Chip
        icon={icon}
        label={label}
        onDelete={onDelete}
      />
    );
  }
  return (
    <Chip
      icon={icon}
      label={label}
    />
  );
};

export default CustomChip;

CustomChip.defaultProps = {
  icon: <Location />,
  isDelete: true,
};

CustomChip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  icon: PropTypes.element,
  isDelete: PropTypes.bool,
};
