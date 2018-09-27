import React, { Component, Fragment } from 'react';
import './DemoText.css';

class DemoText extends Component {
  componentDidMount() {
    // This is just for the demo to clear your local storage with CTRL + Z
    document.addEventListener('keydown', this._clearLocalStorage, false);
  }

  componentWillUnmount() {
    // This is just for the demo to clear your local storage with CTRL + Z
    document.removeEventListener('keydown', this._clearLocalStorage, false);
  }

  // This is just for the demo to clear your local storage with CTRL + Z
  _clearLocalStorage(e) {
    if (e.ctrlKey && e.keyCode === 90) {
      localStorage.clear();
      window.location.reload(true);
    }
  }

  render() {
    return (
      <Fragment>
        <p className="DemoText">
          For demo purposes, press <kbd>CTRL+Z</kbd> to clear localStorage
        </p>
        <p className="DemoText">
          <a
            href="http://iamzachreed.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zach Reed
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/bluetidepro/ac-hw"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Github Repo
          </a>
        </p>
      </Fragment>
    );
  }
}

export default DemoText;
