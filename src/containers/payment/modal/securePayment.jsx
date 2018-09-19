import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmPay } from "../redux/paymentAction";
import { errorInput } from "../../errors/redux/errorAction";

// UTILS
import { encryptHmacSha512Key } from "../../../utils/cryptography";
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

class SecurePayment extends React.Component {
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
    let { user, errorInput, payment, coins, confirmPay } = this.props;

    const coin = payment.coin.abbreviation;
  
    const payload = {
      coin:           coin,
      fromAddress:    coins[coin].address,
      toAddress:      payment.coin.address,
      amount:         payment.amount,
      fee:            payment.fee.fee.fee,
      feePerByte:     payment.fee.fee.feePerByte,
      feeLunes:       payment.fee.fee.feeLunes,
      price:          coins[coin].price,
      decimalPoint:   coins[coin].decimalPoint, 
      user:           user.password, 
      payment:        payment,
    }

    if (user.password === encryptHmacSha512Key(password)) {
      
      confirmPay(payload);

      return;
    }
    errorInput(i18n.t("MESSAGE_INVALID_PASSWORD"));
    return;
  };

  render() {
    let { password } = this.state;
    let { payment } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("PAYMENT_PASS_CONFIRMATION")}</span>
          <span className={style.totalConfirm}>
            {payment.amount + payment.fee.fee.fee} {payment.coin.abbreviation}
          </span>
          <span> {i18n.t("PAYMENT_PASS_TO")} </span>
          <span className={style.addressConfirm}>
            {i18n.t("PAYMENT_MODAL_TITLE")}
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

        <button
          className={style.btContinue}
          onClick={() => this.confirmPassword()}
        >
          {i18n.t("BTN_CONFIRM")}
        </button>
      </div>
    );
  }
}

SecurePayment.propTypes = {
  payment:      PropTypes.object.isRequired,
  loading:      PropTypes.bool.isRequired,
  user:         PropTypes.object.isRequired,
  errorInput:   PropTypes.func.isRequired, 
  confirmPay:   PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  payment:    store.payment.payment,
  loading:    store.payment.loading,
  user:       store.user.user, 
  coins:      store.skeleton.coins,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { 
    confirmPay, 
    errorInput 
  }, 
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurePayment);
