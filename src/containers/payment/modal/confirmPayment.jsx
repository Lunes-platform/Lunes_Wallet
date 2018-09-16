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

// STYLES
import style from "./style.css";

class ConfirmPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  confirmPay = () => {
    const {setModalStep} = this.props;

    setModalStep(4);
  }

  render() {
    const {loading, payment } = this.props;
    return (
      <div className={style.modalBox}>
        <div>{i18n.t("PAYMENT_CONFIRM_1")}</div>
        <div>
          <span>{i18n.t("PAYMENT_CONFIRM_2")}</span>
          <span className={style.totalConfirmBlock}>{payment.amount + payment.fee} {payment.coin.abbreviation}</span>
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
  loading:          PropTypes.bool.isRequired
}

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {setModalStep},
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPayment);
