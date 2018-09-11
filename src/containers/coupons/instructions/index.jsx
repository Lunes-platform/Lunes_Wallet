import React from "react";

// COMPONENTS
import InstructionsModal from "./instructionsModal"
import Modal from "../../../components/modal";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class Instructions extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  handleModal= () => this.setState({isOpen: !this.state.isOpen});

  render() {
    let { isOpen } = this.state;
    return (
      <div>
        <div className={style.instructions}>
          <a href="#" onClick={() => this.handleModal()}>
            {i18n.t("COUPON_INSTRUCTIONS")}
            <img src="/images/icons/recharge/ic_instrucoes.png" alt={i18n.t("COUPON_INSTRUCTIONS")} />
          </a>
        </div>
        <Modal
            title={i18n.t("MODAL_TITLE_INSTRUCIONS")}
            content={<InstructionsModal />}
            show={isOpen}
            close={() => this.handleModal()}
        />
      </div>
    );
  }
}



export default Instructions
