import React from "react";
import i18n from "../../../utils/i18n";
import PropTypes from "prop-types";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getHistoryPay} from "../redux/paymentAction";


import { Grid, Input, InputAdornment, IconButton } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import colors from "../../../components/bases/colors";
import style from "./style.css";

import HistoryItem from "./historyItem";

const customStyle = {
  inputRoot: {
    color: colors.messages.info,
    width: 'calc(100% - 20px)',
    "&:hover:before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  inputCss: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
  inputCssUnderlineDisabled: {
    "&:before, &:after": {
      display: 'none',
    },
  },
  iconRoot: {
    color: colors.messages.info,
  },
  disabled: {},
  error: {},
  focused: {},
}


class History extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount = () => {
    const {getHistoryPay} = this.props;
    getHistoryPay(); // lista de historico
  }

  handleSearchChange = event => {
    this.setState({
      ...this.state,
      search: event.target.value
    })
  }

  handleFilter = () => {
    const {search} = this.state;
    console.log('Filter results: ', search);
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  render() {
    const {classes,history} = this.props;
    const {search} = this.state;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.transparentBox}>
          <Grid container>
            <Grid item xs={4} sm={3}>
              <div className={style.headerBox} style={{marginRight: '2px'}}>
                <div className={style.icon}>
                  <img src="/images/icons/general/pay@1x.png" alt="Payments"/>
                </div>
                <div className={style.invoiceInfo}>
                  23
                  <br />
                  Boletos
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
                  placeholder={i18n.t("PAYMENT_FIND_NAME")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Search"
                        onClick={this.handleFilter}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        <Search classes={{root: classes.iconRoot}}/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.box}>
          <div className={style.historyItems}>
            {history.map((val,key) => (
              <HistoryItem key={key} item={val} />
            ))}
          </div>
        </Grid>
      </Grid>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object
}

const mapStateToProps = store => ({
  history: store.payment.history
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getHistoryPay
  }, dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(History));

