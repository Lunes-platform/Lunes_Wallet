import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletModalStep } from "../../redux/walletAction";

// COMPONENTS
import BoxAddress from "./boxAddress";
import BoxAmount from "./boxAmount";
import BoxFee from "./boxFee";
import BoxConfirm from "./boxConfirm";
import BoxProcess from "./boxProcess";
import BoxResult from "./boxResult";
import BoxResultError from "./boxResultError";

// STYLE
import style from "../../style.css";

class SendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  renderContent = () => {
    let { modal, wallet } = this.props;
    if (modal.step === 0) return <BoxAddress coin={wallet.selectedCoin} />;
    if (modal.step === 1) return <BoxAmount coin={wallet.selectedCoin} />;
    if (modal.step === 2) return <BoxFee coin={wallet.selectedCoin} />;
    if (modal.step === 3) return <BoxConfirm coin={wallet.selectedCoin} />;
    if (modal.step === 4) return <BoxProcess coin={wallet.selectedCoin} />;
    if (modal.step === 5) return <BoxResult coin={wallet.selectedCoin} />;
    if (modal.step === 6) return <BoxResultError coin={wallet.selectedCoin} />;
  };

  render() {
    return <div className={style.baseStep}>{this.renderContent()}</div>;
  }
}

SendModal.propTypes = {
  modal: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setWalletModalStep: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  wallet: store.wallet,
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletModalStep
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(SendModal);
