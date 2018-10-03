import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmRecharge } from "../redux/rechargeAction";
import { errorInput } from "../../errors/redux/errorAction";

// UTILS
import { encryptHmacSha512Key } from "../../../utils/cryptography";
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import ButtonContinue from "../../../components/buttonContinue";

class SecureRecharge extends React.Component {
  constructor() {
    super();
    this.state = {
      password: ""
    };
  }

  setPassword = password => {
    this.setState({ ...this.state, password });
  };

  confirmPassword = () => {
    let { password } = this.state;
    let { user, errorInput, recharge, coins, confirmRecharge } = this.props;

    const coin = recharge.coin.abbreviation;

    const payload = {
      coin:           coin,
      fromAddress:    coins[coin].address,
      toAddress:      recharge.coin.address,
      amount:         recharge.amount,
      fee:            recharge.fee.fee.fee,
      feePerByte:     recharge.fee.fee.feePerByte,
      feeLunes:       recharge.fee.fee.feeLunes,
      price:          coins[coin].price,
      decimalPoint:   coins[coin].decimalPoint,
      user:           user.password,
      recharge:       recharge,
    }

    if (user.password === encryptHmacSha512Key(password)) {
      confirmRecharge(payload);
      return;
    }

    errorInput(i18n.t("MESSAGE_INVALID_PASSWORD"));
    return;
  };

  render() {
    let { password } = this.state;
    let { recharge, loading } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("RECHARGE_PASS_CONFIRMATION")}</span>
          <span className={style.totalConfirm}>
            {' '} {recharge.amount + recharge.fee.fee.fee} {recharge.coin.abbreviation.toUpperCase()}
          </span>
          <span> {i18n.t("RECHARGE_PASS_TO")} </span>
          <span className={style.addressConfirm}>
            {i18n.t("RECHARGE_TITLE")}
          </span>
        </div>

        <div className={style.confirmFee}>
          <input
            type="password"
            name="txtpass"
            placeholder="*********"
            onChange={event => this.setPassword(event.target.value)}
            value={password}
            className={style.inputTextDefault}
          />
        </div>

        <ButtonContinue
          label={i18n.t("BTN_CONFIRM")}
          action={()=>this.confirmPassword()}
          loading={loading}
        />
      </div>
    );
  }
}

SecureRecharge.propTypes = {
  recharge:     PropTypes.object.isRequired,
  loading:      PropTypes.bool.isRequired,
  user:         PropTypes.object.isRequired,
  errorInput:   PropTypes.func.isRequired,
  confirmRecharge:   PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  recharge:   store.recharge.recharge,
  loading:    store.recharge.loading,
  user:       store.user.user,
  coins:      store.skeleton.coins,
});


const mapDispatchToProps = dispatch => bindActionCreators(
  {
    confirmRecharge,
    errorInput,
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecureRecharge);
