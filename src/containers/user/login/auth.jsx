import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading, authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Loading from "../../../components/loading";
import Footer from "../footer";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import { getUsername } from "../../../utils/localStorage";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

let inputUsername = {
  type: "email",
  name: "emailUsername",
  value: getUsername() ? getUsername() : "",
  placeholder: i18n.t("PLACEHOLDER_USER_PASSWORD"),
  required: true
};

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        emailUsername: inputUsername,
        password: undefined
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { inputs } = this.state;

    this.setState({
      ...this.state,
      inputs: { ...inputs, [name]: value ? input : { value: "" } },
      errors: undefined,
    });
  };


  inputValidator = () => {
    let { inputs } = this.state;
    let { emailUsername, password } = this.state.inputs;
    let { loading, errorInput, authenticate } = this.props;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      loading();
      clearMessage();
      authenticate(emailUsername.value, password.value);
    }
  };

  handleKeyPress = (target) => {
    if (target.charCode == 13) {
      this.inputValidator()
    }
  }
  
  render() {
    // let userName = getUsername();
    let { user } = this.props;
    let { inputs, errors } = this.state;

    return (
      <div onKeyPress={this.handleKeyPress} >
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("LOGIN_HEADER")}</div>

        <input
          type="email"
          name="emailUsername"
          required
          value={inputs.emailUsername.value}
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
        <input
          type="password"
          name="password"
          required
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("password")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />

        <Link className={style.textForgetPass} to="/reset">
          {i18n.t("LOGIN_FORGET_PASSWORD_LINK")}
        </Link>

        <button
          className={
            inputs.emailUsername && inputs.password && !errors
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={() => {
            this.inputValidator();
          }}
        >
          {user.loading ? <Loading /> : i18n.t("BTN_LOGIN")}
        </button>

        <div className={style.doNotHaveAccount}>
          {i18n.t("LOGIN_CREATE_ACCOUNT_LABEL")}{" "}
          <Link className={style.doNotLink} to="/create">
            {i18n.t("LOGIN_SINGUP_ACCOUNT_LINK")}
          </Link>
        </div>

        <Footer />
      </div>
    );
  }
}

Auth.propTypes = {
  authenticate: PropTypes.func,
  loading: PropTypes.func,
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
      authenticate,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Auth);
