import React from "react";
import i18n from "../../utils/i18n";
import { Grid } from "@material-ui/core";
import style from "./style.css";
import Instructions from "./instructions";
import PropTypes from "prop-types";

// REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { errorRequest } from "../errors/redux/errorAction.js";
import { verifyCoupon } from "./redux/couponsAction.js";

//COMPONENTS
import Loading from "../../components/loading.jsx";

class Cupom extends React.Component {
  constructor() {
    super();

    this.inputEL;
    this.state = {
      code: "",
      errors: undefined
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.inputEL = document.querySelector(`.inputCoupon`);
    }, 200)
  }
  setInputTo = (type) => {
    if (type === 'success') {
      this.inputEL.classList.remove(style.error, style.warning);
      this.inputEL.classList.add(style.success);
    } else if (type === 'error') {
      this.inputEL.classList.remove(style.success, style.warning);
      this.inputEL.classList.add(style.error);
    } else if (type === 'warning') {
      this.inputEL.classList.remove(style.success, style.error);
      this.inputEL.classList.add(style.warning);
    }
  }
  componentDidUpdate() {
    let { coupons } = this.props;
    let { coupon } = coupons;
    if (coupon.verified === false) {
      this.setInputTo('error');
      this.props.coupons.coupon.verified = undefined;
    }
  }
  handleChange = event => {
    let val = event.target.value;
    if (val.search(/[^0-9-]/g) !== -1) return;
    this.setState({
      ...this.state,
      code: val
    });
  };
  handleKeyDown = (event) => {
    let { code } = this.state;
    let key = event.keyCode;
    let index = code.search(/([0-9]{4})(?!-)/g);
    if (key !== 8 && index !== -1) {
      let hyphens = code.match(/(-+)/g);
      if (hyphens === null || hyphens.length !== 3)
        code += '-';
    }
    this.setState({ code })
  }
  handleKeyUp = () => {
    setTimeout(() => {
      let code = this.inputEL.value;
      if (!code || (code && code.length !== 19)) {
        this.setInputTo('warning')
      } else {
        this.setInputTo('success')
      }
    }, 100);
  }
  handleSend = () => {
    const { code } = this.state;
    if (code && code.length !== 19) {
      this.setInputTo('error');
      errorRequest(i18n.t("SHORT_COUPON_LENGTH"));
      return;
    }
    this.props.verifyCoupon(code);
  }

  render() {
    const { code } = this.state;
    const { coupons } = this.props;
    const { coupon } = coupons;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box}>
          <div className={style.cupomRow}>
            <label>{i18n.t("VOUCHER_CODE")}</label>
            <input
              className={style.inputTextDefault+" inputCoupon"}
              value={code}
              placeholder="1234-1234-1234-1234"
              maxLength={19}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              required
            />
          </div>

          <div className={style.row}>
            <Instructions />
          </div>

          <div className={style.row}>
            <button
              className={style.buttonBorderGreen}
              onClick={this.handleSend}
            >
              {coupon.loading ? <Loading/> : i18n.t("VOUCHER_BUTTON")}
            </button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Cupom.propTypes = {
  verifyCoupon: PropTypes.func.isRequired,
  errorRequest: PropTypes.func,
  coupons: PropTypes.object
}
const mapStateToProps = state => ({
  coupons: state.coupons
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    errorRequest,
    verifyCoupon
  }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Cupom);
