import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import CustomSelect from "./customSelect";
import i18n from "../../../utils/i18n";
import style from "../style.css";
import {
  validateLeasingAddress,
  clearState,
  startNewLeasing,
  setLeasingLoading,
  getLeasingInfo
} from "../redux/leasingAction";
import { errorInput } from "../../errors/redux/errorAction";
import { convertSmallerCoinUnit } from "../../../utils/numbers";

class StartLeasing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 0,
      toAddress: ""
    };
  }

  handleAmountValue = value => {
    if (!value) value = 0;
    value = parseFloat(value);
    this.setState({ amountValue: value });
  };

  handleAddress = toAddress => {
    this.setState({ toAddress });
  };

  percentageCalculation = value => {
    let { balance, decimalPoint } = this.props;

    let amount = parseFloat(balance);
    let result = (value / 100) * amount;
    this.handleAmountValue(result.toFixed(decimalPoint));
  };

  handleStartLeasing = () => {
    let {
      validateLeasingAddress,
      coins,
      feeValue,
      balance,
      errorInput
    } = this.props;
    let { amountValue, toAddress } = this.state;
    let isGreatherThenBalance = amountValue + feeValue.low <= balance;

    if (!amountValue || amountValue === 0) {
      errorInput(i18n.t("LEASING_NOT_INFORMED_FIELD"));
      return;
    }

    if (!toAddress) {
      errorInput(i18n.t("LEASING_NOT_INFORMED_FIELD"));
      return;
    }

    if (!isGreatherThenBalance) {
      errorInput(i18n.t("BALANCE_ERROR_AMOUNT"));
      return;
    }

    validateLeasingAddress(coins.lunes.abbreviation, toAddress);

    return;
  };

  createLeasing = () => {
    let { toAddress, amountValue } = this.state;
    let {
      clearState,
      startNewLeasing,
      feeValue,
      user,
      coinAddress,
      decimalPoint,
      close,
      coins,
      setLeasingLoading,
      getLeasingInfo
    } = this.props;

    let leasingData = {
      toAddress,
      amount: convertSmallerCoinUnit(amountValue, decimalPoint),
      feeValue: convertSmallerCoinUnit(feeValue, decimalPoint),
      password: user.password,
      coinName: coins.lunes.abbreviation,
      coinAddress
    };

    clearState();
    startNewLeasing(leasingData);
    close();
    setLeasingLoading(true);
    getLeasingInfo(leasingData.coinName, coinAddress, decimalPoint);
  };

  render() {
    let { amountValue, toAddress } = this.state;
    let { balance, feeValue, addressIsValid } = this.props;
    {
      addressIsValid ? this.createLeasing() : null;
    }

    return (
      <div
        className={style.baseStep}
        style={{
          textAlign: "right",
          alignSelf: "flex-end",
          padding: 16,
          color: "#fff"
        }}
      >
        <div className={style.boxLine}>
          <div>{i18n.t("LEASING_BALANCE")}</div>
          <div style={{ fontSize: "26px" }}>{balance}</div>
        </div>

        <div className={style.boxLine}>
          <div>{i18n.t("LEASING_AMOUNT_LABEL")}</div>
          <input
            className={style.txtamount}
            type="number"
            name="txtamount"
            placeholder="0"
            onChange={event => this.handleAmountValue(event.target.value)}
            value={amountValue}
          />
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.percentageCalculation(25)}
          >
            25%
          </span>
          <span
            className={style.greenLabelFee}
            onClick={() => this.percentageCalculation(50)}
          >
            50%
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.percentageCalculation(75)}
          >
            75%
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.percentageCalculation(100)}
          >
            100%
          </span>
        </div>

        <CustomSelect handleAddress={this.handleAddress} />

        <input
          type="text"
          name="txtaddress"
          placeholder={i18n.t("PLACEHOLDER_EX_ADDRESS")}
          onChange={event => this.handleAddress(event.target.value)}
          value={toAddress}
          className={style.inputClear}
        />

        <div className={style.titleFee}>{i18n.t("LEASING_FEE")}</div>
        <div className={style.feeVal}>{feeValue.low}</div>

        <div className={style.labelHelp}>{i18n.t("LEASING_HELP_TEXT")}</div>
        <button
          className={style.btContinue}
          onClick={() => this.handleStartLeasing()}
        >
          {i18n.t("LEASING_BT_START")}
        </button>
      </div>
    );
  }
}

StartLeasing.propTypes = {
  coins: PropTypes.array.isRequired,
  feeValue: PropTypes.object,
  balance: PropTypes.number,
  decimalPoint: PropTypes.number,
  errorInput: PropTypes.func,
  validateLeasingAddress: PropTypes.func,
  addressIsValid: PropTypes.bool,
  clearState: PropTypes.func,
  startNewLeasing: PropTypes.func,
  user: PropTypes.object,
  coinAddress: PropTypes.string,
  close: PropTypes.func,
  getLeasingInfo: PropTypes.func,
  setLeasingLoading: PropTypes.func
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins,
  feeValue: store.leasing.coinFee,
  balance: store.skeleton.coins.lunes.balance.available,
  decimalPoint: store.skeleton.coins.lunes.decimalPoint,
  addressIsValid: store.leasing.addressIsValid,
  user: store.user.user,
  coinAddress: store.skeleton.coins.lunes.address
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      validateLeasingAddress,
      errorInput,
      clearState,
      startNewLeasing,
      getLeasingInfo,
      setLeasingLoading
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(StartLeasing);
