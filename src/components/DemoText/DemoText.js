import React, { Component } from 'react';
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
			<p className="DemoText">
				For demo purposes, press <kbd>CTRL+Z</kbd> to clear localStorage
			</p>
		);
	}
}

export default DemoText;
