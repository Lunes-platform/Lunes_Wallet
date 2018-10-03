import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setModalStep,
  getFeeRecharge,
  setFeeRecharge
} from "../redux/rechargeAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

//COMPONENTS
import ButtonContinue from "../../../components/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";

//UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

class FeeRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeSelect: 0,
      error: undefined,
      messageError: ""
    };
  }

  calcFee(set) {
    const { setFeeRecharge, fee } = this.props;

    let feeValue = 0;
    let feePerByte = 0;
    let feeLunes = 0;

    switch (set) {
      case "low":
        feeValue = fee.fee.low;
        feePerByte = fee.feePerByte.low;
        feeLunes = fee.feeLunes.low;
        break;
      case "medium":
        feeValue = fee.fee.medium;
        feePerByte = fee.feePerByte.medium;
        feeLunes = fee.feeLunes.medium;
        break;
      case "high":
        feeValue = fee.fee.high;
        feePerByte = fee.feePerByte.high;
        feeLunes = fee.feeLunes.high;
        break;
    }

    this.setState({ feeSelect: feeValue });

    const payload = {
      fee: feeValue,
      feePerByte: feePerByte,
      feeLunes: feeLunes
    };

    setFeeRecharge(payload);
  }
  validateForm = () => {
    const { setModalStep, errorInput, clearMessage } = this.props;
    const { feeSelect } = this.state;

    if (feeSelect > 0) {
      setModalStep(3);
    } else {
      errorInput(i18n.t("MESSAGE_SELECT_FEE"));
      return;
    }
    clearMessage();
  };

  componentDidMount = () => {
    const { getFeeRecharge, recharge, wallet } = this.props;

    const fromAddress = wallet.coins[recharge.coin.abbreviation].address;
    const toAddress = recharge.coin.address;

    getFeeRecharge(
      recharge.coin.abbreviation,
      recharge.amount,
      fromAddress,
      toAddress
    );
  };

  render() {
    const { loading, recharge, fee } = this.props;
    const { error, messageError, feeSelect } = this.state;

    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <div>
            {error ? (
              <ModalBar type="error" message={messageError} timer />
            ) : null}
          </div>
          <img
            src={`/images/icons/coins/${recharge.coin.abbreviation}.png`}
            className={style.modalIconCoin}
          />
          <div>
            <span>{i18n.t("RECHARGE_FEE_TEXT_1")}</span>
            <span className={style.totalConfirm}>
              {recharge.amount} {recharge.coin.abbreviation.toUpperCase()}
            </span>
          </div>
          <div>
            <span>{i18n.t("RECHARGE_FEE_TEXT_2")}</span>
            <span className={style.addressConfirm}>
              {i18n.t("RECHARGE_TITLE")}
            </span>
          </div>

          <div className={style.confirmFee}>
            <div>
              {i18n.t("PAYMENT_FEE_AMOUNT")}
              <span> {recharge.coin.abbreviation} </span> é
            </div>
            <div className={style.txtamount}>{feeSelect}</div>
          </div>

          <div className={style.boxFee}>
            <span
              className={style.greenLabelFee}
              onClick={() => this.calcFee("low")}
            >
              {i18n.t("FEE_LOW")} {fee.fee.low}
            </span>
            <span
              className={style.yellowLabelFee}
              onClick={() => this.calcFee("medium")}
            >
              {i18n.t("FEE_MEDIUM")} {fee.fee.medium}
            </span>
            <span
              className={style.redLabelFee}
              onClick={() => this.calcFee("high")}
            >
              {i18n.t("FEE_HIGH")} {fee.fee.high}
            </span>
          </div>

          <ButtonContinue
            label={i18n.t("BTN_CONTINUE")}
            action={() => this.validateForm()}
            loading={loading}
          />
        </div>
      );
    }
  }
}

FeeRecharge.propTypes = {
  fee: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  wallet: PropTypes.object.isRequired,
  setModalStep: PropTypes.func,
  getFeeRecharge: PropTypes.func,
  setFeeRecharge: PropTypes.func,
  recharge: PropTypes.object.isRequired,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapStateToProps = store => ({
  fee: store.recharge.fee,
  loading: store.recharge.loading,
  wallet: store.skeleton,
  recharge: store.recharge.recharge
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      getFeeRecharge,
      setFeeRecharge,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeeRecharge);
