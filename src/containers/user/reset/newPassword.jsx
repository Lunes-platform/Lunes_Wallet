import React from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// MATERIAL UI
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

// COMPONENTS
import Footer from "../footer";

// STYLE
import style from "../style.css";

class NewPassword extends React.Component {
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
        /^(?=.*[!_+=@#-$%^&*])/g,
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
    let { clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    this.setState({ ...this.state, errors: errors });

    if (errors.length > 0) {
      errorInput(messageError);
    } else {
      clearMessage();
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

  handleKeyPress = (target) => {
    if (target.charCode == 13) {
      this.inputValidator()
    }
  }
  
  render() {
    let { inputs, passwordHint, errors } = this.state;

    return (
      <div className={style.formLogin} onKeyPress={this.handleKeyPress}>
        <img src="../../../images/logo.svg" className={style.logo} />
        <div className={style.resetHeader}>
          {i18n.t("RESET_NEW_PASSWORD_HEADER")}
        </div>
        <input
          name="password"
          type="password"
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
            inputs.passwordRepeat
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={() => this.inputValidator()}
        >
          {i18n.t("BTN_SAVE")}
        </button>

        <Footer />
      </div>
    );
  }
}

NewPassword.propTypes = {
  authenticate: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(NewPassword);
