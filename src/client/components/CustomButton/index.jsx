import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const CustomButton = ({
  label, onClick, disabled, children,
}) => (
  <button type="button" className="custom-button" onClick={onClick} disabled={disabled}>
    {label || children}
  </button>
);

export default CustomButton;

CustomButton.defaultProps = {
  children: <></>,
  disabled: false,
  label: '',
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
