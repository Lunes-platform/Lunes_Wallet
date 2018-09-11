import React from "react";

// COMPONENTS
import Modal from "../modal";
import i18n from "../../utils/i18n";
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
    const {isOpen} = this.state;
    const {children} = this.props;

    return (
      <div>
        <div className={style.instructions}>
          <a href="#" onClick={() => this.handleModal()}>
            {i18n.t("COUPON_INSTRUCTIONS")}
            <img src="/images/icons/recharge/ic_instrucoes.png" alt={i18n.t("COUPON_INSTRUCTIONS")} />
          </a>
        </div>
        <Modal
          title={"Instructions"}
          content={<div className={style.alignInstructions}>{children}</div>}
          show={isOpen}
          close={() => this.handleModal()}
        />
      </div>
    );
  }
}



export default Instructions
