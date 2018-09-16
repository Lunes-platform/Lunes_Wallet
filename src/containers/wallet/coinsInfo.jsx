import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletSendModalOpen,
  setWalletReceiveModalOpen,
  setWalletModalStep,
  setWalletLoading
} from "./redux/walletAction";

import { loadWalletInfo } from "../skeleton/redux/skeletonAction";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

//COMPONENTS
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";
import ReceiveModal from "./modal/receiveModal/";

// UTILS
import i18n from "../../utils/i18n";
import { getDefaultFiat } from "../../utils/localStorage";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false
    };
  }

  previousStep = () => {
    let { step } = this.props.wallet.modal;
    let { setWalletModalStep } = this.props;
    if (step >= 0) {
      setWalletModalStep(step - 1);
    }

    return;
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  render() {
    let defaultCoin = getDefaultFiat();
    let {
      setWalletSendModalOpen,
      setWalletReceiveModalOpen,
      setWalletLoading,
      loadWalletInfo,
      coins,
      wallet,
      user
    } = this.props;
    let step = wallet.modal.step;
    let selectedCoin = wallet.selectedCoin;
    let coin = coins[wallet.selectedCoin];
    let coinPrice = coins[selectedCoin].price[defaultCoin].price;
    let coinPercent = coins[selectedCoin].price.percent;
    let fiatBalance = coin.balance[defaultCoin].toFixed(2);
    let balance = coin.balance.available;
    return (
      <div>
        <Modal
          title={i18n.t("WALLET_MODAL_RECEIVE_TITLE")}
          content={<ReceiveModal coin={coin} />}
          show={wallet.modalReceive.open}
          close={() => setWalletReceiveModalOpen()}
        />

        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          show={wallet.modal.open}
          close={
            step === 4
              ? null
              : step === 5 || step === 6
                ? () => {
                    setWalletSendModalOpen(),
                      setWalletLoading(true),
                      loadWalletInfo(user.password);
                  }
                : () => setWalletSendModalOpen()
          }
          back={
            step === 0 || step === 4 || step === 5 || step === 6
              ? null
              : () => this.previousStep()
          }
        />

        <Grid container className={style.containerInfo}>
          <Grid item xs={11} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                <h3>{coin.name.toUpperCase()}</h3>
                <img
                  src={"./images/icons/coins/" + coin.abbreviation + ".png"}
                  className={style.iconCoinSelected}
                />
                <div className={style.percentageCoinSelected}>
                  {this.renderArrowPercent(coinPercent)}
                  {coinPercent}
                </div>
                <h2>{coin.price[defaultCoin].symbol + coinPrice.toFixed(3)}</h2>
              </Grid>
            </Grid>

            <Hidden xsDown>
              <Grid item xs={8} className={style.floatRight}>
                <Grid item className={style.balanceItem}>
                  <h2>{i18n.t("WALLET_BALANCE")}</h2>
                  <p>{balance} </p>
                  <div className={style.alignValues}>
                    {coin.price[defaultCoin].symbol + fiatBalance}
                    <div className={style.coinBalanceGreen}>
                      {" "}
                      {defaultCoin}{" "}
                    </div>
                  </div>
                </Grid>

                <Grid item className={style.alignButtons}>
                  <button
                    className={style.receiveButton}
                    onClick={() => setWalletReceiveModalOpen()}
                  >
                    {i18n.t("BTN_RECEIVE")}
                  </button>

                  <button
                    className={style.sentButton}
                    onClick={() => setWalletSendModalOpen()}
                  >
                    {i18n.t("BTN_SEND")}
                  </button>
                </Grid>
              </Grid>
            </Hidden>

            <Hidden smUp>
              <Grid item xs={8} className={style.floatRight}>
                <Grid item className={style.balanceItemMobile}>
                  <h2>{i18n.t("WALLET_BALANCE")}</h2>
                  <p>{balance} </p>
                  <div className={style.alignValues}>
                    {coin.price[defaultCoin].symbol + fiatBalance}
                    <div className={style.coinBalanceGreen}>
                      {" "}
                      {defaultCoin}{" "}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>

          <Hidden smUp>
            <Grid item xs={11} className={style.alignButtons}>
              <button
                className={style.receiveButtonMobile}
                onClick={() => setWalletReceiveModalOpen()}
              >
                {i18n.t("BTN_RECEIVE")}
              </button>
              <button
                className={style.sentButtonMobile}
                onClick={() => setWalletSendModalOpen()}
              >
                {i18n.t("BTN_SEND")}
              </button>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  setWalletLoading: PropTypes.func.isRequired,
  setWalletModalStep: PropTypes.func.isRequired,
  setWalletSendModalOpen: PropTypes.func.isRequired,
  setWalletReceiveModalOpen: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  wallet: store.wallet,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setWalletLoading,
      setWalletModalStep,
      setWalletSendModalOpen,
      setWalletReceiveModalOpen
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
