import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAssetGeneralInfo,
  getAssetHistory,
  setSelectedCoin,
  reloadAsset
} from "./redux/assetsAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import TransactionHistory from "./transactionHistory";
import Loading from "../../components/loading.jsx";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class Assets extends React.Component {
  componentDidMount() {
    let { getAssetGeneralInfo, skeleton } = this.props;
    let { selectedCoin } = this.props.assets;
    let { address } = skeleton.coins.lunes;

    getAssetGeneralInfo(address);
    this.setState({ lastAsset: selectedCoin });
  }

  componentDidUpdate() {
    let { assets, getAssetHistory, skeleton } = this.props;
    let { lastAsset } = this.state; 
    let { selectedCoin } = this.props.assets;

    if (lastAsset !== selectedCoin) {
      getAssetHistory(assets.assets[selectedCoin].assetId, skeleton.coins.lunes.address);
      this.setState({ lastAsset: selectedCoin });
    }
  }

  reloadAsset() {
    let { assets, reloadAsset } = this.props;
    let { address } = this.props.skeleton.coins.lunes;
    reloadAsset(assets.assets[assets.selectedCoin].assetId, address);
  }

  renderEmptyAssets() {
    let { isBalanceLoading } = this.props.assets;
    return (
      <div className={style.noToken}>
        {isBalanceLoading ? (
          <Loading color="wallet" height="80vh" width="100px" />
        ) : (
          <React.Fragment>
            <div
              className={style.refleshIcon}
              onClick={() => this.reloadAsset()}
            >
              <img
                width="15px"
                height="15px"
                src="images/icons/general/refresh@2x.png"
              />
            </div>
            <h1>{i18n.t("ASSETS_USER_DOESNT_HAVE_TOKEN")}</h1>
          </React.Fragment>
        )}
      </div>
    );
  }
  renderContent = () => {
    let { setSelectedCoin } = this.props;
    let { selectedCoin, assets } = this.props.assets;
    if (!assets || (assets && assets.length < 1))
      return this.renderEmptyAssets();

    if (selectedCoin === undefined) {
      setSelectedCoin(0);
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
    let { assets } = this.props;
    let { isBalanceLoading, isTxHistoryLoading } = assets;

    if (isBalanceLoading || isTxHistoryLoading) {
      return (
        <div>
          <Loading color="wallet" height="80vh" width="100px" />
        </div>
      );
    }
    
    return this.renderContent();
  }
}

Assets.propTypes = {
  user: PropTypes.object,
  assets: PropTypes.object,
  skeleton: PropTypes.object,
  loadWalletInfo: PropTypes.func,
  setAssetLoading: PropTypes.func,
  getAssetGeneralInfo: PropTypes.func,
  getAssetHistory: PropTypes.func,
  setSelectedCoin: PropTypes.func.isRequired,
  reloadAsset: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAssetGeneralInfo,
      getAssetHistory,
      setSelectedCoin,
      reloadAsset
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Assets);
