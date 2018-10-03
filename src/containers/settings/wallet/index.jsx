import React from "react";
import { Link } from "react-router-dom";
import i18n from "../../../utils/i18n";
import Tabs from "../../../components/tabs";
import AliasPage from "./alias";
import FavoritePage from "./favorite";
import SeedWordsPage from "./seed";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import style from "./style.css";

const titles = ["Favoritos", "Alias", "SeedWords"];
const contents = [
  <FavoritePage key="1" />,
  <AliasPage key="2" />,
  <SeedWordsPage key="3" />
];

class WalletSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid container className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("SETTING_WALLETS_TITLE")} </h3>
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
                <h3>{i18n.t("SETTING_WALLETS_TITLE")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>
        <Grid container display="flex" justify="center">
          <Grid item xs={12} sm={9} className={style.alignContentTab}>
            <Tabs tabTitles={titles} tabContents={contents} justify="center" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default WalletSettings;
