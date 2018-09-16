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
        field_1: undefined,
        field_2: undefined,
        field_3: undefined,
        field_4: undefined,
        field_5: undefined,
        field_6: undefined
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { twoFactorFields } = this.state;

    if (value) {
      Object.keys(twoFactorFields).map((input, key) => {
        if (name === input && this.field[key + 1]) {
          this.field[key + 1].focus();
        }
      });
    }

    this.setState({
      ...this.state,
      twoFactorFields: { ...twoFactorFields, [name]: value },
      errors: undefined
    });
    return;
  };

  inputValidator = () => {
    let { loading, errorInput, clearMessage, verifyTwoFactorAuth } = this.props;
    let {
      field_1,
      field_2,
      field_3,
      field_4,
      field_5,
      field_6
    } = this.state.twoFactorFields;
    let token = field_1 + field_2 + field_3 + field_4 + field_5 + field_6;
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
          <input
            name="field_1"
            maxLength="1"
            autoFocus
            ref={input => {
              this.field[0] = input;
            }}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors
                ? style.inputTwoFactorAuthenticatorError
                : style.inputTwoFactorAuthenticator
            }
          />

          <input
            name="field_2"
            maxLength="1"
            ref={input => {
              this.field[1] = input;
            }}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors
                ? style.inputTwoFactorAuthenticatorError
                : style.inputTwoFactorAuthenticator
            }
          />

          <input
            name="field_3"
            maxLength="1"
            ref={input => {
              this.field[2] = input;
            }}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors
                ? style.inputTwoFactorAuthenticatorError
                : style.inputTwoFactorAuthenticator
            }
          />

          <input
            name="field_4"
            maxLength="1"
            ref={input => {
              this.field[3] = input;
            }}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors
                ? style.inputTwoFactorAuthenticatorError
                : style.inputTwoFactorAuthenticator
            }
          />

          <input
            name="field_5"
            maxLength="1"
            ref={input => {
              this.field[4] = input;
            }}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors
                ? style.inputTwoFactorAuthenticatorError
                : style.inputTwoFactorAuthenticator
            }
          />

          <input
            name="field_6"
            maxLength="1"
            ref={input => {
              this.field[5] = input;
            }}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors
                ? style.inputTwoFactorAuthenticatorError
                : style.inputTwoFactorAuthenticator
            }
          />
        </div>

        <div className={style.instructions_2}>
          {i18n.t("2FA_INSTRUCTIONS_2")}
          <Link className={style.linkWhereToFind} to="#">
            {i18n.t("2FA_INSTRUCTIONS_LINK_WHERE_TO_FIND")}
          </Link>
        </div>

        <button
          className={
            twoFactorFields.field_1 &&
            twoFactorFields.field_2 &&
            twoFactorFields.field_3 &&
            twoFactorFields.field_4 &&
            twoFactorFields.field_5 &&
            twoFactorFields.field_6
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
