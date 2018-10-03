import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHistoryRecharge } from "../redux/rechargeAction";

// MATERIAL UI
import Search from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Input, InputAdornment, IconButton } from "@material-ui/core";

// COMPONENTS
import HistoryItem from "./historyItem";
import Loading from "../../../components/loading";

// STYLES
import style from "./style.css";
import colors from "../../../components/bases/colors";

// UTILS
import i18n from "../../../utils/i18n";

const customStyle = {
  inputRoot: {
    color: colors.messages.info,
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  inputCss: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.5px"
  },
  inputCssUnderlineDisabled: {
    "&:before, &:after": {
      display: "none"
    }
  },
  iconRoot: {
    color: colors.messages.info
  },
  disabled: {},
  error: {},
  focused: {}
};

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      historyState: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount = () => {
    const { getHistoryRecharge } = this.props;
    getHistoryRecharge();
  };

  handleSearchChange = event => {
    this.setState({
      ...this.state,
      search: event.target.value
    });
  };

  renderItem = (val, key) => {
    const { search } = this.state;
    if (val.phone.toString().indexOf(search.toLowerCase()) != -1) {
      return <HistoryItem key={key} item={val} />;
    }
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const { classes, history, loading } = this.props;
    const { search } = this.state;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.transparentBox}>
          <Grid container>
            <Grid item xs={4} sm={3}>
              <div className={style.headerBox} style={{ marginRight: "2px" }}>
                <div className={style.icon}>
                  <img src="/images/icons/general/pay@1x.png" alt="Payments" />
                </div>
                <div className={style.invoiceInfo}>
                  {history.length}
                  <br />
                  {i18n.t("RECHARGE_TAB_TITLE_HISTORY")}
                </div>
              </div>
            </Grid>
            <Grid item xs={8} sm={9}>
              <div className={style.headerBox}>
                <Input
                  value={search}
                  onChange={this.handleSearchChange}
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderlineDisabled,
                    input: classes.inputCss
                  }}
                  placeholder={i18n.t("RECHARGE_FIND")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Search"
                        onClick={this.handleFilter}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        <Search classes={{ root: classes.iconRoot }} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.box}>
          {loading ? (
            <Loading color="lunes" />
          ) : (
            <div className={style.historyItems}>
              {history.map((val, key) => this.renderItem(val, key))}
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.array.isRequired,
  getHistoryRecharge: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = store => ({
  history: store.recharge.history,
  loading: store.recharge.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getHistoryRecharge
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(History));
