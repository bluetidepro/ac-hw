import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { TOTAL_FUND_GOAL } from 'util/constants';
import { FORMAT_CURRENCY } from 'util/formatters';
import './CardBody.css';

class CardBody extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		donors: PropTypes.number.isRequired,
		goalReached: PropTypes.bool.isRequired
	};

	render() {
		const { donors, goalReached, children } = this.props;
		return (
			<div className="CardBody">
				{!goalReached && (
					<h1>Only four days left to fund this project</h1>
				)}
				{goalReached && (
					<h1>
						We've met our goal of $
						{FORMAT_CURRENCY(TOTAL_FUND_GOAL)}, but you still have
						four days left to contribute even more!
					</h1>
				)}
				{donors > 0 && (
					<p>
						Join the <strong>{donors}</strong> other{' '}
						{pluralize('donor', donors)} who have already supported
						this project.
					</p>
				)}
				{donors === 0 && (
					<p>Welcome! Be the first donor to support this project!</p>
				)}
				{children}
			</div>
		);
	}
}

export default CardBody;
