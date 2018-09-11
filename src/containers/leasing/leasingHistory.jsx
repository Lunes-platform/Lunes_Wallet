import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setLeasingLoading,
  cancelLeasing,
  getLeasingInfo
} from "../leasing/redux/leasingAction";
import Grid from "@material-ui/core/Grid";
import { formatDate } from "../../utils/numbers";

// STYLES
import style from "./style.css";

// UTILS
import i18n from "../../utils/i18n";

class LeasingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHistory: undefined
    };
  }

  componentDidMount() {
    let { getLeasingInfo, coins } = this.props;
    getLeasingInfo(
      coins.lunes.abbreviation,
      coins.lunes.address,
      coins.lunes.decimalPoint
    );
  }

  stateDataHistory = key => {
    let { toggleHistory } = this.state;

    this.setState({
      toggleHistory: toggleHistory === key ? undefined : key
    });
  };

  handleClass = (index, type) => {
    let { toggleHistory } = this.state;
    if (type === "ACTIVE") {
      return toggleHistory !== undefined && toggleHistory !== index
        ? style.opacityItem
        : style.itemHistorico;
    }

    return style.opacityItem;
  };

  renderBtCancel = (status, txid, type) => {
    let { coinFee, decimalPoint, cancelLeasing, user, coins } = this.props;
    if (status === 1) {
      return (
        <div
          className={style.iconLeasing}
          onClick={() => {
            if (type === "ACTIVE") {
              confirm(i18n.t("MODAL_LEASING_CONFIRM"))
                ? cancelLeasing({
                  txid,
                  coinFee,
                  decimalPoint,
                  password: user.password,
                  coinName: coins.lunes.abbreviation
                })
                : null;
            }
          }}
        >
          <img src="images/icons/general/leasing@1x.png" />
          {i18n.t("LEASING_BT_CANCEL")}
        </div>
      );
    } else {
      return null;
    }
  };

  renderHistory = () => {
    let { toggleHistory } = this.state;
    let { history } = this.props;
    const blockexplorer = "https://blockexplorer.lunes.io/tx/";
    if (history === undefined) {
      return <div className={style.notFound}>
        <center>
          {i18n.t("MESSAGE_NOTHING_FOUND")}
        </center>
      </div>;
    }

    return history.txs.map((value, index) => (
      <div key={index}>
        <div>
          <Grid
            item
            xs={12}
            className={this.handleClass(index, value.type)}
            onClick={() => this.stateDataHistory(index)}
          >
            <Grid item xs={4}>
              {formatDate(value.date, "DM")}
              &nbsp; {formatDate(value.date, "HMS")}
            </Grid>
            <Grid item xs={4}>
              <span className={style.textGreen}>{value.amount}</span>
            </Grid>
            <Grid item xs={4}>
              {this.renderBtCancel(1, value.txID, value.type)}
            </Grid>
          </Grid>

          <div>
            <Grid
              item
              xs={12}
              className={toggleHistory !== index ? style.toggleHistory : null}
            >
              <Grid item xs={12} className={style.itemDataHistorico}>
                <Grid item xs={12} className={style.descriptionHistory}>
                  <div>{i18n.t("LEASING_TITLE_EXPLORER")}</div>
                  <a href={blockexplorer + value.txID} target="blank">
                    {value.txID}
                  </a>
                </Grid>
                {value.to ? (
                  <Grid item xs={12} className={style.descriptionHistory}>
                    <div>{i18n.t("LEASING_TITLE_NODE")}</div>
                    <div>{value.to}</div>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    ));
  };

  loadModalLeasing = () => {
    let { openModal } = this.props;
    openModal();
  };

  render() {
    let { balance, leasingBalance } = this.props;
    return (
      <div>
        <Grid container className={style.containerTransactions}>
          <Grid container item xs={11} sm={10} md={10}>
            <Grid item xs={6} md={4}>
              <div className={style.boxCard}>
                {i18n.t("LEASING_BALANCE_LABEL")}
                <div className={style.strongText}>{balance}</div>
              </div>
            </Grid>

            <Grid item xs={6} md={4}>
              <div className={style.boxCard}>
                {i18n.t("LEASING_BALANCE_ACTIVE")}
                <div className={style.strongTextGreen}>{leasingBalance}</div>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <button
                className={style.buttonEnable}
                onClick={() => this.loadModalLeasing()}
              >
                {i18n.t("LEASING_TITLE_NEW")}
              </button>
            </Grid>
          </Grid>

          <Grid item xs={11} sm={10} md={10}>
            <div className={style.contentTransactions}>
              <Grid container className={style.headerContent}>
                <Grid item xs={4}>
                  {i18n.t("LEASING")}
                </Grid>
                <Grid item xs={4}>
                  {i18n.t("LEASING_TITLE_AMOUNT")}
                </Grid>
                <Grid item xs={4}>
                  {i18n.t("LEASING_TITLE_STATUS")}
                </Grid>
              </Grid>
              {this.renderHistory()}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LeasingHistory.propTypes = {
  openModal: PropTypes.func,
  coins: PropTypes.array.isRequired,
  balance: PropTypes.number,
  history: PropTypes.object,
  setLeasingLoading: PropTypes.func,
  leasingBalance: PropTypes.number,
  cancelLeasing: PropTypes.func,
  getLeasingInfo: PropTypes.func,
  coinFee: PropTypes.number,
  decimalPoint: PropTypes.number,
  user: PropTypes.object
};

const mapStateToProps = store => ({
  coins: store.skeleton.coins,
  balance: store.skeleton.coins.lunes.balance.available,
  history: store.leasing.history.data,
  leasingBalance: store.leasing.balance,
  coinFee: store.leasing.coinFee.low,
  decimalPoint: store.skeleton.coins.lunes.decimalPoint,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLeasingLoading,
      cancelLeasing,
      getLeasingInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeasingHistory);
