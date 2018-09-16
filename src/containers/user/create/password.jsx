import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading, getCreateUserInfoPassword, backUserInfo } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// MATERIAL UI
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

// STYLE
import style from "../style.css";

class Password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        password: undefined,
        passwordRepeat: undefined
      },
      passwordHint: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { inputs, passwordHint } = this.state;

    if (name === "password") {
      passwordHint = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      };

      let rules = [
        /^(?=.*[A-Z])/g,
        /^(?=.*[a-z])/g,
        /^(?=.*[0-9])/g,
        /^(?=.*[!@#$%^&*(),.?":{}|<>])/g,
        /^(?=.{8,})/g
      ];

      if (name === "password") {
        rules.map((rules, key) => {
          if (value.match(rules)) {
            passwordHint[key] = true;
          }
        });
      }
    }

    this.setState({
      ...this.state,
      inputs: { ...inputs, [name]: value ? input : undefined },
      passwordHint
    });

    return;
  };

  inputValidator = () => {
    let { getCreateUserInfoPassword, clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    this.setState({ ...this.state, errors: errors });

    if (errors.length > 0) {
      errorInput(messageError);
    } else {
      loading();
      clearMessage();
      getCreateUserInfoPassword(inputs.password.value);
    }

    return;
  };

  renderPasswordHintIcon = () => {
    let { passwordHint } = this.state;
    let hints = [
      i18n.t("RESET_NEW_PASSWORD_HINT_1"),
      i18n.t("RESET_NEW_PASSWORD_HINT_2"),
      i18n.t("RESET_NEW_PASSWORD_HINT_3"),
      i18n.t("RESET_NEW_PASSWORD_HINT_4"),
      i18n.t("RESET_NEW_PASSWORD_HINT_5")
    ];

    return Object.keys(passwordHint).map((value, key) => {
      if (passwordHint[key]) {
        return (
          <div key={key}>
            <DoneIcon
              className={style.iconListValid}
              style={{ color: "green" }}
            />
            {hints[key]}
          </div>
        );
      } else {
        return (
          <div key={key}>
            <ClearIcon
              className={style.iconListValid}
              style={{ color: "red" }}
            />
            {hints[key]}
          </div>
        );
      }
    });
  };

  backLink = () => {
    let { backUserInfo } = this.props;
    backUserInfo();    
  }

  handleKeyPress = (target) => {
    if (target.charCode == 13) {
      this.inputValidator()
    }
  }
  
  render() {
    let { inputs, passwordHint, errors } = this.state;
    let { password } = this.props.user.user;

    return (
      <div className={style.formLogin} onKeyPress={this.handleKeyPress}>

        <Link to="#" onClick={() => this.backLink()}>
          <img
            src="../../images/icons/arrow/arrow-white-left@2x.png"
            className={style.iconArrowBack}
          />
        </Link>

        <img src="../../../images/logo.svg" className={style.logo} />
        <div className={style.resetHeader}>
          {i18n.t("NEW_ACCOUNT_PASSWORD_HEADER")}
        </div>
        <input
          name="password"
          type="password"
          value={password}
          required
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          className={
            errors && errors.includes("password")
              ? style.inputTextError
              : style.inputTextDefault
          }
          onChange={input => this.getInput(input.target)}
        />

        <input
          type="password"
          name="passwordRepeat"
          value={password}
          required
          placeholder={i18n.t("PLACEHOLDER_PASSWORD_REPEAT")}
          className={
            errors && errors.includes("passwordRepeat")
              ? style.inputTextError
              : style.inputTextDefault
          }
          onChange={input => this.getInput(input.target)}
        />

        <div className={style.passwordRules}>
          <div>{i18n.t("RESET_NEW_PASSWORD_INSTRUCTION")}</div>
        </div>

        <div className={style.passwordRulesItens}>
          {this.renderPasswordHintIcon()}
        </div>

        <button
          className={
            passwordHint[0] &&
            passwordHint[1] &&
            passwordHint[2] &&
            passwordHint[3] &&
            passwordHint[4] &&
            inputs.passwordRepeat
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={
            passwordHint[0] &&
            passwordHint[1] &&
            passwordHint[2] &&
            passwordHint[3] &&
            passwordHint[4]
              ? () => this.inputValidator()
              : null
          }
        >
          {i18n.t("BTN_NEXT")}
        </button>
      </div>
    );
  }
}

Password.propTypes = {
  getCreateUserInfoPassword: PropTypes.func,
  backUserInfo: PropTypes.func,
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
      getCreateUserInfoPassword,
      backUserInfo,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Password);
