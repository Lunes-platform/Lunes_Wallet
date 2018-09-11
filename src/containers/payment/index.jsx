import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// COMPONENTS
import Modal from "../../components/modal";
import PaymentTitleModal from "./modal/paymentTitleModal";
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";

// STYLE
import style from "./style.css";

class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;

    const titles = [i18n.t("PAYMENT_BANK_SLIP"), i18n.t("PAYMENT_HISTORY")];
    const contents = [<Invoice openModal={this.handleModal} />, <History />]

    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("PAYMENT_HEADER_TITLE")}</h1>
          <p>{i18n.t("PAYMENT_HEADER_SUBTITLE")}</p>
        </div>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />

        <Modal
          title={i18n.t("PAYMENT_MODAL_TITLE")}
          content={<PaymentTitleModal />}
          show={isOpen}
          // close={() => this.handleModal()}
          back={()=>this.handleModal()}
        />
      </div>
    );
  }
}

export default Payment;
