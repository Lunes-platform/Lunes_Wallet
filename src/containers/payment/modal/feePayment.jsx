import React from "react";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFeePayment,setFeePayment,setModalStep} from "../redux/paymentAction";

// COMPONENTS
import ButtonContinue from "./component/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class FeePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeSelect: 0,
      error: undefined,
      errorMsg: '',
    }
  }

  openError = (message) => {
    this.setState({
      ...this.state,
      error: true,
      errorMsg: message
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        error: false,
        errorMsg: ''
      });
    }, 4100);
  }

  calcFee(value) {
    this.setState({feeSelect:value});

    const {setFeePayment} = this.props;
    setFeePayment(value);
  }

  validateForm = () => {
    const { setModalStep } = this.props;
    const { feeSelect } = this.state;
    
    if(feeSelect > 0){
      setModalStep(3);
    }else{
      this.openError(i18n.t("MESSAGE_SELECT_FEE"));
      return;
    }
  }

  componentDidMount = () => {
    const {getFeePayment, payment, wallet} = this.props;
    
    // teste 
    const fromAddress = wallet.coins[payment.coin.abbreviation].address;
    const toAddress = payment.coin.address; 
  
    getFeePayment(payment.coin.abbreviation, payment.amount, fromAddress, toAddress);
  }

  render() {
    const { loading, payment, fee } = this.props;
    const { feeSelect, error, errorMsg } = this.state;

    if(loading){
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      )
    }else{
      return (
        <div className={style.modalBox}>
          <div>
            {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
          </div>
          <img
            src={`/images/icons/coins/${payment.coin.abbreviation}.png`}
            className={style.modalIconCoin}
          />
          <div>
            <span>{i18n.t("PAYMENT_FEE_TEXT_1")}</span>
            <span className={style.totalConfirm}>{payment.amount} {payment.coin.abbreviation}</span>
          </div>
          <div>
            <span>{i18n.t("PAYMENT_FEE_TEXT_2")}</span>
            <span className={style.addressConfirm}>{i18n.t("PAYMENT_MODAL_TITLE")}</span>
          </div>

          <div className={style.confirmFee}>
            <div>
              {i18n.t("PAYMENT_FEE_AMOUNT")}<span> {payment.coin.abbreviation} </span> é
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
              onClick={() => this.calcFee(fee.high)}
            >
              {i18n.t("FEE_HIGHT")} {fee.high}
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
}

FeePayment.propTypes = {
  fee:              PropTypes.object.isRequired,
  payment:          PropTypes.object.isRequired,
  loading:          PropTypes.bool.isRequired,
  wallet:           PropTypes.object.isRequired, 
  setModalStep:     PropTypes.func,
  getFeePayment:    PropTypes.func,
  setFeePayment:    PropTypes.func
}

const mapStateToProps = store => ({
  fee:        store.payment.fee.fee,
  payment:    store.payment.payment,
  loading:    store.payment.loading, 
  wallet:     store.skeleton
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    setModalStep,
    getFeePayment,
    setFeePayment
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeePayment);
