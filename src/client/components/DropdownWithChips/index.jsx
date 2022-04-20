import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CustomTextField from 'components/CustomTextField';
import CustomChip from 'components/CustomChip';
import CustomListItem from 'components/List/CustomListItem';
import './index.scss';

class DropdownWithChips extends PureComponent {
  constructor() {
    super();
    this.state = {
      showDropDown: false,
    };
    this.showDrop = this.showDrop.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const { showDropDown } = this.state;
      if (showDropDown) {
        this.showDrop(false);
      }
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  chips() {
    const { chips, getChips } = this.props;
    return (
      chips.map((chip) => {
        if (chip.isDelete === undefined) {
          return (
            <CustomChip
              key={chip}
              label={chip}
              onDelete={() => {
                const list = chips.filter((c) => c !== chip);
                getChips(list);
              }}
            />
          );
        }
        return (
          <CustomChip
            key={chip}
            label={chip}
            onDelete={() => {
              const list = chips.filter((c) => c !== chip);
              getChips(list);
            }}
            isDelete={chip}
          />
        );
      })
    );
  }

  dropDown() {
    const {
      dropDownList, chips, getChips, getText, text,
    } = this.props;
    const dropDown = dropDownList
      .filter((item) => !chips.includes(item))
      .filter((item) => item.includes(text));
    if (dropDownList && dropDownList.length === 0) { return (<></>); }
    return (
      <div className="DropDown">
        {dropDown.map((item) => (
          <CustomListItem
            key={item}
            label={item}
            onClick={() => {
              let list = chips
              if(chips.length < 4) {
                list = [...chips, item];
              }
              getChips(list);
              this.showDrop(false);
              getText('');
            }}
          />
        ))}
      </div>
    );
  }

  showDrop(bool) {
    this.setState({
      showDropDown: bool,
    });
  }

  render() {
    const { showDropDown } = this.state;
    const {
      getText, text, label, tooltipText, placeholder
    } = this.props;
    return (
      <div
        className="ChipsAndInputHolder"
        ref={this.setWrapperRef}
      >
        <div
          className="DropdownInputContainer"
          onFocus={() => this.showDrop(true)}
        >
          <CustomTextField
            label={label}
            required
            placeholder={placeholder}
            onChange={(event) => getText(event.target.value)}
            value={text}
            tooltipText={tooltipText}
          />
          {showDropDown && this.dropDown()}
        </div>
        <div className="ChipContainer">{this.chips()}</div>
      </div>
    );
  }
}

export default DropdownWithChips;

DropdownWithChips.defaultProps = {
  chips: [],
  getChips: () => {},
  tooltipText: '',
};

DropdownWithChips.propTypes = {
  dropDownList: PropTypes.arrayOf(PropTypes.string).isRequired,
  getText: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  chips: PropTypes.arrayOf(PropTypes.string),
  getChips: PropTypes.func,
  tooltipText: PropTypes.string,
};
