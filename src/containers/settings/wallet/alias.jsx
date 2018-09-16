import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLES
import style from "./style.css";

class AliasPage extends React.Component {
  render() {
    let { coins, errorInput } = this.props;

    return (
      <div>
        <Hidden smUp>
          <div className={style.description}>
            {" "}
            {i18n.t("SET_ALIAS_DESCRIPTION")}{" "}
          </div>
        </Hidden>

        <div className={style.box}>
          <Hidden xsDown>
            <div className={style.description}>
              {" "}
              {i18n.t("SET_ALIAS_DESCRIPTION")}{" "}
            </div>
          </Hidden>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={11} md={2}>
              <Grid container>
                <Grid item xs={4} md={12}>
                  <img
                    src={`images/icons/coins/lunes.png`}
                    className={style.coinIconAlias}
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <div className={style.labelCoin}>
                    {i18n.t("SETTINGS_ALIAS_WALLET_LUNES")}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} md={7}>
              <input
                type="text"
                disabled
                className={style.inputClear}
                value={
                  coins["lunes"]
                    ? coins["lunes"].address
                    : i18n.t("MESSAGE_NOT_SERVICE")
                }
              />
              <div>
                <Grid container className={style.aliasNameRow}>
                  <Grid item xs={12} md={8}>
                    <input
                      type="text"
                      className={style.inputClear}
                      disabled
                      value={i18n.t("MESSAGE_NOT_SERVICE")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <button
                      className={style.buttonGreen}
                      onClick={() =>
                        errorInput(i18n.t("MESSAGE_NOT_SERVICE_YET"))
                      }
                    >
                      {i18n.t("SET_ALIAS_SAVE_NAME")}
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

AliasPage.propTypes = {
  coins: PropTypes.array,
  errorInput: PropTypes.func
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ errorInput }, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(AliasPage);
