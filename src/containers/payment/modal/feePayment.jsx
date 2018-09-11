import React from "react";
import PropTypes from "prop-types";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFeePayment,setFeePayment} from "../redux/paymentAction";

// COMPONENTS
import ButtonContinue from "./component/buttonContinue";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class FeePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeSelect: 0
    }
  }

  calcFee(value) {
    this.setState({feeSelect:value});

    const {setFeePayment} = this.props;
    setFeePayment(value);
  }

  validateForm = () => {
    const { handleStep } = this.props;

    handleStep("next"); // validar a selecao de fee aqui
  }

  componentDidMount = () => {
    const {getFeePayment, payment} = this.props;
    getFeePayment(payment.coin, payment.amount);
  }

  render() {
    const { loading, payment, fee } = this.props;
    const { feeSelect } = this.state;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/LUNES.png"}
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("PAYMENT_FEE_TEXT_1")}</span>
          <span className={style.totalConfirm}>{payment.amount} {payment.coin}</span>
        </div>
        <div>
          <span>{i18n.t("PAYMENT_FEE_TEXT_2")}</span>
          <span className={style.addressConfirm}>{i18n.t("PAYMENT_MODAL_TITLE")}</span>
        </div>

        <div className={style.confirmFee}>
          <div>
            {i18n.t("PAYMENT_FEE_AMOUNT")}<span> {payment.coin} </span> é
          </div>
          <div className={style.txtamount}>{feeSelect}</div>
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.calcFee(fee.low)}
          >
            {i18n.t("FEE_LOW")} {fee.low}
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.calcFee(fee.medium)}
          >
            {i18n.t("FEE_MEDIUM")} {fee.medium}
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.calcFee(fee.hight)}
          >
            {i18n.t("FEE_HIGHT")} {fee.hight}
          </span>
        </div>

        <ButtonContinue 
          label={i18n.t("BTN_CONTINUE")}
          action={()=>this.validateForm()}
          loading={loading} 
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  fee: store.payment.fee,
  payment: store.payment.payment,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    getFeePayment,
    setFeePayment
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FeePayment);
