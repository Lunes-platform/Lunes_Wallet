import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setSelectedCoin,
  getAssetHistory,
} from "./redux/assetsAction";
import { errorInput } from "../errors/redux/errorAction";


// COMPONENTS
import Loading from "../../components/loading.jsx";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// MATERIAL ICONS
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

// UTILS
import i18n from "../../utils/i18n";
import { getAssetInfo } from "../../utils/assets";

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

  setCoin = (assetId) => {
    let { setSelectedCoin } = this.props;
    setSelectedCoin(assetId);
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  renderCoins = () => {
    let { assets, selectedCoin, isBalanceLoading } = this.props.assets;


    if (isBalanceLoading)
      return <div className={style.infoBarLoading}><Loading/></div>

    if (!assets) {
      return null;
    }

    return assets.map((asset, index) => {
      asset = assets[index];

      asset = {
        ...asset,
        ...getAssetInfo(asset.assetId)
      }

      if (!asset) return null;

      asset.status = asset.assetId === selectedCoin ? true : false;

      asset.icon = asset.icon ? asset.icon : 'default.png';

      asset.name = asset.name ? asset.name.replace(/(\s?token)/i, '') : i18n.t("UNKNOWN")

      return (
        <div
          className={asset.status ? null : style.boxCoinDisabled}
          key={index}
          onClick={ () => this.setCoin(asset.assetId) }
        >
          <div
            className={
              asset.status ? style.boxCoinActive : style.boxCoin
            }
          >
            <div className={style.boxIconCoin}>
              <img
                className={style.iconCoin}
                src={`images/icons/tokens/${asset.icon}`}
              />
            </div>
            <Hidden smDown>
              <div className={style.boxHiddenContent}>
                { asset.abbreviation ? asset.abbreviation.toUpperCase() : i18n.t("UNKNOWN") }
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
  assets: PropTypes.object,
  setSelectedCoin: PropTypes.func,
  getAssetHistory: PropTypes.func,
};

const mapSateToProps = store => ({
  wallet: store.wallet,
  assets: store.assets
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAssetHistory,
      setSelectedCoin,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsBar);
