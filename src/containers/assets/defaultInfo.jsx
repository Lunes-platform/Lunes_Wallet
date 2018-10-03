import React from 'react'

// STYLE
import style from "./style.css";

// MATERIAL
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../utils/i18n";

class DefaultInfo extends React.Component {
  render() {
    return(
      <Grid container className={style.containerInfo}>
        <Grid item xs={11} sm={7} md={6} className={style.defaultInfo}>
          <h1>{i18n.t("ASSETS_SELECT_A_TOKEN_ABOVE")}</h1>
        </Grid>
      </Grid>
    );
  }
}

export default DefaultInfo;
