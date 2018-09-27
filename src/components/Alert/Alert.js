import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Alert.css';

const leftArrow = arrowLeftPosition => {
  let specialArrowPosition;
  if (arrowLeftPosition <= 4) {
    specialArrowPosition = '_hasSpecialArrowStart';
  } else if (arrowLeftPosition >= 95) {
    specialArrowPosition = '_hasSpecialArrowEnd';
  }
  if (arrowLeftPosition >= 100) {
    arrowLeftPosition = 100;
  }
  return {
    position: arrowLeftPosition,
    specialArrowPosition
  };
};

const Alert = ({ arrowLeftPosition, hasArrow, isError, text }) => {
  const arrow = leftArrow(arrowLeftPosition);
  const classes = classNames('Alert', arrow.specialArrowPosition, {
    _hasArrow: hasArrow,
    _error: isError
  });
  return (
    <div
      className={classes}
      style={{ '--alertAfterLeft': arrow.position + '%' }}
    >
      {isError && <strong>Error:</strong>} {text}
    </div>
  );
};

Alert.propTypes = {
  arrowLeftPosition: PropTypes.number,
  hasArrow: PropTypes.bool,
  isError: PropTypes.bool,
  text: PropTypes.node.isRequired
};

Alert.defaultProps = {
  arrowLeftPosition: 0,
  hasArrow: true,
  isError: false
};

export default Alert;
