import PropTypes from 'prop-types';
import React from 'react';
import './Progress.css';

const Progress = ({ fundedAmount, max }) => (
  <div className="Progress">
    <progress max={max} value={fundedAmount} />
  </div>
);

Progress.propTypes = {
  fundedAmount: PropTypes.number,
  max: PropTypes.number.isRequired
};

Progress.defaultProps = {
  fundedAmount: 0
};

export default Progress;
