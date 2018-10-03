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
      <div>
        <img src="../../images/logo.svg" className={style.logo} />
        <img
          src="../../../../images/icons/email/email@1x.png"
          className={style.iconEmail}
        />
        <div className={style.resetEmailSend}>
          {i18n.t("RESET_EMAIL_SENDED")}
        </div>
        <Link
          className={style.resetLinkLogin}
          to="/"
          onClick={() => this.backLink()}
        >
          <button className={style.buttonEnable}>{i18n.t("BTN_LOGIN")}</button>
        </Link>
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
