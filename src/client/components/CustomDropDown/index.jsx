import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MoreVert from '@material-ui/icons/MoreVert';
import './index.scss';

class CustomDropDown extends PureComponent {
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

  setWrapperRef(node) {
    this.wrapperRef = node;
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


  render() {
    const { showDropdown } = this.state;
    const {
      onSelect, setTopicForRequest, deleteTopicRequest,
    } = this.props;
    return (
      <div className="drop-down-box" ref={this.setWrapperRef}>
        <MoreVert onClick={() => { this.setState({ showDropdown: !showDropdown }); }} />
        {showDropdown && (
        <div className="custom-options">
          <button
            key="Update"
            className="custom-option"
            type="button"
            onClick={() => {
              this.setState({ showDropdown: false });
              onSelect();
              setTopicForRequest();
            }}
          >
            Update
          </button>
          <button
            key="Delete"
            className="custom-option"
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-alert
              if (window.confirm('Are you sure you want to delete this request?')) {
                this.setState({ showDropdown: false });
                deleteTopicRequest();
              }
            }}
          >
            Delete
          </button>
        </div>
        )}
      </div>
    );
  }
}

export default CustomDropDown;

CustomDropDown.defaultProps = {
//   label: '',
//   tooltipText: '',
};

CustomDropDown.propTypes = {
  deleteTopicRequest: PropTypes.func.isRequired,
  setTopicForRequest: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
