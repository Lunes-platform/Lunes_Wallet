import React from "react";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// UTILS
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
    //let { password } = this.state;

    // if de validacao e proximo passo aqui
    return;
  };

  render() {
    let { password } = this.state;
    let { handleStep, payment } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>
            {i18n.t("PAYMENT_PASS_CONFIRMATION")}
          </span>
          <span className={style.totalConfirm}>
            {payment.amount+payment.fee} {payment.coin}
          </span>
          <span> {i18n.t("PAYMENT_PASS_TO")} </span>
          <span className={style.addressConfirm}>{i18n.t("PAYMENT_MODAL_TITLE")}</span>
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

        <button className={style.btContinue} onClick={() => handleStep("next")}>
          {i18n.t("BTN_CONFIRM")}
        </button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  { }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SecurePayment);