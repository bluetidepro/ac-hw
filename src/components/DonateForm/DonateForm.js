import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';
import classNames from 'classnames';
import './DonateForm.css';

class DonateForm extends Component {
  constructor(props) {
    super(props);
    this.DonateFormInput = React.createRef();
    this.state = {
      fund: props.fund,
      inputIsFocused: props.inputIsFocused
    };
  }

  static propTypes = {
    fund: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    inputIsFocused: PropTypes.bool.isRequired,
    validationError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
      .isRequired
  };

  _resetInput(fundValue) {
    this.setState({ fund: fundValue });
  }

  _handleSubmit = e => {
    e.preventDefault();
    // Re-focus on the input
    this.DonateFormInput.current.focus();
    this.props.handleSubmit(this.state.fund);
  };

  _handleInputChange = e => {
    this.setState({ fund: e.target.value });
  };

  _handleOnBlur = () => {
    this.setState({ inputIsFocused: false });
  };

  _handleOnFocus = () => {
    this.setState({ inputIsFocused: true });
  };

  render() {
    const { fund, inputIsFocused } = this.state;
    const { placeholder, validationError } = this.props;

    return (
      <React.Fragment>
        <form
          className={classNames('Form', {
            _isFocused: inputIsFocused
          })}
          onSubmit={this._handleSubmit}
        >
          <label htmlFor="DonationAmount" className="InputPrepend">
            <span>$</span>
          </label>
          <input
            aria-label="Donation Amount"
            autoFocus={true}
            className="Input"
            id="DonationAmount"
            onBlur={this._handleOnBlur}
            onChange={this._handleInputChange}
            onFocus={this._handleOnFocus}
            placeholder={placeholder}
            ref={this.DonateFormInput}
            step="0.25"
            type="number"
            value={fund}
          />
          <div className="InputAppend">
            <button className="Button" type="submit">
              Give Now
            </button>
          </div>
        </form>
        {validationError && (
          <Alert isError hasArrow={false} text={validationError} />
        )}
      </React.Fragment>
    );
  }
}

export default DonateForm;
