import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// REDUX
import { bindActionCreators } from "redux";
import { verifyTwoFactorAuth } from "../redux/userAction";
import { loading } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Loading from "../../../components/loading";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class MultiFactorAuth extends React.Component {
  constructor() {
    super();
    this.field = [];
    this.state = {
      twoFactorFields: {
        field_0: '',
        field_1: '',
        field_2: '',
        field_3: '',
        field_4: '',
        field_5: '',
      },
      errors: undefined
    };
  }



  inputValidator = () => {
    let { loading, errorInput, clearMessage, verifyTwoFactorAuth } = this.props;
    let {
      field_0,
      field_1,
      field_2,
      field_3,
      field_4,
      field_5,
    } = this.state.twoFactorFields;
    let token = field_0 + field_1 + field_2 + field_3 + field_4 + field_5;
    let input = {
      type: "text",
      name: "2FA",
      value: token,
      placeholder: "2FA",
      required: true
    };
    let { messageError, errors } = inputValidator({ inputs: input });

    if (errors.length > 0) {
      errorInput(messageError);
      return this.setState({
        ...this.state,
        errors
      });
    }
    loading();
    clearMessage();
    verifyTwoFactorAuth(token);
  };

  handleKeyPress = (target) => {
    if (target.charCode == 13) {
      this.inputValidator()
    }
  }

  handleOnChange = (event, key) => {
    let val = event.target.value.replace(/[^0-9]/, '');
    this.setState({twoFactorFields: {
      ...this.state.twoFactorFields,
      [`field_${key}`]: !val ? '' : val.replace(/[^0-9]/, '')
    }})
  }
  getInput = (event, key) => {
    let { value } = event.target;
    let { keyCode } = event;

    if (keyCode === 8 || keyCode === 46) {
      if (this.field[key - 1])
        this.field[key - 1].focus();
      value = '';
    } else if (value && (keyCode !== 8 && keyCode !== 46)) {
      if (this.field[key + 1])
        this.field[key + 1].focus();
    }
    if (!value) value = '';

    this.setState({twoFactorFields: {
      ...this.state.twoFactorFields,
      [`field_${key}`]: value
    }})
  };
  render() {
    let { loading } = this.props.user;
    let { errors, twoFactorFields } = this.state;

    return (
      <div onKeyPress={this.handleKeyPress}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("2FA_HEADER")}</div>

        <div className={style.instructions}>
          <strong>{i18n.t("2FA_INSTRUCTIONS_TITLE")}</strong>
          <br />
          {i18n.t("2FA_INSTRUCTIONS_1")}
        </div>

        <div className={style.alignInputTwoFactorAuthenticator}>
          {
            Array.from(Array(6).keys()).map((i, k) => {
              return (<input
                key={k}
                type="tel"
                name={"field_"+k}
                maxLength="1"
                value={this.state.twoFactorFields[`field_${k}`]}
                autoFocus={k === 0 ? true : false}
                ref={input => { this.field[k] = input; }}
                onKeyUp={e => this.getInput(e, k)}
                onChange={e => this.handleOnChange(e, k)}
                className={
                  errors
                    ? style.inputTwoFactorAuthenticatorError
                    : style.inputTwoFactorAuthenticator
                }/>)
            })
          }
        </div>

        <div className={style.instructions_2}>
          {i18n.t("2FA_INSTRUCTIONS_2")}
          <Link className={style.linkWhereToFind} to="#">
            {i18n.t("2FA_INSTRUCTIONS_LINK_WHERE_TO_FIND")}
          </Link>
        </div>

        <button
          className={
            twoFactorFields.field_0 &&
            twoFactorFields.field_1 &&
            twoFactorFields.field_2 &&
            twoFactorFields.field_3 &&
            twoFactorFields.field_4 &&
            twoFactorFields.field_5
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={() => this.inputValidator()}
        >
          {loading ? <Loading /> : i18n.t("BTN_CONFIRM")}
        </button>
      </div>
    );
  }
}

MultiFactorAuth.propTypes = {
  loading: PropTypes.func,
  verifyTwoFactorAuth: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loading,
      verifyTwoFactorAuth,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(MultiFactorAuth);
