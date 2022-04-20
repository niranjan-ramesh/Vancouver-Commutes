import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

const CustomList = ({ children }) => (
  <List button>
    {children}
  </List>
);

export default CustomList;

CustomList.propTypes = {
  children: PropTypes.element.isRequired,
};
