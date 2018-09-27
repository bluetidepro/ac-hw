import React, { Component } from 'react';
import Alert from 'components/Alert';
import CardBody from 'components/CardBody';
import Confetti from 'components/Confetti';
import DemoText from 'components/DemoText';
import DonateForm from 'components/DonateForm';
import Progress from 'components/Progress';
import {
  DEFAULT_DONOR_AMOUNT,
  DEFAULT_FUND_AMOUNT,
  DEFAULT_FUNDED_AMOUNT,
  ERRORS,
  LOWEST_FUND_AMOUNT,
  TOTAL_FUND_GOAL
} from 'util/constants';
import { FORMAT_CURRENCY, ROUND_TO_TWO } from 'util/formatters';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.fundAmountInput = React.createRef();
    this.confetti = React.createRef();

    // If there is a state stored in localStorage, lets use that
    if (localStorage.state) {
      this.state = JSON.parse(localStorage.getItem('state'));
    } else {
      this.state = {
        donors: DEFAULT_DONOR_AMOUNT,
        fund: DEFAULT_FUND_AMOUNT,
        fundedAmount: DEFAULT_FUNDED_AMOUNT,
        goalReached: false,
        inputIsFocused: false,
        validationError: false
      };
    }
  }

  componentDidUpdate() {
    localStorage.state = JSON.stringify(this.state);
    if (!this.state.goalReached && this.state.fundedAmount >= TOTAL_FUND_GOAL) {
      this.confetti.current._confettiTimer();
      this.setState({
        goalReached: true
      });
    }
  }

  _getAmountLeftText = () => {
    const { fundedAmount, goalReached } = this.state;
    const amountLeft = TOTAL_FUND_GOAL - fundedAmount;
    if (goalReached) {
      return (
        <span>
          <strong>Project successfully funded!</strong> Thank you for your
          donation!{' '}
          {amountLeft !== 0 && (
            <strong>
              <sup>$</sup>
              {FORMAT_CURRENCY(Math.abs(amountLeft))} over our goal!
            </strong>
          )}
        </span>
      );
    } else {
      return (
        <span>
          <strong>
            <sup>$</sup>
            {FORMAT_CURRENCY(amountLeft)}
          </strong>{' '}
          still needed to fund this project.
        </span>
      );
    }
  };

  _handleSubmit = fundAmountVal => {
    clearTimeout(this.confetti.current.confettiTimerID);

    // Make sure the input has a number and/or isn't blank
    if (isNaN(fundAmountVal) || fundAmountVal === '') {
      this.setState(
        {
          validationError: ERRORS.NAN
        },
        () => {
          this.fundAmountInput.current._resetInput(DEFAULT_FUND_AMOUNT);
        }
      );

      // Biz rule: Donation must be at least $5
    } else if (fundAmountVal < LOWEST_FUND_AMOUNT) {
      this.setState(
        {
          validationError: ERRORS.INSUFFICIENT
        },
        () => {
          this.fundAmountInput.current._resetInput(LOWEST_FUND_AMOUNT);
        }
      );

      // Everything checks out
    } else {
      this.confetti.current._shootConfettiBurst();
      this.setState(
        prevState => ({
          donors: prevState.donors + 1,
          fundedAmount: prevState.fundedAmount + parseFloat(fundAmountVal),
          validationError: false
        }),
        () => {
          this.fundAmountInput.current._resetInput(ROUND_TO_TWO(fundAmountVal));
        }
      );
    }

    // Re-focus on the input
    this.fundAmountInput.current.DonateFormInput.current.focus();
  };

  render() {
    const {
      donors,
      fund,
      fundedAmount,
      goalReached,
      inputIsFocused,
      validationError
    } = this.state;
    return (
      <div className="App">
        <Alert
          text={this._getAmountLeftText()}
          arrowLeftPosition={(fundedAmount / TOTAL_FUND_GOAL) * 100}
        />
        <div className="Card">
          <Progress max={TOTAL_FUND_GOAL} fundedAmount={fundedAmount} />
          <CardBody donors={donors} goalReached={goalReached}>
            <DonateForm
              fund={ROUND_TO_TWO(fund)}
              handleSubmit={this._handleSubmit}
              inputIsFocused={inputIsFocused}
              placeholder={DEFAULT_FUND_AMOUNT}
              ref={this.fundAmountInput}
              validationError={validationError}
            />
          </CardBody>
        </div>
        <DemoText />
        <Confetti goalReached={goalReached} ref={this.confetti} />
      </div>
    );
  }
}

export default App;
