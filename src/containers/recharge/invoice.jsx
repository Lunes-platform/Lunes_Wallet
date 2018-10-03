import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCoinsEnabled,
  getOperators,
  getValoresRecarga,
  setRecharge,
  setClearRecharge
} from "./redux/rechargeAction";

// COMPONENTS
import Select from "../../components/select";
import colors from "../../components/bases/colors";
import Loading from "../../components/loading";
import Instructions from "../recharge/instructions";
import { PhoneMask } from "../../components/inputMask";

// MATERIAL
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// UTILS
import { inputValidator } from "../../utils/inputValidator";
import i18n from "../../utils/i18n";

// STYLES
import style from "./style.css";

const customStyle = {
  inputRoot: {
    fontSize: "22px",
    color: colors.messages.info,
    margin: "0.5rem 0",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  inputCss: {
    color: colors.messages.info,
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "22px",
    letterSpacing: "0.5px",
    textAlign: "center",
    paddingLeft: "10px"
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "16px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  inputCssUnderlineDisabled: {
    "&:before, &:after": {
      display: "none"
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      disableNumberInput: false,
      invoiceLoading: false,
      coin: {
        name: undefined,
        value: undefined,
        img: undefined
      },
      invoice: {
        coin: null,
        phone: "",
        operadora: {
          value: null,
          title: i18n.t("RECHARGE_SELECT_TITLE_OPERATOR")
        },
        valor: {
          value: null,
          title: i18n.t("RECHARGE_SELECT_TITLE_VALUE")
        }
      }
    };

    this.coinSelected = this.coinSelected.bind(this);
    this.handleOperadora = this.handleOperadora.bind(this);
    this.handleValor = this.handleValor.bind(this);
  }

  componentDidMount() {
    const { getCoinsEnabled, setClearRecharge } = this.props;
    setClearRecharge();
    getCoinsEnabled();
  }

  coinSelected = (value, title, img = undefined) => {
    this.setState({
      ...this.state,
      coin: {
        name: title,
        value,
        img
      },
      invoice: {
        ...this.state.invoice,
        coin: value
      }
    });
  };

  handleOperadora = (value, title) => {
    const { getValoresRecarga } = this.props;

    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        operadora: {
          value: value,
          title: title
        },
        valor: {
          value: null,
          title: i18n.t("RECHARGE_SELECT_TITLE_VALUE")
        }
      }
    });

    getValoresRecarga(value, this.state.invoice.ddd);
  };

  handleValor = (value, title) => {
    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        valor: {
          value: value,
          title: title
        }
      }
    });
  };

  handleField = name => event => {
    const { getOperators } = this.props;

    const telefone = event.target.value;

    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        [name]: telefone,
        ddd: telefone.length == 2 ? telefone : this.state.invoice.ddd,
        operadora: {
          value:
            telefone.length == 2 ? null : this.state.invoice.operadora.value,
          title:
            telefone.length == 2
              ? i18n.t("RECHARGE_SELECT_TITLE_OPERATOR")
              : this.state.invoice.operadora.title
        },
        valor: {
          value: telefone.length == 2 ? null : this.state.invoice.valor.value,
          title:
            telefone.length == 2
              ? i18n.t("RECHARGE_SELECT_TITLE_VALUE")
              : this.state.invoice.valor.title
        }
      }
    });

    if (telefone.length == 2) {
      getOperators(telefone);
    }
  };

  setDefaultState = () => {
    const emptyValue = {
      errors: [],
      disableNumberInput: false,
      invoiceLoading: false,
      coin: {
        name: undefined,
        value: undefined,
        img: undefined
      },
      invoice: {
        coin: null,
        phone: "",
        operadora: {
          value: null,
          title: i18n.t("RECHARGE_SELECT_TITLE_OPERATOR")
        },
        valor: {
          value: null,
          title: i18n.t("RECHARGE_SELECT_TITLE_VALUE")
        }
      }
    };

    this.setState(emptyValue);
  };

  inputValidator = () => {
    const { openModal, setRecharge, coins } = this.props;
    const { invoice, coin } = this.state;

    const invoiceData = {
      value: invoice.valor.value,
      number: invoice.phone,
      coin: invoice.coin,
      operatorId: invoice.operadora.value,
      operatorName: invoice.operadora.title,
      address: coins[invoice.coin.abbreviation].address
    };

    const invoiceInputs = {};

    for (const key in invoiceData) {
      if (invoiceData.hasOwnProperty(key)) {
        invoiceInputs[key] = {
          type: "text",
          name: key,
          placeholder: key,
          value: invoiceData[key],
          required: true
        };
      }

      if (key === "number") {
        invoiceInputs[key]["minLength"] = 11;
      }
    }

    const coinInput = {
      type: "text",
      name: "coin",
      placeholder: "coin",
      value: invoiceData.coin.abbreviation || coin.value.abbreviation || "",
      required: true
    };

    const { errors } = inputValidator({ ...invoiceInputs, coin: coinInput });

    if (errors.length > 0) {
      this.setState({
        ...this.state,
        errors
      });
      return;
    }

    openModal();
    setRecharge(invoiceData);
    this.setDefaultState();
  };

  checkAllInputs = () => {
    const { invoice, coin } = this.state;

    return (
      invoice.phone &&
      invoice.operadora.value &&
      invoice.valor.value &&
      coin.value
    );
  };

  render() {
    const {
      classes,
      loading,
      coinsRedux,
      operadoras,
      valores,
      loadingValores
    } = this.props;
    const { coin, errors, invoice } = this.state;

    const title = coin.name || "Select a coin..";
    const img = coin.img || "";

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box} style={{ padding: 5 }}>
          <Grid container direction="row" justify="center">
            <Grid item xs={8}>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderlineDisabled,
                  input: classes.inputCss
                }}
                placeholder={"(00)9999-9999"}
                value={this.state.invoice.phone}
                onChange={this.handleField("phone")}
                error={errors.includes("phone")}
                inputComponent={PhoneMask}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={style.box} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6} className={style.alignSelectItem_1}>
            <Select
              list={operadoras}
              title={invoice.operadora.title}
              error={errors.includes(i18n.t("RECHARGE_SELECT_TITLE_OPERATOR"))}
              selectItem={this.handleOperadora}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={style.alignSelectItem_2}>
            <Select
              list={valores}
              title={invoice.valor.title}
              error={errors.includes("valor")}
              selectItem={this.handleValor}
            />
          </Grid>

          {loadingValores ? (
            <div style={{ margin: "10px auto", textAlign: "center" }}>
              <Loading color="lunes" />
            </div>
          ) : null}
        </Grid>

        <Grid
          item
          xs={12}
          className={style.box}
          style={{ marginTop: "10px", paddingTop: 40, paddingBottom: 40 }}
        >
          <Grid container justify={"center"}>
            <Grid item xs={12} sm={6}>
              <Select
                list={coinsRedux}
                title={title}
                titleImg={img}
                selectItem={this.coinSelected}
                error={errors.includes("coin")}
                width={"100%"}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          className={style.transparentBox}
          style={{ marginTop: "10px" }}
        >
          <button
            className={
              this.checkAllInputs()
                ? style.buttonEnable
                : style.buttonBorderGreen
            }
            onClick={this.inputValidator}
          >
            {loading ? <Loading /> : i18n.t("RECHARGE_BT_INIT")}
          </button>
        </Grid>

        <Grid
          item
          xs={12}
          className={style.transparentBox}
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          <Instructions />
        </Grid>
      </Grid>
    );
  }
}

Invoice.propTypes = {
  classes: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  setRecharge: PropTypes.func.isRequired,
  coinsRedux: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingValores: PropTypes.bool.isRequired,
  operadoras: PropTypes.array.isRequired,
  valores: PropTypes.array.isRequired,
  getCoinsEnabled: PropTypes.func.isRequired,
  getValoresRecarga: PropTypes.func.isRequired,
  getOperators: PropTypes.func.isRequired,
  setClearRecharge: PropTypes.func.isRequired,
  coins: PropTypes.array
};

const mapStateToProps = store => ({
  coinsRedux: store.payment.coins,
  loading: store.recharge.loading,
  loadingValores: store.recharge.loadingValores,
  operadoras: store.recharge.operadoras,
  valores: store.recharge.valores,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOperators,
      getValoresRecarga,
      getCoinsEnabled,
      setRecharge,
      setClearRecharge
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(Invoice));
