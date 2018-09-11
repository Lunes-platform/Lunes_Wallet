import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading, createUser, backUserInfo } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";
import CustomCheckbox from "../../../components/checkBox";

// COMPONENTS
import Loading from "../../../components/loading";

class CreateUserTerms extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        checkboxTerms: undefined
      },
      checkDownload: false,
      errors: undefined
    };
  }

  getInput = input => {
    let { type, name, value } = input;
    let { inputs } = this.state;
    this.setState({
      ...this.state,
      inputs: {
        ...inputs,
        [name]: type === "checkbox" ? input : value ? input : undefined
      },
      errors: undefined
    });
  };

  checkDownload = () => {
    this.setState({
      ...this.state,
      checkDownload: true
    });
  };

  inputValidator = () => {
    let { loading, createUser, clearMessage, errorInput, user } = this.props;
    let { inputs, checkDownload } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    if (
      errors.length > 0 ||
      !user.user.name ||
      !user.user.surname ||
      !user.user.email ||
      !user.user.password ||
      !checkDownload
    ) {
      errorInput(messageError ? messageError : "Baixe os termos");
      this.setState({
        ...this.state,
        errors
      });
    } else {
      loading();
      clearMessage();
      createUser(user.user.name, user.user.surname, user.user.email, user.user.password);
    }
  };

  backLink = () => {
    let { backUserInfo } = this.props;
    backUserInfo();
  }

  render() {
    let { user } = this.props;
    let { inputs, checkDownload } = this.state;


    return (
      <div>

        <Link to="#" onClick={() => this.backLink()}>
          <img
            src="../../images/icons/arrow/arrow-white-left@2x.png"
            className={style.iconArrowBack}
          />
        </Link>

        <img src="../../images/logo.svg" className={style.logo} />

        <div className={style.alignInfoDownloadTerms}>
          <img src="../../images/login/gdpr-compliant@1x.png" />

          <div className={style.infoDownloadTerms}>
            <Link
              className={style.linkDownloadTerms}
              to="#"
              target="_blank"
              onClick={() => this.checkDownload()}
            >
              {i18n.t("NEW_ACCOUNT_TERMS_DOWNLOAD")}
            </Link>
          </div>
        </div>

        <div className={style.alignInfoTermsOfServices}>
          <CustomCheckbox
            type="checkbox"
            name="checkboxTerms"
            label={i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
            required
            onChange={event => {
              this.getInput(event.target);
            }}
          />

          <div className={style.acceptTermsOfServices}>
            {i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
          </div>
        </div>

        <button
          className={
            inputs.checkboxTerms && checkDownload
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={() => this.inputValidator()}
        >
          {user.loading ? <Loading /> : i18n.t("BTN_CREATE")}
        </button>
      </div>
    );
  }
}

CreateUserTerms.propTypes = {
  loading: PropTypes.func,
  createUser: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object,
  backUserInfo: PropTypes.object,

};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loading,
      createUser,
      clearMessage,
      errorInput,
      backUserInfo
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CreateUserTerms);
