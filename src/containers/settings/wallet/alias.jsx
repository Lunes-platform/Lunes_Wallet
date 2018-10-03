import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { errorInput } from "../../errors/redux/errorAction";
import { createAlias } from "../redux/settingsAction";
import { loading } from "../../user/redux/userAction";
import i18n from "../../../utils/i18n";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import style from "./style.css";
import { convertSmallerCoinUnit } from "../../../utils/numbers";
import Loading from "../../../components/loading";

class AliasPage extends React.Component {
  constructor() {
    super();

    this.state = {
      fieldAlias: "",
      isEnable: true
    };
  }

  handleAliasValue = value => {
    this.setState({ fieldAlias: value });
  };

  componentDidMount() {
    let { aliasCreated, getAliases } = this.props;
    aliasCreated
      ? this.setState({ fieldAlias: aliasCreated })
      : this.setState({ fieldAlias: "" });
  }

  createNewAlias = () => {
    let { createAlias, coins, settings, user, loading } = this.props;
    let { fieldAlias } = this.state;

    let coinName = coins.lunes.abbreviation;
    let coinAddress = coins.lunes.address;
    let decimalPoint = coins.lunes.decimalPoint;
    let fee = convertSmallerCoinUnit(settings.coinFee.low, decimalPoint);
    let password = user.password;
    loading();
    createAlias(coinName, coinAddress, fieldAlias, fee, password);
  };

  renderAliases = () => {
    let { aliasCreated, isLoading } = this.props;
    let { fieldAlias } = this.state;

    if (aliasCreated) {
      return (
        <Grid container className={style.aliasNameRow}>
          <Grid item xs={12} md={8}>
            <input
              type="text"
              maxLength={"30"}
              disabled
              className={style.inputClear}
              onChange={event => this.handleAliasValue(event.target.value)}
              value={fieldAlias}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <button
              disabled
              className={style.buttonGreen}
              onClick={() => this.createNewAlias()}
            >
              {i18n.t("SET_ALIAS_SAVE_NAME")}
            </button>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container className={style.aliasNameRow}>
        <Grid item xs={12} md={8}>
          <input
            type="text"
            maxLength={"30"}
            className={style.inputClear}
            onChange={event => this.handleAliasValue(event.target.value)}
            value={fieldAlias}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <button
            className={style.buttonGreen}
            onClick={() => this.createNewAlias()}
          >
            {isLoading ? <Loading /> : i18n.t("SET_ALIAS_SAVE_NAME")}
          </button>
        </Grid>
      </Grid>
    );
  };

  render() {
    let { coins } = this.props;

    return (
      <div>
        <div className={style.box}>
          <div className={style.description}>
            <p>{i18n.t("SET_ALIAS_DESCRIPTION")}</p>
            <p>
              {i18n.t("ALIAS_RULES_1")}
              <br />
              {i18n.t("ALIAS_RULES_2")}
            </p>
          </div>
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
                  {this.renderAliases()}
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
  errorInput: PropTypes.func,
  createAlias: PropTypes.func,
  getAliases: PropTypes.func,
  settings: PropTypes.object,
  user: PropTypes.object,
  aliasCreated: PropTypes.string,
  isLoading: PropTypes.bool,
  loading: PropTypes.func
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins,
  settings: store.settings,
  user: store.user.user,
  aliasCreated: store.skeleton.lunesCoin.alias,
  isLoading: store.user.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loading,
      createAlias,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(AliasPage);
