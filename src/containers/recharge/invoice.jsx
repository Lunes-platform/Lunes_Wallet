import React from "react";
import i18n from "../../utils/i18n";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCoinsEnabled } from "./redux/rechargeAction";

// COMPONENTS
import Select from "../../components/select";
import colors from "../../components/bases/colors";
import Loading from "../../components/loading";
import Instructions from "../../components/instructions";
import { PhoneMask } from "../../components/inputMask";

// MATERIAL
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// UTILS
import { inputValidator } from "../../utils/inputValidator";

// STYLES
import style from "./style.css";

const customStyle = {
  inputRoot: {
    fontSize: '22px',
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
        phone: null,
        operadora: {
          value: null,
          title: "Operadora"
        },
        valor: {
          value: null,
          title: "Valor"
        }
      }
    };

    this.coinSelected = this.coinSelected.bind(this);
    this.handleOperadora = this.handleOperadora.bind(this);
    this.handleValor = this.handleValor.bind(this);
  }

  componentDidMount() {
    const { getCoinsEnabled } = this.props;
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
    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        operadora: {
          value: value,
          title: title
        }
      }
    });

    // console.log(this.state);
  }

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

    // console.log(this.state);
  }

  handleField = name => event => {
    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        [name]: event.target.value
      }
    });
  };

  openModal = () => {
    const { openModal } = this.props;
    openModal();
  };

  setPayment = data => {
    // const { setPayment } = this.props;
    // setPayment(data);
  };

  inputValidator = () => {

    const { invoice, coin } = this.state;

    const invoiceData = {
      ...invoice
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

    this.openModal();
  };

  render() {
    const { classes, loading, coinsRedux } = this.props;
    const { coin, errors, invoice } = this.state;

    const title = coin.name || "Select a coin..";
    const img = coin.img || "";

    return (
      <Grid container direction="row" justify="center">

        <Grid container className={style.box}>
          <Grid item xs={12} sm={6} className={style.alignSelectItem_1}>
            <Select
              list={[{ value: "vivo", title: "VIVO" }, { value: "vivo", title: "VIVO" },]}
              title={invoice.operadora.title}
              error={errors.includes("operadora")}
              selectItem={this.handleOperadora}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={style.alignSelectItem_2}>
            <Select
              list={[{ value: "15", title: "R$15,00" }, { value: "15", title: "R$15,00" },]}
              title={invoice.valor.title}
              error={errors.includes("valor")}
              selectItem={this.handleValor}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.box} style={{ marginTop: "10px", padding: 5 }}>

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

            {/* <Grid item xs={4}>
              <button
                className={style.buttonPurple}
                onClick={()=>alert(1)}
              >
                {loading ? <Loading /> : "FAVORITAR"}
              </button>
            </Grid> */}
          </Grid>

        </Grid>

        <Grid item xs={12} className={style.box} style={{ marginTop: "10px", paddingTop: 40, paddingBottom: 40 }}>
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
            className={style.buttonBorderGreen}
            onClick={this.inputValidator}
          >
            {loading ? <Loading /> : "EFETUAR RECARGA"}
          </button>
        </Grid>

        <Grid
          item
          xs={12}
          className={style.transparentBox}
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          <Instructions>
            {i18n.t("TEXT_ATTENTION")}<br />
            {i18n.t("PAYMENT_CONFIRM_3")}
            </Instructions>
        </Grid>
      </Grid>
    );
  }
}

Invoice.propTypes = {
  classes: PropTypes.object,
  openModal: PropTypes.func
};

const mapStateToProps = store => ({
  coinsRedux: store.payment.coins,
  loading: store.recharge.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // getInvoice,
      getCoinsEnabled,
      // setPayment
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(Invoice));
