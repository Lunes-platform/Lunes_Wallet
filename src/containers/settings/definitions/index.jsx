import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "recompose";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import CustomSelectImage from "./customSelectImage";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "./style.css";

// UTILS
import {
  setDefinitionMetadata,
  getDefinitionMetadata,
  setDefaultCrypto,
  setDefaultFiat,
  getDefaultCrypto,
  getDefaultFiat
} from "../../../utils/localStorage";

const materialStyle = theme => ({
  iOSSwitchBase: {
    "&$iOSChecked": {
      color: "#ffffff",
      "& + $iOSBar": {
        backgroundColor: "#52d869"
      }
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: "translateX(15px)",
    "& + $iOSBar": {
      opacity: 1,
      border: "none"
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: "none",
    backgroundColor: "#ccc",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  iOSIcon: {
    width: 24,
    height: 24
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
});
class Definitions extends React.Component {
  constructor() {
    super();
    this.state = {
      switchBoxA: true,
      coinValue: "LUNES",
      currencyValue: "USD"
    };
  }

  componentDidMount() {
    let currencyDefault = getDefaultFiat();
    let cryptoDefault = getDefaultCrypto();
    let metadata = JSON.parse(getDefinitionMetadata());

    if (metadata === null) {
      metadata = true;
    }

    if (currencyDefault === null) setDefaultFiat("USD");

    if (cryptoDefault === null) setDefaultCrypto("LUNES");

    this.setState({ switchBoxA: metadata });
    this.setState({ coinValue: cryptoDefault.toUpperCase() });
    this.setState({ currencyValue: currencyDefault.toUpperCase() });
  }

  handleSwitchBoxA = () => {
    let { switchBoxA } = this.state;

    setDefinitionMetadata(!switchBoxA);
    this.setState({ switchBoxA: !switchBoxA });
  };

  renderSelectCoins = () => {
    let { coins } = this.props;

    return Object.keys(coins).map(
      (coin, index) => (
        (coin = coins[coin]),
        (
          <div key={index}>
            <div>
              <img src={"images/icons/coins/" + coin.abbreviation + ".png"} />
              <div
                onClick={() => this.selectCoin(coin.abbreviation.toUpperCase())}
              >
                {coin.abbreviation.toUpperCase()}
              </div>
            </div>
          </div>
        )
      )
    );
  };

  renderSelectCurrency = () => {
    let currency = ["BRL", "USD", "EUR"];

    return currency.map((value, index) => (
      <div key={index}>
        <img src={"images/lang/" + value + ".png"} />
        <div onClick={() => this.selectCurrency(value)}>{value}</div>
      </div>
    ));
  };

  selectCurrency = currency => {
    if (!currency) {
      setDefaultFiat("usd");
    }
    setDefaultFiat(currency.toLowerCase());

    this.setState({
      currencyValue: currency
    });
  };

  selectCoin = coin => {
    if (!coin) {
      setDefaultCrypto("lunes");
    }

    setDefaultCrypto(coin.toLowerCase());
    this.setState({
      coinValue: coin
    });
  };

  render() {
    const { classes } = this.props;
    const { switchBoxA, coinValue, currencyValue } = this.state;

    return (
      <Grid container justify="center">
        <Grid container className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("DEFINITIONS_TITLE")} </h3>
              </Grid>
            </Hidden>
            <Grid item sm={2} />

            <Grid item xs={6} sm={2}>
              <Link to="settings">
                <p>{i18n.t("SETTING_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("DEFINITIONS_TITLE")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={11} sm={8}>
          <div className={style.box}>
            <h2>{i18n.t("SET_DEFINITIONS_TITLE1")}</h2>
            <div className={style.description}>
              {i18n.t("SET_DEFINITIONS_DESC1")}
            </div>

            <hr className={style.line} />

            <Grid container justify="center" className={style.formDefinition}>
              <Grid item xs={11} md={4}>
                {i18n.t("SET_DEFINITIONS_LABEL_CURR")}
                <CustomSelectImage
                  type={"fiat"}
                  action={this.renderSelectCurrency}
                  image={"images/lang/" + currencyValue + ".png"}
                  value={currencyValue}
                />
              </Grid>
              <Grid item xs={11} md={4}>
                {i18n.t("SET_DEFINITIONS_LABEL_COIN")}
                <CustomSelectImage
                  type={"crypto"}
                  action={this.renderSelectCoins}
                  image={
                    "images/icons/coins/" +
                    coinValue.toLocaleLowerCase() +
                    ".png"
                  }
                  value={coinValue}
                />
              </Grid>
            </Grid>

            <hr className={style.line} />

            <h2>{i18n.t("SET_DEFINITIONS_TITLE2")}</h2>
            <div className={style.formSwitch}>
              {i18n.t("SET_DEFINITIONS_OPTION1")}

              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked
                }}
                onClick={() => this.handleSwitchBoxA()}
                disableRipple
                checked={switchBoxA}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Definitions.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins
});

export default compose(
  withStyles(materialStyle),
  connect(
    mapSateToProps,
    null
  )
)(Definitions);
