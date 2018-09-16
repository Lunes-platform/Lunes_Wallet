import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

class NotFoundError extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <Grid className={style.alignMainError}>
          <Grid className={style.mainError}>
            <Grid item xs={11} className={style.contentError}>
              <h1> {"4"} </h1>
              <h1> {"0"} </h1>
              <h1> {"4"} </h1>
              <img src="./images/lunio/lunio-error@1x.gif" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.alignItemsError}>
          <Grid item xs={11} className={style.itemsError404}>
            <h2> {i18n.t("PAGE_ERROR_404")} </h2>
            <Link to="/">
              <button className={style.buttonToHome}>
                {i18n.t("BTN_HOME")}
              </button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NotFoundError;
