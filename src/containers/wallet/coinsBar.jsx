import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setSelectedCoin,
  getWalletCoinHistory,
  setWalletCoinHistoryLoading
} from "./redux/walletAction";
import { clearMessage, errorInput } from "../errors/redux/errorAction";

// UTILS
import { getFavoritesCrypto, getDefaultFiat } from "../../utils/localStorage";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import { AddCircle, Close } from "@material-ui/icons";

// MATERIAL ICONS
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinActive: null
    };
  }

  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  setCoin = (coin, address) => {
    let {
      setSelectedCoin,
      getWalletCoinHistory,
      setWalletCoinHistoryLoading
    } = this.props;
    setWalletCoinHistoryLoading(true);
    getWalletCoinHistory(coin, address);
    setSelectedCoin(coin);
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  componentDidMount = () => {
    let { coins } = this.props.skeleton;

    let favoritesCoins = getFavoritesCrypto();
    favoritesCoins = favoritesCoins ? favoritesCoins : ["lunes"];
    
    let lunesPosition = favoritesCoins.indexOf("lunes");
    let coin = null;

    if(lunesPosition < 0){
      coin = coins[favoritesCoins[0]];
    }else{
      coin = coins[favoritesCoins[lunesPosition]];
    }

    if (coin!=null){
      let coinBalanceStatus = coin.balance ? true : false;
      let coinAddressStatus = coin.address ? true : false;
      let coinStatus =
        coin.status === "active" && coinBalanceStatus && coinAddressStatus
          ? true
          : false;

      if (coinStatus) {
        this.setCoin(coin.abbreviation, coin.address);
      }
    }
  };

  renderCoins = () => {
    let { wallet } = this.props;
    let { coins } = this.props.skeleton;
    let defaultFiat = getDefaultFiat();
    let favoritesCoins = getFavoritesCrypto();
    favoritesCoins = favoritesCoins ? favoritesCoins : ["lunes"];

    return favoritesCoins.map((val, index) => {
      let coin = coins[val];

      if (!coin) return;

      let coinBalanceStatus = coin.balance ? true : false;
      let coinAddressStatus = coin.address ? true : false;
      let coinStatus =
        coin.status === "active" && coinBalanceStatus && coinAddressStatus
          ? true
          : false;
      let coinBalance = coinStatus ? coin.balance.available : 0;
      let coinFiatBalance = coinStatus
        ? (coinBalance * coin.price[defaultFiat].price).toFixed(0)
        : 0;
      let coinPercent = coinStatus ? coin.price.percent : 0;

      return (
        <div
          className={coinStatus ? null : style.boxCoinDisabled}
          key={index}
          onClick={
            coinPercent
              ? () => this.setCoin(coin.abbreviation, coin.address)
              : null
          }
        >
          <div
            className={
              wallet.selectedCoin === coin.abbreviation
                ? style.boxCoinActive
                : style.boxCoin
            }
          >
            <div className={style.boxIconCoin}>
              <img
                className={style.iconCoin}
                src={"images/icons/coins/" + coin.abbreviation + ".png"}
              />
            </div>
            <Hidden smDown>
              {coinStatus ? (
                <div className={style.boxLabelCoin}>
                  {coin.price[defaultFiat].symbol + coinFiatBalance} <br />
                  <div className={style.labelPercent}>
                    {this.renderArrowPercent(coinPercent)}
                    {coinPercent}
                  </div>
                </div>
              ) : (
                <div className={style.boxLabelCoinDisabled}>
                  {i18n.t("TEXT_UNAVAILABLE")}
                </div>
              )}
            </Hidden>
            <Hidden mdUp>
              <div className={style.boxArrowPercent}>
                {coinStatus ? (
                  this.renderArrowPercent(coinPercent)
                ) : (
                  <Close className={style.arrowPercentDisabled} />
                )}
              </div>
            </Hidden>
          </div>
        </div>
      );
    });
  };

  render() {
    let settings = {
      arrows: false,
      draggable: true,
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 959,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    };

    return (
      <div className={style.contentCoins}>
        <Grid container style={{ justifyContent: "center" }}>
          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label={i18n.t("TEXT_PREV")}
                onClick={() => this.moveSlide("prev")}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={10}>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.renderCoins()}
              <Link to="/wallet-settings" className={style.addFavorites}>
                <AddCircle />
              </Link>
            </Slider>
          </Grid>

          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label={i18n.t("TEXT_PREV")}
                onClick={() => this.moveSlide()}
              >
                <KeyboardArrowRight />
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

CoinsBar.propTypes = {
  wallet: PropTypes.object,
  skeleton: PropTypes.object,
  setSelectedCoin: PropTypes.func,
  getWalletCoinHistory: PropTypes.func,
  setWalletCoinHistoryLoading: PropTypes.func
};

const mapSateToProps = store => ({
  wallet: store.wallet,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletCoinHistoryLoading,
      getWalletCoinHistory,
      setSelectedCoin,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsBar);
