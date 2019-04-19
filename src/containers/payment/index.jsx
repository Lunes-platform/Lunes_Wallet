import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep, setClearPayment,getCoinsEnabled } from "./redux/paymentAction";

// UTILS
import i18n from "../../utils/i18n";

// COMPONENTS
import Modal from "../../components/modal";
import PaymentTitleModal from "./modal/paymentTitleModal";
import ScannerModal from "./modal/scannerPayment";
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";

// STYLE
import style from "./style.css";

class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      scannerOpen: false
    };
  }

  handleModal = () =>
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  openScannerModal = () =>
    this.setState({ ...this.state, scannerOpen: !this.state.scannerOpen });

  closeModal = () => {
    const { setModalStep,getCoinsEnabled } = this.props;
    this.handleModal();
    setModalStep(1);
    getCoinsEnabled();
  }

  render() {
    let { isOpen, scannerOpen } = this.state;
    const { modalStep, setModalStep } = this.props;

    const titles = [i18n.t("PAYMENT_INVOICE"), i18n.t("PAYMENT_HISTORY")];
    const contents = [
      <Invoice
        openModal={this.handleModal}
        scannerModal={this.openScannerModal}
        key="1"
      />,
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
          title={""}
          content={<ScannerModal scannerModal={this.openScannerModal}/>}
          show={scannerOpen}
          close={() => this.openScannerModal()}
        />

        <Modal
          title={i18n.t("PAYMENT_MODAL_TITLE")}
          content={<PaymentTitleModal />}
          show={isOpen}
          close={
            modalStep === 5 || modalStep === 1 || modalStep === 6
              ? () => this.closeModal()
              : null
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
  setModalStep: PropTypes.func.isRequired,
  setClearPayment: PropTypes.func.isRequired,
  getCoinsEnabled: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep: store.payment.modalStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      setClearPayment,
      getCoinsEnabled
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
