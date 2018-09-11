import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class DonePayment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleStep } = this.props;
    return (
      <div className={style.modalBox}>
        <img src="/images/icons/confirm/confirm.png" className={style.imageResult} />
        {/* <img src="/images/icons/error/error.png" /> */}
        <div>{i18n.t("PAYMENT_SUCCESS_1")}
        <span className={style.textGreen}>R$30,00</span>
        {i18n.t("PAYMENT_SUCCESS_2")}
        </div>

        <div className={style.smallDescription}>
          {i18n.t("PAYMENT_TEXT_HISTORY")}
        </div>
        
      </div>
    );
  }
}

export default DonePayment;
