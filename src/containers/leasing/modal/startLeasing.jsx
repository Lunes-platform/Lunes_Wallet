import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  validateLeasingAddress,
  clearState,
  startNewLeasing,
  setLeasingModalLoading
} from "../redux/leasingAction";
import { errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import CustomSelect from "./customSelect";
import Loading from "../../../components/loading";

// UTILS
import i18n from "../../../utils/i18n";
import { convertSmallerCoinUnit } from "../../../utils/numbers";

// STYLE
import style from "../style.css";

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

  createLeasing = () => {
    let { toAddress, amountValue } = this.state;
    let {
      clearState,
      errorInput,
      setLeasingModalLoading,
      startNewLeasing,
      leasing,
      user,
      coinAddress,
      decimalPoint,
      balance,
      coins
    } = this.props;

    let leasingData = {
      toAddress: toAddress,
      amount: convertSmallerCoinUnit(amountValue, decimalPoint),
      feeValue: convertSmallerCoinUnit(leasing.coinFee, decimalPoint),
      password: user.password,
      coinName: coins.lunes.abbreviation,
      coinAddress: coinAddress
    };

    let validateBalance = amountValue + leasing.coinFee.low <= balance;

    if (!amountValue || amountValue === 0) {
      errorInput(i18n.t("LEASING_NOT_INFORMED_FIELD"));
      return;
    }

    if (!toAddress) {
      errorInput(i18n.t("LEASING_NOT_INFORMED_FIELD"));
      return;
    }

    if (!validateBalance) {
      errorInput(i18n.t("BALANCE_ERROR_AMOUNT"));
      return;
    }

    clearState();
    setLeasingModalLoading(true);
    startNewLeasing(leasingData);
  };

  renderSelect = () => {
    let { coins } = this.props;

    return Object.keys(coins).map(
      (coin, index) => (
        (coin = coins[coin]),
        (
          <div key={index} onClick={this.selectItem}>
            <div>
              <img src={"images/icons/coins/" + coin.abbreviation + ".png"} />
              {coin.abbreviation}
            </div>
          </div>
        )
      )
    );
  };

  render() {
    let { amountValue, toAddress } = this.state;
    let { balance, leasing } = this.props;

    return (
      <div className={style.baseStep}>
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
        <div className={style.feeVal}>{leasing.coinFee.low}</div>

        <div className={style.labelHelp}>{i18n.t("LEASING_HELP_TEXT")}</div>
        <button
          className={
            leasing.reload ? style.btContinueDisabled : style.btContinue
          }
          onClick={() => this.createLeasing()}
          disabled={leasing.reload ? true : false}
        >
          {leasing.modalLoading ? (
            <Loading />
          ) : leasing.reload ? (
            i18n.t("MODAL_LEASING_MESSAGE_SUCCESS")
          ) : (
            i18n.t("LEASING_BT_START")
          )}
        </button>
      </div>
    );
  }
}

StartLeasing.propTypes = {
  coins: PropTypes.array.isRequired,
  leasing: PropTypes.object,
  balance: PropTypes.number,
  decimalPoint: PropTypes.number,
  errorInput: PropTypes.func,
  validateLeasingAddress: PropTypes.func,
  clearState: PropTypes.func,
  startNewLeasing: PropTypes.func,
  user: PropTypes.object,
  coinAddress: PropTypes.string,
  close: PropTypes.func,
  setLeasingModalLoading: PropTypes.func
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins,
  leasing: store.leasing,
  balance: store.skeleton.coins.lunes.balance.available,
  decimalPoint: store.skeleton.coins.lunes.decimalPoint,
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
      setLeasingModalLoading
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(StartLeasing);
