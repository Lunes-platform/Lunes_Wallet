import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCoinsEnabled,
  setPayment,
  getInvoice,
  setClearPayment,
  uploadBarcode
} from "./redux/paymentAction";
import { errorInput } from "../errors/redux/errorAction";
import { getPaymentMethodService } from "../deposit/redux/depositAction";

// COMPONENTS
import Select from "../../components/select";
import Instructions from "../payment/instructions";
import colors from "../../components/bases/colors";
import Loading from "../../components/loading";
import { DateMask, MoneyBrlMask } from "../../components/inputMask";

// MATERIAL
import { Grid, Input, InputAdornment, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLES
import style from "./style.css";

// UTILS
import { inputValidator } from "../../utils/inputValidator";
import i18n from "../../utils/i18n";

const customStyle = {
  inputRoot: {
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
    fontSize: "14px",
    letterSpacing: "0.5px",
    textAlign: "left",
    paddingLeft: "10px"
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
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
      invoice: {
        number: "",
        assignor: "",
        name: "",
        description: "",
        dueDate: "",
        cpfCnpj: "",
        value: "",
        coin: {
          abbreviation: "",
          address: ""
        }
      },
      coin: {
        name: undefined,
        value: undefined,
        img: undefined
      },
      selectedPaymentMethod: {
        title: undefined,
        value: undefined
      }
    };
    this.handlePayment = this.handlePayment.bind(this);
    this.coinSelected = this.coinSelected.bind(this);
  }

  componentDidMount() {
    const {
      getCoinsEnabled,
      setClearPayment,
      getPaymentMethodService
    } = this.props;
    setClearPayment();
    getCoinsEnabled();
    getPaymentMethodService(4);
  }

  coinSelected = (value, title, img = undefined) => {
    const { invoice } = this.state;

    this.setState({
      ...this.state,
      coin: {
        name: title,
        value,
        img
      },
      invoice: {
        ...invoice,
        coin: value
      },
      serviceCoinId: null
    });
  };
  searchServiceCoinId = value => {
    const { methodPaymentsList } = this.props;
    let id = null;
    methodPaymentsList.forEach((element, index) => {
      if (element.id === value) {
        id = element.serviceCoinId;
      }
    });
    if (id !== null) return id;

    return;
  };
  handlePayment = (value, title) => {
    let serviceCoinId = this.searchServiceCoinId(value);
    this.setState({
      ...this.state,
      selectedPaymentMethod: {
        value: value,
        title: title
      },
      serviceCoinId
    });
  };

  setDefaultState = () => {
    const emptyValue = {
      number: "",
      assignor: "",
      name: "",
      description: "",
      dueDate: "",
      cpfCnpj: "",
      value: "",
      coin: {
        abbreviation: "",
        address: ""
      }
    };

    this.setState({
      ...this.state,
      disableNumberInput: false,
      invoice: emptyValue,
      coin: {
        name: undefined,
        value: undefined,
        img: undefined
      }
    });
  };

  handleInvoiceNumberChange = value => {
    const { getInvoice, setClearPayment } = this.props;
    const { invoice, disableNumberInput } = this.state;
    const newValue = value.replace(/\D/, "");

    this.setState({
      ...this.state,
      disableNumberInput: newValue.length === 48,
      invoice: {
        ...invoice,
        number: newValue
      }
    });

    if (newValue.length == 0) {
      this.setDefaultState();
      setClearPayment();
    } else if (newValue.length >= 47) {
      if (disableNumberInput) {
        return;
      }

      this.setState({
        invoice: {
          ...invoice,
          number: newValue,
          assignor: "",
          dueDate: "",
          value: "",
          description: ""
        }
      });

      getInvoice(newValue);
    }
  };

  normalizeInvoiceNumber = e => {
    const chars = e.target.value.length;
    let number = e.target.value;

    for (let i = 0; i < chars; i++) {
      number = number.replace(/\D/, "");
    }

    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        number: number
      }
    });
  };

  handleCpfCnpjChange = event => {
    const { invoice } = this.state;

    this.setState({
      invoice: {
        ...invoice,
        cpfCnpj: event.target.value.replace(/\D/, "")
      }
    });
  };

  handleInvoiceDefaultChange = name => event => {
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
    const { setPayment } = this.props;
    setPayment(data);
  };

  inputValidator = () => {
    const { payment, coins, errorInput } = this.props;
    const { invoice, coin, selectedPaymentMethod, serviceCoinId } = this.state;

    const coinBLRL =
      selectedPaymentMethod.value === 4
        ? payment.value
        : coins[invoice.coin.abbreviation].decimalPoint;
    const addr =
      selectedPaymentMethod.value === 4
        ? ""
        : coins[invoice.coin.abbreviation]
          ? coins[invoice.coin.abbreviation].address
          : undefined;
    let invoiceData = {
      ...invoice,
      assignor: payment.assignor || invoice.assignor,
      dueDate: payment.dueDate || invoice.dueDate,
      value: payment.value || invoice.value,
      description: payment.description || invoice.description,
      decimalPoint: coinBLRL,
      address: addr,
      servicePaymentMethodId: selectedPaymentMethod.value
    };
    if (selectedPaymentMethod.value === 3) {
      if (invoiceData.value > coin.value.limit) {
        errorInput("Valor excede o limite diário de R$ " + coin.value.limit);
        return;
      }
    }

    const invoiceInputs = {};

    for (const key in invoiceData) {
      if (invoiceData.hasOwnProperty(key)) {
        invoiceInputs[key] = {
          type: key === "dueDate" ? "date" : "text",
          name: key,
          placeholder: key,
          value: invoiceData[key],
          required: true
        };
      }

      if (key === "number") {
        invoiceInputs[key]["minLength"] = 47;
      }
    }
    if (selectedPaymentMethod.value === 3) {
      const coinInput = {
        type: "text",
        name: "coin",
        placeholder: "coin",
        value: invoiceData.coin.abbreviation || coin.name || "",
        required: true
      };

      const { errors } = inputValidator({ ...invoiceInputs, coin: coinInput });

      if (payment.error) {
        errors.push("number");
      }

      if (errors.length > 0) {
        this.setState({
          ...this.state,
          errors
        });
        return;
      }
    } else {
      invoiceData = {
        ...invoiceData,
        serviceCoinId: serviceCoinId
      };
    }
    this.setPayment(invoiceData);
    this.openModal();
    this.setDefaultState();

    return;
  };

  checkAllInputs = () => {
    const { invoice, coin, selectedPaymentMethod } = this.state;
    const { payment } = this.props;
    return (
      invoice.number &&
      invoice.name &&
      invoice.cpfCnpj &&
      (payment.assignor || invoice.assignor) &&
      (payment.description || invoice.description) &&
      (payment.dueDate || invoice.dueDate) &&
      (payment.value || invoice.value) &&
      (coin.value || selectedPaymentMethod.value === 4)
    );
  };

  fileUpload = e => {
    const { uploadBarcode } = this.props;
    uploadBarcode(e);
    return;
  };

  currentDateTransform = value => {
    let strDate = value ? value.replace(/[^\d]+/g, "") : "";
    if (value == undefined || value == "") return "";

    let day = strDate.substring(0, 2);
    let month = strDate.substring(2, 4);
    let year = strDate.substring(4, 8);
    if (strDate.length == 7) {
      day = strDate.substring(0, 1);
      month = strDate.substring(1, 3);
      year = strDate.substring(3, 7);
    }
    let numDay = Number(day);

    if (numDay < 10) {
      day = "0" + numDay;
    }

    return day + "/" + month + "/" + year;
  };

  render() {
    const {
      classes,
      loading,
      coinsRedux,
      payment,
      methodPaymentsList
    } = this.props;
    const { coin, invoice, errors, selectedPaymentMethod } = this.state;
    const title = coin.name || i18n.t("SELECT_COIN");
    const img = coin.img || "";
    let dueDatePayment = invoice.dueDate
      ? this.currentDateTransform(invoice.dueDate)
      : (dueDatePayment = this.currentDateTransform(payment.dueDate));
    const paymentTitle = selectedPaymentMethod.title
      ? selectedPaymentMethod.title
      : i18n.t("SELECT_PAYMENT");

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={11} className={style.box}>
          <div className={style.row}>
            <Grid item xs={11} md={12}>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder="237933802350009031431630033330944400000001000000"
                inputProps={{ maxLength: 48, required: true }}
                value={invoice.number || payment.number}
                onChange={e => this.handleInvoiceNumberChange(e.target.value)}
                error={errors.includes("number")}
              />
            </Grid>
            <Grid item xs={1}>
              <div className={style.cameraIconMargin}>
                <label
                  htmlFor="file-upload"
                  className={style.labelCameraUpload}
                >
                  <img
                    className={style.cameraIcon}
                    src="images/icons/camera/camera-white.png"
                    alt="Camera"
                  />
                  <span>Max. 3MB</span>
                </label>
                <input
                  id="file-upload"
                  className={style.cameraInput}
                  type="file"
                  accept="image/*"
                  onChange={this.fileUpload}
                />
              </div>
            </Grid>
          </div>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_ASSIGNOR")}
                value={payment.assignor || invoice.assignor}
                onChange={this.handleInvoiceDefaultChange("assignor")}
                error={errors.includes("assignor")}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_NAME")}
                value={invoice.name}
                onChange={this.handleInvoiceDefaultChange("name")}
                error={errors.includes("name")}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_SHORT_DESCRIPTION")}
                value={payment.description || invoice.description}
                onChange={this.handleInvoiceDefaultChange("description")}
                error={errors.includes("description")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_DUE_DATE")}
                value={dueDatePayment}
                onChange={this.handleInvoiceDefaultChange("dueDate")}
                error={errors.includes("dueDate")}
                inputComponent={DateMask}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_CPF_CNPJ")}
                value={invoice.cpfCnpj}
                onChange={this.handleCpfCnpjChange}
                error={errors.includes("cpfCnpj")}
                inputProps={{ maxLength: 14 }}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_VALUE")}
                startAdornment={
                  <InputAdornment
                    position="start"
                    disableTypography
                    classes={{ root: classes.inputCss }}
                  >
                    R$
                  </InputAdornment>
                }
                value={payment.value || invoice.value}
                onChange={this.handleInvoiceDefaultChange("value")}
                error={errors.includes("value")}
                inputComponent={MoneyBrlMask}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={style.paymentType}>
          <Grid item xs={12} className="payments">
            <h4>{i18n.t("DEPOSIT_PAYMENT_METHODS")}</h4>
          </Grid>
        </Grid>
          <Grid item xs={12} className={style.box} style={{ marginTop: "10px" }}>
            <Grid container>
              <Grid item xs={12} sm={6} className={style.alignSelectItem_1}>
                <Hidden smUp>
                  <Select
                    list={methodPaymentsList}
                    title={paymentTitle}
                    selectItem={this.handlePayment}
                    error={errors.includes("Payment Method")}
                    width={"100%"}
                  />
                </Hidden>
                <Hidden xsDown>
                  <Select
                    list={methodPaymentsList}
                    title={paymentTitle}
                    selectItem={this.handlePayment}
                    error={errors.includes("Payment Method")}
                  />
                </Hidden>
              </Grid>
              {selectedPaymentMethod.value === 3 ? (
                <Grid item xs={12} sm={6} className={style.alignSelectItem_2}>
                  <Hidden smUp>
                    <Select
                      list={coinsRedux}
                      title={title}
                      titleImg={img}
                      selectItem={this.coinSelected}
                      error={errors.includes("coin")}
                      width={"94%"}
                    />
                  </Hidden>
                  <Hidden xsDown>
                    <Select
                      list={coinsRedux}
                      title={title}
                      titleImg={img}
                      selectItem={this.coinSelected}
                      error={errors.includes("coin")}
                    />
                  </Hidden>
                </Grid>
              ) : null}
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
            {loading ? <Loading /> : i18n.t("PAYMENT_PAY_NOW")}
          </button>
        </Grid>

        <Grid
          item
          xs={12}
          className={style.transparentBox}
          style={{ marginTop: "10px" }}
        >
          <Instructions />
        </Grid>
      </Grid>
    );
  }
}

Invoice.propTypes = {
  classes: PropTypes.object,
  openModal: PropTypes.func,
  coinsRedux: PropTypes.array.isRequired,
  payment: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getInvoice: PropTypes.func.isRequired,
  getCoinsEnabled: PropTypes.func.isRequired,
  setPayment: PropTypes.func.isRequired,
  setClearPayment: PropTypes.func.isRequired,
  coins: PropTypes.array,
  errorInput: PropTypes.func.isRequired,
  uploadBarcode: PropTypes.func.isRequired,
  methodPaymentsList: PropTypes.array
};

const mapStateToProps = store => ({
  coinsRedux: store.payment.coins,
  payment: store.payment.payment,
  loading: store.payment.loading,
  coins: store.skeleton.coins,
  methodPaymentsList: store.deposit.paymentsMethodsService
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInvoice,
      getCoinsEnabled,
      setPayment,
      setClearPayment,
      errorInput,
      uploadBarcode,
      getPaymentMethodService
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(Invoice));
