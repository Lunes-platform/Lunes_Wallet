import React from "react";
import PropTypes from "prop-types";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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

  render() {
    const { handleStep, loading, payment } = this.props;
    return (
      <div className={style.modalBox}>
        <div>{i18n.t("PAYMENT_CONFIRM_1")}</div>
        <div>
          <span>{i18n.t("PAYMENT_CONFIRM_2")}</span>
          <span className={style.totalConfirmBlock}>{payment.amount+payment.fee} {payment.coin}</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("PAYMENT_CONFIRM_3")}
        </div>

        <ButtonContinue 
          label={i18n.t("PAYMENT_BTN_PAY")}
          action={()=>handleStep("next")}
          loading={loading} 
        />

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
)(ConfirmPayment);
