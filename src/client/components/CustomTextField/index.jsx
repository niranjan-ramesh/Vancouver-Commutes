import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltip from 'components/InfoTooltip';
import './index.scss';

const CustomTextField = ({
  label, value, multiline, onChange, onBlur, disabled, type, rows,
  placeholder, min, required, error, tooltipText,
}) => (
  <div className="custom-input-container">
    <div className="custom-label-container">
      <div>
        <span className="custom-label">{label}</span>
        {required && <span>*</span>}
      </div>
      {tooltipText && <InfoTooltip title={tooltipText} />}
    </div>
    {!multiline && (
      <input
        autoComplete="off"
        className="custom-input"
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={() => onBlur()}
        type={type}
        placeholder={placeholder}
        min={min}
        error={error}
      />
    )}
    {multiline && (
      <textarea
        autoComplete="off"
        className="custom-input"
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={() => onBlur()}
        rows={rows}
      />
    )}
    <span className="custom-error">{error}</span>
  </div>
);

export default CustomTextField;

CustomTextField.defaultProps = {
  disabled: false,
  error: '',
  label: '',
  min: 0,
  multiline: false,
  onBlur: () => {},
  placeholder: '',
  required: false,
  rows: '4',
  tooltipText: '',
  type: 'text',
};

CustomTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.number,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.string,
  tooltipText: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
};
