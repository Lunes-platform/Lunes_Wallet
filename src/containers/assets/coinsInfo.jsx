import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAssetsSendModalOpen,
  setAssetsReceiveModalOpen,
  setAddressModalStep,
  resetModalSend,
  reloadAsset
} from "./redux/assetsAction";

import { loadWalletInfo } from "../skeleton/redux/skeletonAction";

// STYLE
import style from "./style.css";

// COMPONENTS
import SendModal from "./modal/sendModal";
import ReceiveModal from "./modal/receiveModal/";
import Modal from "../../components/modal";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../utils/i18n";
import { convertBiggestCoinUnit } from "../../utils/numbers";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false
    };
  }

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };
  reloadHistory = () => {
    let { skeleton, assets, reloadAsset } = this.props;
    let { selectedCoin } = assets;
    let address = skeleton.coins.lunes.address;

    reloadAsset(assets.assets[selectedCoin].assetId, address);
  };


  previousStep = () => {
    let { step } = this.props.assets.modal;
    let { setAddressModalStep } = this.props;
    if (step >= 0) {
      setAddressModalStep(step - 1);
    }

    return;
  };

  handleModalSendClose = () => {
    this.props.resetModalSend();
    let { user, 
         assets, 
         setAssetsSendModalOpen,
         loadWalletInfo 
    } = this.props;
    let step = assets.modal.step;

    if (step === 4) {
      return null;
    } else if (step === 5 || step === 6) {     
      this.reloadHistory(); 
      return () => {
        setAssetsSendModalOpen(), 
        loadWalletInfo(user.password);
      };
    } else {
      return () => setAssetsReceiveModalOpen();
    }
  };

  renderBalance = () => {
    let { assets: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];
    let decimalPoint = asset.decimals;
    return (
      <Grid item xs={8} className={style.floatRight}>
        <Grid item className={style.balanceItem}>
          <h2>{i18n.t("WALLET_BALANCE")}</h2>
          <p>
            {convertBiggestCoinUnit(asset.balance, decimalPoint).toFixed(
              decimalPoint
            )}
          </p>
        </Grid>
        <Hidden xsDown> {this.renderButton()}</Hidden>
      </Grid>
    );
  };

  renderBalanceMobile = () => {
    let { assets: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];
    let decimalPoint = asset.decimals;
    return (
      <Grid item xs={8} className={style.floatRight}>
        <Grid item className={style.balanceItemMobile}>
          <h2>{i18n.t("WALLET_BALANCE")}</h2>
          <p>
            {convertBiggestCoinUnit(asset.balance, decimalPoint).toFixed(
              decimalPoint
            )}
          </p>
        </Grid>
        <Hidden xsDown> {this.renderButton()}</Hidden>
      </Grid>
    );
  };
  renderButton = () => {
    let { setAssetsSendModalOpen } = this.props;
    return (
      <Grid item className={style.alignButtons}>
        <button
          className={style.receiveButton}
          onClick={() => {
            this.handleReceiveModal();
          }}
        >
          {i18n.t("BTN_RECEIVE")}
        </button>

        <button
          className={style.sentButton}
          onClick={() => setAssetsSendModalOpen()}
        >
          {i18n.t("BTN_SEND")}
        </button>
      </Grid>
    );
  };
  renderButtonMobile = () => {
    let { setAssetsSendModalOpen } = this.props; 
    return (
      <Grid item xs={11} className={style.alignButtons}>
        <button
          className={style.receiveButtonMobile}
          onClick={() => {
            this.handleReceiveModal();
          }}
        >
          {i18n.t("BTN_RECEIVE")}
        </button>
        <button
          className={style.sentButtonMobile}
          onClick={() => setAssetsSendModalOpen()}
        >
          {i18n.t("BTN_SEND")}
        </button>
      </Grid>
    );
  };

  renderReceiveModal = coin => {
    return (
      <Modal
        title={i18n.t("WALLET_MODAL_RECEIVE_TITLE")}
        content={<ReceiveModal coin={coin} />}
        show={this.state.modalReceive}
        close={() => {
          this.handleReceiveModal();
        }}
      />
    );
  };
  handleReceiveModal = () => {
    this.setState({ modalReceive: !this.state.modalReceive });
  };
  render() {
    let { assets: assetsRoute, skeleton } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];

    let coin = skeleton.coins.lunes;
    let step = assetsRoute.modal.step;

    if (selectedCoin === undefined) return null;

    return (
      <div>
        <div>
          <Modal
            title={i18n.t("WALLET_MODAL_SEND_TITLE")}
            content={<SendModal />}
            show={assetsRoute.modal.open}
            close={this.handleModalSendClose}
            back={
              step === 0 || step === 4 || step === 5 || step === 6
                ? null
                : () => this.previousStep()
            }
          />
        </div>
        <div>{this.renderReceiveModal(coin)}</div>

        <Grid container className={style.containerInfo}>
          <Grid item xs={11} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                {<h3>{asset.tokenName.toUpperCase()}</h3>}
                <img
                  src={"images/icons/tokens/default.png"}
                  className={style.iconCoinSelected}
                />
              </Grid>
            </Grid>
            <Hidden xsDown>{this.renderBalance()}</Hidden>

            <Hidden smUp>{this.renderBalanceMobile()}</Hidden>
          </Grid>
        </Grid>
        <Hidden smUp>{this.renderButtonMobile()}</Hidden>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  assets: PropTypes.object.isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  setAssetsSendModalOpen: PropTypes.func.isRequired,
  setAssetsReceiveModalOpen: PropTypes.func.isRequired,
  resetModalSend: PropTypes.func.isRequired,
  setAddressModalStep: PropTypes.func.isRequired,
  skeleton: PropTypes.object.isRequired,
  reloadAsset: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  modal: store.assets.modal,
  coins: store.skeleton.coins,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAssetsSendModalOpen,
      setAssetsReceiveModalOpen,
      resetModalSend,
      setAddressModalStep,
      loadWalletInfo,
      reloadAsset 
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
