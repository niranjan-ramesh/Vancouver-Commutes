import React from 'react';
import PropTypes from 'prop-types';
import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import './index.scss';

const CustomListWithHeader = ({
  options, header, onClick,
}) => (
  <div className="options-list">
    <button key={header} className="options-header" type="button">{header}</button>
    {options.map((option) => (
      <button
        key={option.value}
        className="options-item"
        type="button"
        onClick={() => {
          window.open(option.url);
          onClick();
        }}
      >
        {option.value}
        <OpenInNewOutlinedIcon className="redirect-icon" />
      </button>
    ))}
  </div>

);

export default CustomListWithHeader;

CustomListWithHeader.defaultProps = {
  onClick: () => {},
};

CustomListWithHeader.propTypes = {
  header: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  onClick: PropTypes.func,
};
