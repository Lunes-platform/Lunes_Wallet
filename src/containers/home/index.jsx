import React from "react";
import { Link } from "react-router-dom";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../utils/i18n";

class Home extends React.Component {
  render() {
    return (
      <div className={style.boxContainer}>
        <Grid container className={style.homeContainer}>
          <Grid item>
            <div className={style.cardHome}>
              <img
                src="/images/icons/general/wallet@2x.png"
                className={style.cardIcon}
              />
              <div className={style.cardTitle}>
                {i18n.t("CARD_HOME_TITLE_1")}
              </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_1")}
              </div>

              <Link to="/wallet">
                <button className={style.buttonCard}>{i18n.t("BTN_GO")}</button>
              </Link>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardHome}>
              <img
                src="/images/icons/general/leasing@2x.png"
                className={style.cardIcon}
              />
              <div className={style.cardTitle}>
                {i18n.t("CARD_HOME_TITLE_2")}{" "}
              </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="/leasing">
                <button className={style.buttonCard}>{i18n.t("BTN_GO")}</button>
              </Link>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardHome}>
              <img
                src="/images/icons/general/pay@2x.png"
                className={style.cardIcon}
              />
              <div className={style.cardTitle}>
                {i18n.t("CARD_HOME_TITLE_4")}
              </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_4")}
              </div>

              <Link to="/home">
                <button className={style.buttonCard}>{i18n.t("BTN_GO")}</button>
              </Link>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardHome}>
              <img
                src="/images/icons/general/configuration@2x.png"
                className={style.cardIcon}
              />
              <div className={style.cardTitle}>
                {i18n.t("CARD_HOME_TITLE_5")}
              </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_5")}
              </div>

              <Link to="/wallet-settings">
                <button className={style.buttonCard}>{i18n.t("BTN_GO")}</button>
              </Link>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardHome}>
              <img
                src="/images/icons/general/cupon@2x.png"
                className={style.cardIcon}
              />
              <div className={style.cardTitle}>
                {i18n.t("CARD_HOME_TITLE_6")}
              </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_6")}
              </div>

              <Link to="/coupons">
                <button disabled className={style.buttonCard}>
                  {i18n.t("BTN_GO")}
                </button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;
