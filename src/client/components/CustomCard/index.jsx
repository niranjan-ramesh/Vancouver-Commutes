import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function CustomCard({ CardContent }) {
  return (
    <div className="custom-card">
      {CardContent}
    </div>
  );
}

CustomCard.propTypes = {
  CardContent: PropTypes.element.isRequired,
};
