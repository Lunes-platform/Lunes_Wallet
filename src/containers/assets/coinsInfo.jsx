import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

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

  render() {
    let { assets: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin]

    if (selectedCoin === undefined)
      return null;

    return (
      <div>
        <Grid container className={style.containerInfo}>
          <Grid item xs={11} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                <h3>{asset.tokenName.toUpperCase()}</h3>
                <img
                  src={asset.image ? asset.image : "images/icons/tokens/default.png"}
                  className={style.iconCoinSelected}
                />
              </Grid>
            </Grid>

            <Grid item xs={8} className={style.balanceItem+' '+style.floatRight}>
              <Grid item>
                <h2>{i18n.t("WALLET_BALANCE")}</h2>
                <p>{convertBiggestCoinUnit(asset.balance, 8)}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
