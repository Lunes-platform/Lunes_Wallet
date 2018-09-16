import React from "react";

// STYLE
import style from "../../style.css";

// UTILS
import i18n from "../../../../utils/i18n";

class BoxResultError extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <div className={style.errorString}>
          {i18n.t("MODAL_SEND_INFO_ERROR")}
        </div>
        <img src="/images/icons/error/error.png" />

      </div>
    );
  }
}

export default BoxResultError;
