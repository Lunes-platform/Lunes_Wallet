import React from "react";
import i18n from "../../utils/i18n";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCoinsEnabled, setPayment, getInvoice} from "./redux/paymentAction";

// COMPONENTS
import Select from "../../components/select";
import Instructions from "../../components/instructions";
import colors from "../../components/bases/colors";
import Loading from "../../components/loading";
import {DateMask, CpfMask, CnpjMask, MoneyBrlMask} from "../../components/inputMask";

// MATERIAL
import { Grid, Input, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLES
import style from "./style.css";

// UTILS
import { inputValidator } from "../../utils/inputValidator";

const customStyle = {
  inputRoot: {
    color: colors.messages.info,
    margin: "0.5rem 0",
    padding: '5px',
    width: 'calc(100% - 20px)',
    "&:hover:before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  inputCss: {
    color: colors.messages.info,
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.5px",
    textAlign: 'left',
    paddingLeft: '10px',
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "16px",
    letterSpacing: "0.5px",
    textAlign: 'center',
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark,
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`,
    },
  },
  inputCssUnderlineDisabled: {
    "&:before, &:after": {
      display: 'none',
    },
  },
  disabled: {},
  error: {},
  focused: {},
}

class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      invoice: {
        number: '',
        assignor: '',
        name: '',
        description: '',
        dueDate: '',
        cpfCnpj: '',
        value: '',
      },
      coin: {
        name: undefined,
        value: undefined,
        img: undefined
      },
    }

    this.coinSelected = this.coinSelected.bind(this);
  }

  componentDidMount(){
    const {getCoinsEnabled} = this.props;
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
    })
  }

  handleInvoiceNumberChange = event => {
    const {getInvoice} = this.props;
    const {invoice} = this.state;

    this.setState({
      ...this.state,
      invoice: {
        ...invoice,
        number: event.target.value.replace(/\D/, '')
      }
    });

    if (event.target.value.length === 48) {
      getInvoice(event.target.value);
      const {value, assignor, description, dueDate} = this.props.payment;

      this.setState({
        ...this.state,
        invoice: {
          ...this.state.invoice,
          value,
          assignor,
          description,
          dueDate
        }
      });
    }
  }

  handleInvoiceDefaultChange = (name) => event => {
    this.setState({
      ...this.state,
      invoice: {
        ...this.state.invoice,
        [name]: event.target.value
      }
    });
  }

  openModal = () => {
    const {openModal} = this.props;
    openModal();
  }

  setPayment = () => {
    const {setPayment} = this.props;
    setPayment(this.state.invoice);
  }

  inputValidator = () => {
    const {invoice, coin} = this.state;
    const {payment} = this.props;

    const invoiceInputs = {};

    for (const key in invoice) {
      if (invoice.hasOwnProperty(key)) {
        invoiceInputs[key] = {
          type: 'text',
          name: key,
          placeholder: key,
          value: payment[key] || invoice[key],
          required: true,
        };
      }

      if (key === 'number') {
        invoiceInputs[key]["minLength"] = 48;
      }
    }

    const coinInput = {
      type: 'text',
      name: 'coin',
      placeholder: 'coin',
      value: payment.coin || coin.value || '',
      required: true,
    };

    const { errors } = inputValidator({...invoiceInputs, coin: coinInput});

    // if (errors.length > 0) {
    //   this.setState({
    //     ...this.state,
    //     errors
    //   });
    //   return;
    // }

    this.openModal(); // abrind modal sem validacao para testar
    this.setPayment(); // setar os dados no redux, para teste sem validacao
    // tem que fazer a funcao pra pegar a quantidade de moedas necessarias para esta transacao e
    // liberar o botao apos o resultado
  }

  render() {
    const {classes, loading, coinsRedux, payment} = this.props;
    const {coin, invoice, errors} = this.state;

    const title = coin.name || 'Select a coin..';
    const img = coin.img || '';

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box}>
          <div className={style.row}>
            <Input
              classes={{
                root: classes.inputRoot,
                underline: classes.inputCssUnderline,
                input: classes.inputCssCenter
              }}
              placeholder="237933802350009031431630033330944400000001000000"
              inputProps={{ maxLength: 48, required: true }}
              value={invoice.number}
              onChange={this.handleInvoiceNumberChange}
              error={errors.includes('number')}
            />
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
                onChange={this.handleInvoiceDefaultChange('assignor')}
                error={errors.includes('assignor')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_NAME")}
                value={payment.name || invoice.name}
                onChange={this.handleInvoiceDefaultChange('name')}
                error={errors.includes('name')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_SHORT_DESCRIPTION")}
                value={payment.description || invoice.description}
                onChange={this.handleInvoiceDefaultChange('description')}
                error={errors.includes('description')}
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
                value={payment.dueDate || invoice.dueDate}
                onChange={this.handleInvoiceDefaultChange('dueDate')}
                error={errors.includes('dueDate')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_CPF_CNPJ")}
                value={invoice.cpfCnpj}
                onChange={this.handleInvoiceDefaultChange('cpfCnpj')}
                error={errors.includes('cpfCnpj')}
                inputProps={{maxLength: 14}}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_VALUE")}
                startAdornment={
                  <InputAdornment position="start"
                    disableTypography
                    classes={{root: classes.inputCss}}
                  >
                    R$
                  </InputAdornment>
                }
                value={payment.value || invoice.value}
                onChange={this.handleInvoiceDefaultChange('value')}
                error={errors.includes('value')}
                inputComponent={MoneyBrlMask}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.box} style={{marginTop: '10px'}}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Select
                list={coinsRedux}
                title={title}
                titleImg={img}
                selectItem={this.coinSelected}
                error={errors.includes('coin')}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.transparentBox} style={{marginTop: '10px'}}>
          <button
            className={style.buttonBorderGreen}
            onClick={this.inputValidator}
          >
            {loading ? <Loading /> : i18n.t("PAYMENT_PAY_NOW")}
          </button>
        </Grid>

        <Grid item xs={12} className={style.transparentBox} style={{marginTop: '10px'}}>
          <Instructions>
            {/* TODO: set the modal content */}
            <p>Conteúdo</p>
          </Instructions>
        </Grid>
      </Grid>
    );
  }
}

Invoice.propTypes = {
  classes: PropTypes.object,
  openModal: PropTypes.func
}

const mapStateToProps = store => ({
  coinsRedux: store.payment.coins,
  payment: store.payment.payment,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getInvoice,
    getCoinsEnabled,
    setPayment,
  }, dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(Invoice));

