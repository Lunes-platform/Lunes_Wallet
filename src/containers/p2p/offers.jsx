import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getMyOrders,
  getHistory,
  getFilter,
  clearCancel
} from "./redux/p2pAction";

// MATERIA UI
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLE
import style from "./style.css";
import colors from "../../components/bases/colors";

// COMPONENTS
import CardOffer from "./components/cardOffer";
import Select from "../../components/select";
import Loading from "../../components/loading";
import TabsFilter from "./components/tab";
import Instructions from "./instructions";
import Sort from "./sort";

// UTILS
import i18n from "../../utils/i18n";

const inputStyle = {
  root: {
    color: colors.messages.info,
    padding: "5px",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    borderRadius: "6px",
    border: "solid 1px #654fa4",
    fontSize: "11px",
    height: "20px",
    maxHeight: "20px",
    backgroundImage: "url(images/icons/p2p/search.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "95% center",
    backgroundColor: colors.purple.default,
    "&:hover:before": {
      borderBottom: "none"
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottom: "none"
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottom: "none"
    }
  },
  disabled: {},
  error: {},
  focused: {}
};
class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabGiving: true,
      tabDone: false,
      tabCanceled: false,
      coinSelect: {
        name: "Lunes",
        value: "lunes",
        img: "images/icons/coins/lunes.png"
      },
      listTypeP2P: [
        { title: "Escrow", value: undefined, img: undefined },
        { title: "P2P", value: undefined, img: undefined }
      ],
      listTypeFilter: [
        { title: "Todos", value: undefined, img: undefined },
        { title: "Meus", value: undefined, img: undefined }
      ],
      myOrders: false,
      typeP2P: "P2P",
      typeFilter: "Todos",
      filterTab: 0,
      sortMenu: false,
      typeOfSort: undefined
    };

    this.filterMyOrders = this.filterMyOrders.bind(this);
  }

  coinSelected = (value, title, img = undefined) => {
    const { getFilter } = this.props;
    this.setState({
      ...this.state,
      coinSelect: {
        name: title,
        value,
        img
      }
    });

    getFilter("p2p", value);
  };

  clearCancel = () => {
    const { clearCancel, getFilter } = this.props;

    clearCancel();

    getFilter("p2p", "");
  };

  onChangeTab(status) {
    if (status == 1) {
      this.setState({
        ...this.state,
        tabGiving: true,
        tabDone: false,
        tabCanceled: false
      });
    } else if (status == 2) {
      this.setState({
        ...this.state,
        tabGiving: false,
        tabDone: true,
        tabCanceled: false
      });
    } else {
      this.setState({
        ...this.state,
        tabGiving: false,
        tabDone: false,
        tabCanceled: true
      });
    }

    this.filterMyOrders(false);
  }

  componentDidMount = () => {
    const { coinSelect, typeP2P } = this.state;
    const { getFilter, getHistory, type } = this.props;

    if (type === "myhistory") {
      getHistory(coinSelect.value, typeP2P.toLowerCase());
    } else {
      getFilter("p2p", "");
    }

    setTimeout(() => {
      let contentEL = document.querySelector('.jsContent')
      let showBoxEL = document.querySelector('.jsShowBox')

      let baseHeight = showBoxEL.clientHeight
      let newContentHeight = baseHeight - 59 - 38 - 48 - 35
      contentEL.style.height = newContentHeight+'px'
      this.contentInterval = setInterval(() => {
        let baseHeight = showBoxEL.clientHeight
        let newContentHeight = baseHeight - 59 - 38 - 48 - 35
        if (type === 'myhistory')
          newContentHeight -= 40
        contentEL.style.height = newContentHeight+'px'
      }, 1000)
    }, 1000)
  };

  componentWillUnmount() {
    clearInterval(this.contentInterval)
  }

  renderOders = () => {
    let { orders, loading, type } = this.props;
    const {
      typeOfSort,
      tabGiving,
      tabDone,
      tabCanceled,
      filterTab
    } = this.state;
    if (loading) return <Loading color="lunes" margin={"50% 0% 0% 0%"} />;

    if (typeOfSort) orders = this.sortOrders(orders);

    if (orders.length <= 0)
      return (
        <div className={style.noOrder}>
          <h1>{i18n.t("P2P_NO_ORDER")}</h1>
        </div>
      );
    if (type == "myhistory") {
      return orders.map((val, key) => {
        if (filterTab == 0 && val.way == "buy") {
          if (
            tabGiving &&
            (val.status == "confirming" || val.status == "waiting")
          ) {
            return <CardOffer key={key} order={val} status={val.status} />;
          }

          if (tabDone && val.status == "confirmed") {
            return <CardOffer key={key} order={val} status={val.status} />;
          }

          if (tabCanceled && val.status === "canceled") {
            return <CardOffer key={key} order={val} status={val.status} />;
          }
        }
        if (filterTab == 1 && val.way == "sell") {
          if (
            tabGiving &&
            (val.status == "confirming" || val.status == "waiting")
          ) {
            return <CardOffer key={key} order={val} status={val.status} />;
          }

          if (tabDone && val.status == "confirmed") {
            return <CardOffer key={key} order={val} status={val.status} />;
          }

          if (tabCanceled && val.status === "canceled") {
            return <CardOffer key={key} order={val} status={val.status} />;
          }
        }
      });
    }
    return orders.map((val, key) => {
      return <CardOffer key={key} order={val} type={type} />;
    });
  };

  filterMyOrders = (filtermyorder, title) => {
    const { getFilter, getMyOrders, getHistory, type } = this.props;
    const { coinSelect, myOrders } = this.state;

    if (myOrders == false && type != "myhistory") {
      getMyOrders(coinSelect.value);
    } else if (type == "myhistory") {
      getHistory(coinSelect.value);
    } else {
      getFilter("p2p", "");
    }

    if (filtermyorder) {
      this.setState({
        ...this.state,
        myOrders: !myOrders,
        typeFilter: title
      });
    }
  };

  handleTab = data => {
    const { getHistory } = this.props;
    const { coinSelect } = this.state;
    this.setState({
      ...this.state,
      filterTab: data
    });
    getHistory(coinSelect.value);
  };

  renderContentFilters = () => {
    const { type } = this.props;
    const { tabGiving, tabDone, tabCanceled } = this.state;

    if (type === "myhistory") {
      return (
        <div className={style.tabContent}>
          <div
            className={!tabGiving ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(1)}
          >
            {i18n.t("P2P_STATUS_TEXT_1")}
          </div>
          <div
            className={!tabDone ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(2)}
          >
            {i18n.t("P2P_STATUS_TEXT_2")}
          </div>
          <div
            className={!tabCanceled ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(3)}
          >
            {i18n.t("P2P_STATUS_TEXT_3")}
          </div>
        </div>
      );
    }
    return;
  };
  selectTypeP2P = (value, title) => {
    const { getHistory } = this.props;
    let { coinSelect, typeP2P } = this.state;
    this.setState({
      ...this.state,
      typeP2P: title
    });
    getHistory(coinSelect.value, typeP2P.toLowerCase());
  };

  handleSort = () => {
    this.setState({
      ...this.state,
      sortMenu: !this.state.sortMenu
    });
  };

  selectTypeFilter = (value, title) => this.filterMyOrders(true, title);

  renderMenu = () => {
    const { type, coinsEnabled } = this.props;
    const {
      coinSelect,
      listTypeP2P,
      listTypeFilter,
      typeP2P,
      typeFilter
    } = this.state;
    const titles = [i18n.t("P2P_TAB_PURCHASE"), i18n.t("P2P_TAB_SALE")];

    if (coinsEnabled.length > 0) {
      coinsEnabled.forEach(el => {
        el.title = "";
      });
    }

    return type !== "myhistory" ? (
      <Grid className={style.headerActionFilter} container>
        <Grid
          item
          xs={2}
          style={{ textAlign: "center" }}
          className={style.scrollSelect}
        >
          <Select
            list={coinsEnabled}
            title={""}
            titleImg={coinSelect.img}
            selectItem={this.coinSelected}
            error={null}
            width={"100%"}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3} style={{ textAlign: "center" }}>
          <Select
            list={listTypeFilter}
            title={typeFilter}
            selectItem={this.selectTypeFilter}
            error={null}
            width={"100%"}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3} style={{ textAlign: "center" }}>
          <Select
            list={listTypeP2P}
            title={typeP2P}
            selectItem={this.selectTypeP2P}
            error={null}
            width={"90%"}
          />
        </Grid>
        <Grid item xs={1} style={{ marginTop: "5px", textAlign: "center" }}>
          <div className={style.sort}>
            <img
              src="/images/icons/p2p/sort.png"
              onClick={() => this.handleSort()}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Grid>
        <Grid item xs={1} style={{ marginTop: "5px", textAlign: "center" }}>
          <Instructions />
        </Grid>
        {this.state.sortMenu && <Sort that={this} />}
      </Grid>
    ) : (
      <Grid container style={{ paddingBottom: "1.5rem" }}>
        <TabsFilter
          tabTitles={titles}
          justify="center"
          handleTab={this.handleTab}
        />
      </Grid>
    );
  };

  _sortAscendingOrDescending = (orders, type) => {
    return orders.sort((a, b) => {
      if (!a || !b) return;
      if (!a.sell || !b.sell) return;
      let aAmount = a.sell.amount | 0;
      let bAmount = b.sell.amount | 0;
      if (type == "descending") return bAmount - aAmount;
      return aAmount - bAmount; //ascending is the default sorting method
    });
  };
  _sortByNewestOrOldest = (orders, type) => {
    return orders.sort((a, b) => {
      if (!a || !b) return;
      if (!a.createdAt || !b.createdAt) return;
      let aAmount = new Date(a.createdAt).getTime() | 0;
      let bAmount = new Date(b.createdAt).getTime() | 0;
      if (type == "oldest") return bAmount - aAmount;
      return aAmount - bAmount; //ascending is the default sorting method
    });
  };
  sortOrders = orders => {
    let { typeOfSort } = this.state;
    if (!typeOfSort) return orders;
    if (!orders || (orders && orders.length < 1)) return orders;
    // ascending | descending | newest | oldest
    if (typeOfSort === "ascending" || typeOfSort === "descending") {
      orders = this._sortAscendingOrDescending(orders, typeOfSort);
      return orders;
    }
    if (typeOfSort === "newest" || typeOfSort === "oldest") {
      orders = this._sortByNewestOrOldest(orders, typeOfSort);
      return orders;
    }
    return orders;
  };

  render() {
    const { cancelDone } = this.props;
    if (cancelDone)
      return (
        <div>
          <span className={style.textSuccess}>Cancel done!</span>
          <button className={style.buttonEnable} onClick={this.clearCancel}>
            {i18n.t("P2P_TEXT_2")}
          </button>
        </div>
      );

    return (
      <div>
        {this.renderMenu()}
        {this.renderContentFilters()}
        <div className={style.content+" jsContent"}>{this.renderOders()}</div>
      </div>
    );
  }
}

Offers.propTypes = {
  classes: PropTypes.object.isRequired,
  coinsEnabled: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  orders: PropTypes.array.isRequired,
  getFilter: PropTypes.func,
  getMyOrders: PropTypes.func,
  getHistory: PropTypes.func,
  loading: PropTypes.bool,
  type: PropTypes.string,
  clearCancel: PropTypes.func,
  cancelDone: PropTypes.bool
};

const mapStateToProps = store => ({
  coinsEnabled: store.p2p.coinsEnabled || [],
  orders: store.p2p.orders,
  loading: store.p2p.loading,
  cancelDone: store.p2p.cancelDone
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyOrders,
      getHistory,
      getFilter,
      clearCancel
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(inputStyle)(Offers));
