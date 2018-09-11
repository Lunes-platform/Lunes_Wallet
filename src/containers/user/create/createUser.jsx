import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCreateUserInfo } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

let input = {
  type: undefined,
  name: undefined,
  value: undefined,
  placeholder: undefined,
  required: false
};

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    let { name, surname, email } = props.user.user;
    this.state = {
      inputs: {
        lastName: {
          type: "text",
          name: "lastName",
          value: surname ? surname : "",
          placeholder: i18n.t("PLACEHOLDER_LAST_NAME"),
          required: true
        },
        firstName: {
          type: "text",
          name: "firstName",
          value: name ? name : "",
          placeholder: i18n.t("PLACEHOLDER_FIRST_NAME"),
          required: true
        },
        email: {
          type: "email",
          name: "email",
          value: email ? email : "",
          placeholder: i18n.t("PLACEHOLDER_EMAIL"),
          required: true
        }
      },
      step: 0,
      errors: undefined
    };
  }

  getInput = input => {
    let { inputs } = this.state;
    let { type, name, value, placeholder } = input;

    this.setState({
      ...this.state,
      inputs: {
        ...inputs,
        [name]: value
          ? input
          : {
              type: type,
              name: name,
              value: value ? value : "",
              placeholder: placeholder,
              required: true
            }
      },
      errors: undefined
    });
  };

  inputValidator = () => {
    let { getCreateUserInfo, clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { firstName, lastName, email } = this.state.inputs;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      getCreateUserInfo(firstName.value, lastName.value, email.value);
    }
  };

  handleKeyPress = target => {
    if (target.charCode == 13) {
      this.inputValidator();
    }
  };

  render() {
    let { inputs, errors } = this.state;

    return (
      <div className={style.contNewAccount} onKeyPress={this.handleKeyPress}>
        <Link to="/">
          <img
            src="../../images/icons/arrow/arrow-white-left@2x.png"
            className={style.iconArrowBack}
          />
        </Link>

        <img src="../../images/logo.svg" className={style.logo} />
        <div>
          <div className={style.newAccountHeader}>
            {i18n.t("NEW_ACCOUNT_HEADER")}
          </div>

          <input
            type="text"
            name="firstName"
            required
            placeholder={i18n.t("PLACEHOLDER_FIRST_NAME")}
            value={inputs.firstName.value}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("firstName")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <input
            type="text"
            name="lastName"
            value={inputs.lastName.value}
            required
            placeholder={i18n.t("PLACEHOLDER_LAST_NAME")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("lastName")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />
          <input
            type="email"
            name="email"
            value={inputs.email.value}
            required
            placeholder={i18n.t("PLACEHOLDER_EMAIL")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("email")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <button
            className={
              !errors && inputs.lastName && inputs.firstName && inputs.email
                ? style.buttonEnable
                : style.buttonBorderGreen
            }
            onClick={() => {
              this.inputValidator();
            }}
          >
            {i18n.t("BTN_NEXT")}
          </button>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  getCreateUserInfo: PropTypes.func,
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
      getCreateUserInfo,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CreateUser);
