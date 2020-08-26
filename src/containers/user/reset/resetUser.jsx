import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { resetUser, sendVerifyEmail } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";
import { inputValidator } from "../../../utils/inputValidator";

// COMPONENTS
import Loading from "../../../components/loading";
import LogoLunes from "../../../components/logoLunes";

// STYLE
import style from "../style.css";

class ResetUser extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      inputs: {
        emailUsername: undefined
      },
      errors: undefined
    };
  }
  componentDidMount() {
    let { clearMessage } = this.props;
    clearMessage();
  }
  getInput = input => {
    let { name, value } = input;
    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [name]: value ? input : undefined },
      errors: undefined
    });

    return;
  };

  inputValidator = () => {
    let { resetUser, clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      resetUser(this.state.inputs.emailUsername.value);
    }

    return;
  };

 validatorVerify = () => {
    let { sendVerifyEmail, clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      sendVerifyEmail(this.state.inputs.emailUsername.value);
    }

    return;
  };

  handleKeyPress = target => {
    if (target.charCode == 13) {
      this.inputValidator();
    }

    return;
  };

  render() {
    let { inputs, errors } = this.state;
    const { loading } = this.props;

    return (
      <div onKeyPress={this.handleKeyPress}>
        <Link to="/login">
          <img
            src="../../images/icons/arrow/arrow-white-left@2x.png"
            className={style.iconArrowBack}
          />
        </Link>
        <center>
          <LogoLunes medium />
        </center>
        <img
          src="../../../../images/icons/email/email@1x.png"
          className={style.iconEmail}
        />

        <div className={style.resetHeader}>{i18n.t("RESET_HEADER")}</div>

        <input
          type="email"
          name="emailUsername"
          placeholder={i18n.t("PLACEHOLDER_USERNAME_EMAIL")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("emailUsername")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />
        <div className={style.resetInstruction}>
          {i18n.t("RESET_INSTRUCTIONS")}
          <br />
          {i18n.t("RESET_INSTRUCTIONS2")}
        </div>

        <button
          className={
            inputs.emailUsername && !errors
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={() => this.inputValidator()}
        >
          {loading ? <Loading /> : i18n.t("BTN_RESET")}
        </button>
        <div className={style.textVerify}>{i18n.t("VERIFY_EMAIL_HEADER")}{" "} <a className={style.linkVerifyEmail} href="#" onClick={() => this.validatorVerify()}> {i18n.t("VERIFY_EMAIL_HEADER_1")} </a></div>
      </div>
    );
  }
}

ResetUser.propTypes = {
  resetUser: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  sendVerifyEmail: PropTypes.func,
};

const mapSateToProps = store => ({
  loading: store.user.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetUser,
      clearMessage,
      errorInput,
      sendVerifyEmail
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(ResetUser);
