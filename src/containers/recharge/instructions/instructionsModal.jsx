import React from "react";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../../utils/i18n";

class InstructionsModal extends React.Component {
  render() {
    return (
      <div className={style.alignInstructions}>
        <div className={style.infoModal}>
          <p>
            <strong>
              {i18n.t("INSTRUCTION_MODAL_RECHARGE_INFO_1_TITTLE")}
            </strong>
            {i18n.t("INSTRUCTION_MODAL_RECHARGE_INFO_1")}
          </p>
          <p>
            <strong>
              {i18n.t("INSTRUCTION_MODAL_RECHARGE_INFO_2_TITTLE")}
            </strong>
            {i18n.t("INSTRUCTION_MODAL_RECHARGE_INFO_2")}
          </p>
        </div>
      </div>
    );
  }
}

export default InstructionsModal;
