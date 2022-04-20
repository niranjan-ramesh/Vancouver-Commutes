import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import CustomListWithHeader from 'components/CustomListWithHeader';
import './index.scss';

class DropDownWithTitle extends PureComponent {
  constructor() {
    super();
    this.state = { showDropdown: false };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, { passive: true });
  }

  handleClickOutside(event) {
    const { showDropdown } = this.state;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (showDropdown) {
        this.setState({
          showDropdown: false,
        });
      }
    }
  }

  handleDropdownToggle() {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  render() {
    const { showDropdown } = this.state;
    const {
      label, options, disabled, header,
    } = this.props;
    return (
      // <>
      <div className="custom-select-container" ref={this.setWrapperRef}>
        <div className="drop-down-label" onClick={() => { this.handleDropdownToggle(); }}>
          <span>{label}</span>
          <ArrowDropDown />
        </div>
        {showDropdown
          && (
          <div className="drop-down-container">
            <CustomListWithHeader
              options={options}
              disabled={disabled}
              showDropdown={showDropdown}
              header={header}
              onClick={this.handleDropdownToggle}
            />
          </div>
          )}
      </div>
    );
  }
}

export default DropDownWithTitle;

DropDownWithTitle.defaultProps = {
  disabled: false,
  label: '',
};

DropDownWithTitle.propTypes = {
  header: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
