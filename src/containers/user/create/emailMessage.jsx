import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class EmailMessage extends React.Component {
  render() {
    return (
      <div className={style.contNewAccount}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div>
          <img
            src="../../../../images/icons/email/email@2x.png"
            className={style.iconEmailCreateAccount}
          />

          <div className={style.messageConfirmationRegister}>
            {i18n.t("NEW_ACCOUNT_MESSAGE_SENDED")}
          </div>

          <div className={style.arrowToLoginAlign}>
            <div className={style.arrowCircle}>
              <Link to="/">
                <img src="../../../../images/icons/arrow/arrow-green-right@1x.png" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailMessage.propTypes = {
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
)(EmailMessage);
