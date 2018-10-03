import React from "react";
import { Link, withRouter } from "react-router-dom";
import style from "./style.css";
import Grid from "@material-ui/core/Grid";
import i18n from "../../utils/i18n";

class Settings extends React.Component {
  render() {
    return (
      <div>
        <Grid container className={style.containerSettings}>
          <Grid item xs={10} sm={11} className={style.headerSettings}>
            <h2>{i18n.t("SETTINGS_TITLE")}</h2>
            <p>{i18n.t("SETTINGS_HEADER_INFO")}</p>
          </Grid>

          <Grid container className={style.containerCardsSettings}>
            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/user">
                <Grid className={style.cards}>{i18n.t("SETTINGS_CARD_1")}</Grid>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/security">
                <Grid className={style.cards}>{i18n.t("SETTINGS_CARD_2")}</Grid>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/wallet-settings">
                <Grid className={style.cards}>{i18n.t("SETTINGS_CARD_3")}</Grid>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/consent">
                <Grid className={style.cards}>{i18n.t("SETTINGS_CARD_4")}</Grid>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/definitions">
                <Grid className={style.cards}>{i18n.t("SETTINGS_CARD_5")}</Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Settings);
