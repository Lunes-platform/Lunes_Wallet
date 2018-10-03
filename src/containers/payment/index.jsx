import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep, setClearPayment } from "./redux/paymentAction";

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
    };
  }
  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  closeModal() {
    const { setModalStep, setClearPayment } = this.props;
    this.handleModal();
    setClearPayment();
    setModalStep(1);
  }

  render() {
    let { isOpen } = this.state;

    const { modalStep, setModalStep } = this.props;

    const titles = [i18n.t("PAYMENT_INVOICE"), i18n.t("PAYMENT_HISTORY")];
    const contents = [
      <Invoice openModal={this.handleModal} key="1" />,
      <History key="2" />
    ];

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
          close={
            modalStep === 5 || modalStep === 1 || modalStep === 6 ? () => this.closeModal() : null
          }
          back={
            modalStep === 2 || modalStep === 3 || modalStep === 4
              ? () => setModalStep(modalStep - 1)
              : null
          }
        />
      </div>
    );
  }
}

Payment.propTypes = {
  modalStep: PropTypes.number.isRequired,
  setModalStep: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep: store.payment.modalStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      setClearPayment
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
