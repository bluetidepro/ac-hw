import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Confetti.css';

class Confetti extends Component {
  constructor(props) {
    super(props);
    this.confettiDiv = React.createRef();
  }

  static propTypes = {
    goalReached: PropTypes.bool.isRequired
  };

  _shootConfettiBurst = () => {
    // Only want to show confetti bursts on/off when the goal is not complete
    // It will always show when the goal is complete
    if (!this.props.goalReached) {
      this.confettiDiv.current.classList.add('_show');
      this.confettiTimerID = this._confettiTimer();
    }
  };

  _confettiTimer = () =>
    setTimeout(() => {
      this.confettiDiv.current.classList.remove('_show');
    }, 1500);

  render() {
    return (
      <div
        id="Confetti"
        ref={this.confettiDiv}
        style={{
          opacity: this.props.goalReached ? 1 : 0
        }}
      />
    );
  }
}

export default Confetti;
