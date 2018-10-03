import React from "react";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setModalStep} from "../redux/paymentAction";

//COMPONENTS
import ButtonContinue from "./component/buttonContinue";

// UTILS
import i18n from "../../../utils/i18n";
import { errorInput } from "../../errors/redux/errorAction";

// STYLES
import style from "./style.css";

class ConfirmPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  confirmPay = () => {
    const {setModalStep, coins, payment, errorInput} = this.props;

    let coinBalance = coins[payment.coin.abbreviation].balance.available;
    let amount = payment.amount + payment.fee.fee.fee;

    if (parseFloat(amount) <= coinBalance) {
      setModalStep(4);
    }else{
      errorInput(i18n.t("PAYMENT_AMOUNT_ERROR"));
      return;
    }
  }

  render() {
    const {loading, payment } = this.props;
    return (
      <div className={style.modalBox}>
        <div>{i18n.t("PAYMENT_CONFIRM_1")}</div>
        <div>
          <span>{i18n.t("PAYMENT_CONFIRM_2")}</span>
          <span className={style.totalConfirmBlock}>{payment.amount + payment.fee.fee.fee} {payment.coin.abbreviation}</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("PAYMENT_CONFIRM_3")}
        </div>

        <ButtonContinue
          label={i18n.t("PAYMENT_BTN_PAY")}
          action={()=>this.confirmPay()}
          loading={loading}
        />

      </div>
    );
  }
}

ConfirmPayment.propTypes = {
  setModalStep:     PropTypes.func.isRequired,
  payment:          PropTypes.object.isRequired,
  loading:          PropTypes.bool.isRequired, 
  coins:            PropTypes.array.isRequired,
  errorInput:       PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading, 
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {setModalStep,errorInput},
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPayment);
