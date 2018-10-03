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
            <strong>{i18n.t("INSTRUCTION_MODAL_PAY_INFO_1_TITTLE")}</strong>
            {i18n.t("INSTRUCTION_MODAL_PAY_INFO_1")}
          </p>
        </div>
        <ol>
          <li>
            <span> {i18n.t("INSTRUCTION_MODAL_PAY_1")}</span>
          </li>
          <li>
            <span> {i18n.t("INSTRUCTION_MODAL_PAY_2")}</span>
          </li>
          <li>
            <span> {i18n.t("INSTRUCTION_MODAL_PAY_3")}</span>
          </li>
        </ol>
        <div className={style.infoModal}>
          <p>
            <strong>{i18n.t("INSTRUCTION_MODAL_PAY_INFO_2_TITTLE")}</strong>
            {i18n.t("INSTRUCTION_MODAL_PAY_INFO_2")}
          </p>
          <p>
            <strong>{i18n.t("INSTRUCTION_MODAL_PAY_INFO_3_TITTLE")}</strong>
            {i18n.t("INSTRUCTION_MODAL_PAY_INFO_3")}
          </p>
          <p>
            <strong>{i18n.t("INSTRUCTION_MODAL_PAY_INFO_4_TITTLE")}</strong>
            {i18n.t("INSTRUCTION_MODAL_PAY_INFO_4")}
          </p>
        </div>
      </div>
    );
  }
}

export default InstructionsModal;
