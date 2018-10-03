import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/rechargeAction";

// COMPONENTS
import DetailsRecharge from "./detailsRecharge";
import FeeRecharge from "./feeRecharge";
import ConfirmRecharge from "./confirmRecharge";
import SecureRecharge from "./secureRecharge";
import DoneRecharge from "./doneRecharge";
import ErrorRecharge from "./errorRecharge";

class RechargeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalStep } = this.props;

    switch (modalStep) {
      case 1:
        return <DetailsRecharge />;
      case 2:
        return <FeeRecharge />;
      case 3:
        return <ConfirmRecharge />;
      case 4:
        return <SecureRecharge />;
      case 5:
        return <DoneRecharge />;
      case 6:
        return <ErrorRecharge />;
    }
  }
}

RechargeModal.propTypes = {
  modalStep: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep: store.recharge.modalStep,
  loading: store.recharge.loading
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
)(RechargeModal);
