import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/rechargeAction";

//COMPONENTS
import ButtonContinue from "../../../components/buttonContinue";

// UTILS
import i18n from "../../../utils/i18n";
import { errorInput } from "../../errors/redux/errorAction";

// STYLES
import style from "./style.css";

class ConfirmRecharge extends React.Component {
  constructor(props) {
    super(props);
  }

  confirmPay = () => {
    const { setModalStep, coins, recharge, errorInput } = this.props;

    const coinBalance = coins[recharge.coin.abbreviation].balance.available;
    const amount = recharge.amount + recharge.fee.fee.fee;

    if (coinBalance > parseFloat(amount)) {
      setModalStep(4);
    } else {
      errorInput(i18n.t("RECHARGE_AMOUNT_ERROR"));
      return;
    }
  }

  render() {
    const { loading, recharge } = this.props;
    return (
      <div className={style.modalBox}>
        <div>{i18n.t("RECHARGE_CONFIRM_1")}</div>
        <div>
          <span>{i18n.t("RECHARGE_CONFIRM_2")}</span>
          <span className={style.totalConfirmBlock}>{recharge.amount + recharge.fee.fee.fee} {recharge.coin.abbreviation.toUpperCase()}</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("RECHARGE_CONFIRM_3")}
        </div>

        <ButtonContinue
          label={i18n.t("PAYMENT_BTN_PAY")}
          action={() => this.confirmPay()}
          loading={loading}
        />

      </div>
    );
  }
}

ConfirmRecharge.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  recharge: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  recharge: store.recharge.recharge,
  loading: store.recharge.loading,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { setModalStep, errorInput },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmRecharge);
