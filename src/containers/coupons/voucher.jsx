import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVoucherLoading, getVoucher } from "./redux/couponsAction";
import { clearMessage, errorInput } from "../errors/redux/errorAction";

// STYLE
import style from "./style.css";
import colors from "../../components/bases/colors";

// MATERIA UI
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// COMPONENTS
import Code from "./code";
import Instructions from "./instructions";
import Loading from "../../components/loading";

// UTILS
import i18n from "../../utils/i18n";
import { inputValidator } from "../../utils/inputValidator";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

class Voucher extends React.Component {
  constructor() {
    super();

    this.state = {
      phone: ["", ""],
      code: ["", "", "", ""],
      errors: undefined
    };

    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handlePhoneChange = id => event => {
    const phone = this.state.phone;
    let { value } = event.target;
    let { keyCode } = event;

    value = value.replace(/[^0-9]/i, '')

    if (id === 0 && value.length === 2) {
      let phone = document.getElementById("phone");
      phone.focus();
    } else if (id === 1 && value.length === 0 && (keyCode === 8 || keyCode === 46)) {
      let ddd = document.getElementById("ddd");
      ddd.focus();
    }

    phone[id] = value;
    this.setState({
      ...this.state,
      phone
    });
  };

  handleCodeChange = (id, event) => {
    const code = this.state.code;
    let value = event.target.value;
    let { keyCode } = event;
    code[id] = value;

    this.setState({
      ...this.state,
      code
    });
    let dic = ['first','second','third','fourth']
    if ((keyCode === 8 || keyCode === 46) && value.length < 1) {
      let prev = document.querySelector(`.${dic[id - 1]}`)
      if (prev === null) return;
      prev.focus()
    }
    if (value.length === 4) {
      let next = document.querySelector(`.${dic[id + 1]}`)
      if (next === null) return;
      next.focus()
    }
  };

  inputValidator = () => {
    let {
      clearMessage,
      errorInput,
      setVoucherLoading,
      getVoucher,
      coins
    } = this.props;
    let { phone, code } = this.state;
    setVoucherLoading(true);

    const phoneInput = {
      type: "text",
      name: "phone",
      placeholder: "Phone",
      value: phone.join("").replace(/\D/, ""),
      required: true,
      minLength: 11,
      maxLength: 11
    };

    const codeInput = {
      type: "text",
      name: "code",
      placeholder: "Code",
      value: code.join(""),
      required: true,
      minLength: 16,
      maxLength: 16
    };

    let validator = inputValidator({ phone: phoneInput, code: codeInput });

    if (validator.errors.length > 0) {
      setVoucherLoading();
      errorInput(validator.messageError);
      return;
    }
    getVoucher(
      phone,
      coins,
      code[0] + "-" + code[1] + "-" + code[2] + "-" + code[3]
    );
    clearMessage();

    return;
  };

  render() {
    const { classes, voucher } = this.props;
    const { phone, code } = this.state;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box}>
          <div className={style.row}>
            <label htmlFor="txtPhone">{i18n.t("VOUCHER_NUMBER")}</label>
            <Grid container>
              <Grid item xs={4}>
                <Input
                  classes={{
                    root: classes.root,
                    underline: classes.cssUnderline,
                    input: classes.cssInput
                  }}
                  id="ddd"
                  value={phone[0]}
                  placeholder="(xx)"
                  inputProps={{ maxLength: 2, required: true }}
                  onKeyUp={this.handlePhoneChange(0)}
                  onChange={this.handlePhoneChange(0)}
                />
              </Grid>
              <Grid item xs={8}>
                <Input
                  classes={{
                    root: classes.root,
                    underline: classes.cssUnderline,
                    input: classes.cssInput
                  }}
                  value={phone[1]}
                  id="phone"
                  placeholder="xxxxx-xxxx"
                  inputProps={{ maxLength: 9, required: true }}
                  onKeyUp={this.handlePhoneChange(1)}
                  onChange={this.handlePhoneChange(1)}
                />
              </Grid>
            </Grid>
          </div>

          <div className={style.row}>
            <label className={style.marginLabel}>
              {i18n.t("VOUCHER_CODE")}
            </label>
            <Code values={code} onHandleChange={this.handleCodeChange} />
          </div>

          <div className={style.row}>
            <Instructions />
          </div>

          <div className={style.row}>
            <button
              className={style.buttonBorderGreen}
              onClick={() => this.inputValidator()}
            >
              {voucher.loading ? <Loading /> : i18n.t("VOUCHER_BUTTON")}
            </button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Voucher.propTypes = {
  coins: PropTypes.array.isRequired,
  voucher: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errorInput: PropTypes.func,
  clearMessage: PropTypes.func,
  getVoucher: PropTypes.func,
  setVoucherLoading: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setVoucherLoading,
      getVoucher,
      clearMessage,
      errorInput
    },
    dispatch
  );

const mapSateToProps = store => ({
  coins: store.skeleton.coins,
  voucher: store.coupons.voucher
});

export default compose(
  withStyles(inputStyle),
  connect(
    mapSateToProps,
    mapDispatchToProps
  )
)(Voucher);
