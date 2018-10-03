import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadWalletInfo } from "../skeleton/redux/skeletonAction";
import { setWalletLoading, setSelectedCoin } from "./redux/walletAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import TransactionHistory from "./transactionHistory";
import Loading from "../../components/loading";

// UTILS
import { getDefaultCrypto } from "../../utils/localStorage.js";

class Wallet extends React.Component {
  componentDidMount() {
    let { setWalletLoading, loadWalletInfo, user } = this.props;
    setWalletLoading(true);
    loadWalletInfo(user.password);
  }

  renderContent = () => {
    let { loading } = this.props.wallet;
    if (loading) {
      return (
        <div>
          <Loading color="wallet" height="80vh" width="100px" />
        </div>
      );
    }

    return (
      <div>
        <CoinsBar />
        <div>
          <CoinsInfo />
          <TransactionHistory />
        </div>
      </div>
    );
  };

  render() {
    let { wallet } = this.props;
    if (!wallet.selectedCoin) {
      setSelectedCoin(getDefaultCrypto());
      return null;
    }
    return this.renderContent();
  }
}

Wallet.propTypes = {
  user: PropTypes.object,
  wallet: PropTypes.object,
  loadWalletInfo: PropTypes.func,
  setWalletLoading: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  wallet: store.wallet
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setWalletLoading
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Wallet);
