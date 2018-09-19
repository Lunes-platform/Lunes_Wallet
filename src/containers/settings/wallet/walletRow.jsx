import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";
import {
  removeFavoritesCrypto,
  setFavoritesCrypto,
  getFavoritesCrypto
} from "../../../utils/localStorage";

// MATERIAL
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

class WalletRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    };
  }

  componentDidMount() {
    let favoritesCoins = getFavoritesCrypto();
    this.setState({
      favorites: favoritesCoins ? favoritesCoins : []
    });
  }

  removeFavorite = coin => {
    let { favorites } = this.state;
    favorites = favorites.filter(item => item !== coin);
    removeFavoritesCrypto(coin);
    this.setState({
      favorites
    });
  };

  addFavorites = coin => {
    let { favorites } = this.state;
    if (!favorites) favorites = [coin];
    favorites.push(coin);
    favorites = favorites.filter((item, index, input) => {
      return input.indexOf(item) == index;
    });
    setFavoritesCrypto(coin);
    this.setState({
      favorites
    });
  };

  renderButtonFav(coin) {
    let favorites = getFavoritesCrypto();

    if (favorites && favorites.indexOf(coin) !== -1) {
      return (
        <button
          onClick={() => this.removeFavorite(coin)}
          className={style.buttonDanger}
        >
          {i18n.t("SET_BUTTON_REMOVE")}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => this.addFavorites(coin)}
          className={style.buttonPurple}
        >
          {i18n.t("SET_BUTTON_FAV")}
        </button>
      );
    }
  }

  render() {
    const { coin } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={2} md={1}>
          <img
            src={"images/icons/coins/" + coin.abbreviation + ".png"}
            className={style.coinIcon}
          />
        </Grid>
        <Grid item xs={7} md={8}>
          <input
            type="text"
            disabled
            value={coin.address || i18n.t("TEXT_UNAVAILABLE")}
            className={style.inputClear}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          {this.renderButtonFav(coin.abbreviation)}
        </Grid>
      </Grid>
    );
  }
}

WalletRow.propTypes = {
  coin: PropTypes.object.isRequired
};

export default WalletRow;
