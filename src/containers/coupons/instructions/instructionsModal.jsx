import React from "react";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../../utils/i18n";

class InstructionsModal extends React.Component {
    render() {
        return (
            <div className={style.alignInstructions}>
                <ol>
                    <li><span> {i18n.t("INSTRUCTION_MODAL_CUPON_1")}</span></li>
                    <li><span> {i18n.t("INSTRUCTION_MODAL_CUPON_2")}</span></li>
                    <li><span> {i18n.t("INSTRUCTION_MODAL_CUPON_3")}</span></li>
                    <li><span> {i18n.t("INSTRUCTION_MODAL_CUPON_4")}</span></li>
                </ol>
            </div>
        );
    }
}

export default InstructionsModal
