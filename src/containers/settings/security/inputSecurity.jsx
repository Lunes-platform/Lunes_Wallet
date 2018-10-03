import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  loadingSettings,
  verifyTwoFactorAuthSettings
} from "../redux/settingsAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Loading from "../../../components/loading";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class InputSecurity extends React.Component {
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
    let {
      loadingSettings,
      errorInput,
      clearMessage,
      verifyTwoFactorAuthSettings
    } = this.props;
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

    loadingSettings();
    clearMessage();
    verifyTwoFactorAuthSettings(token);
  };

  handleKeyPress = target => {
    if (target.charCode == 13) {
      this.inputValidator();
    }
  };
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
    let { loading } = this.props.settings;
    let { errors, twoFactorFields } = this.state;

    return (
      <div onKeyPress={this.handleKeyPress}>
        <div className={style.alignInputTwoFactorAuthenticator}>
          {
            Array.from(Array(6).keys()).map(key => {
              return (<input
                key={key}
                name={"field_"+key}
                maxLength="1"
                autoFocus={key === 0 ? true : false}
                type="tel"
                value={this.state.twoFactorFields[`field_${key}`]}
                ref={input => { this.field[key] = input; }}
                onKeyUp={e => this.getInput(e, key)}
                onChange={e => this.handleOnChange(e, key)}
                className={
                  errors
                    ? style.inputTwoFactorAuthenticatorError
                    : style.inputTwoFactorAuthenticator
                }/>)
            })
          }
        </div>

        <br />

        <button
          className={
            twoFactorFields.field_0 &&
            twoFactorFields.field_1 &&
            twoFactorFields.field_2 &&
            twoFactorFields.field_3 &&
            twoFactorFields.field_4 &&
            twoFactorFields.field_5
              ? style.buttonEnable
              : errors
                ? style.buttonError
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

InputSecurity.propTypes = {
  loadingSettings: PropTypes.func,
  verifyTwoFactorAuthSettings: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  settings: PropTypes.object
};

const mapSateToProps = store => ({
  settings: store.settings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadingSettings,
      verifyTwoFactorAuthSettings,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(InputSecurity);
