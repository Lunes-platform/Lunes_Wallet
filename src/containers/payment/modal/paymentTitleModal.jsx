import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/paymentAction";

// COMPONENTS
import DetailsPayment from "./detailsPayment";
import FeePayment from "./feePayment";
import ConfirmPayment from "./confirmPayment";
import SecurePayment from "./securePayment";
import DonePayment from "./donePayment";
import ErrorPayment from "./errorPayment";

class PaymentTitleModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalStep } = this.props;

    switch (modalStep) {
      case 1:
        return <DetailsPayment />;
      case 2:
        return <FeePayment />;
      case 3:
        return <ConfirmPayment />;
      case 4:
        return <SecurePayment />;
      case 5:
        return <DonePayment />;
      case 6:
        return <ErrorPayment />;
    }
  }
}

PaymentTitleModal.propTypes = {
  modalStep:    PropTypes.number.isRequired,
  loading:      PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep:  store.payment.modalStep,
  loading:    store.payment.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentTitleModal);
