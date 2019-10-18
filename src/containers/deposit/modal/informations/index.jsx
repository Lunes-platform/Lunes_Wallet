import React, { StrictMode } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setLoading,
  setUserData,
  setModalSteps,
  depositGetStates,
  depositGetCity,
  validateDepositCep
} from "../../redux/depositAction";
import {clearSettings} from "../../../settings/redux/settingsAction";
// STYLE
import style from "./style.css";
import colors from "../../../../components/bases/colors";

// MATERIAL
import {
  Grid,
  Input,
  Select,
  MenuItem,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Lens } from "@material-ui/icons";

//COMPONENTS
import ButtonContinue from "../../../../components/buttonContinue";
import Loading from "../../../../components/loading";
import { CpfMask, CnpjMask } from "../../../../components/inputMask";
import { isCNPJ, isCPF } from "brazilian-values";
import ModalBar from "../../../../components/modalBar";

// UTILS
import i18n from "../../../../utils/i18n";

const customStyle = theme => ({
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
    fontSize: "14px !important",
    letterSpacing: "0.5px",
    textAlign: "left"
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px",
    textAlign: "left"
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
  disabled: {
    opacity: "2 !important",
    color: "gray !important"
  },
  error: {},
  focused: {},
  underlineItems: {
    color: "white",
    borderBottomColor: `${colors.green.default} !important`,
    fontSize: "1em",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "15em"
    },
    icon: {
      fill: "green"
    }
  },
  menuItemRoot: {
    color: colors.messages.info
  },
  underline: {
    width: "100%",
    "&:hover": {
      backgroundColor: colors.purple.dark
    },
    "&:before": {
      borderColor: colors.purple.dark
    },
    "&:after": {
      borderColor: colors.purple.dark
    }
  },
  icon: {
    fill: "#68f285"
  },
  checked: {
    color: "#68f285"
  },
  rootRadio: {
    color: "#654fa4",
    "&$checked": {
      color: "#68f285"
    },
    margin: "0px 55px 0 1px"
  },
  rootRadioGroup: {
    padding: "5px 3px 0px 2px"
  },
  rootLabel: {
    fontSize: "11px",
    color: "#fff",
    position: "relative",
    right: "60px",
    top: "2px"
  }
});

class InformationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      document: "",
      city: "",
      state: "",
      stateName: "",
      zipcode: "",
      address: "",
      addressNumber: "",
      documentType: "",
      statusKyc: "",
      disabled: true,
      checkInputs: false,
      invalidCPF: false,
      invalidCNPJ: false,
      invalidCEP: false,
      errorMsg: ""
    };
  }

  returnPaymentMethodIndex = () => {
    const {payloadPayment, methods} = this.props;
    for (let i = 0; i < methods.length; i++) {
      if (methods[i].id === payloadPayment.paymentMethodId) {
        return i;
      }
    }
  };
  setInputValue = () => {
    const { userData, selectedValue, depositGetCity, methods } = this.props;
    const { data } = userData;
    const { fullName, document, documentType, address, status } = data;
    const { city, state, country, street, zipcode } = address;
    if (selectedValue > methods[this.returnPaymentMethodIndex()].limitKycAmount && status !== "confirmed") {
      this.setState({
        fullName: "",
        documentType: "",
        document: "",
        state: "",
        city: "",
        zipcode: "",
        address: "",
        statusKyc: status
      });
    } else if (selectedValue > 0) {
      if (status !== null) {
        this.setState({
          fullName: fullName ? fullName : "",
          documentType:
            documentType && documentType !== "passport" ? documentType : "",
          document: document && documentType !== "passport" ? document : "",
          state: state ? state : "",
          city: city ? city : "",
          zipcode: zipcode ? zipcode : "",
          address: street ? street : "",
          statusKyc: status
        });
      } else {
        this.setState({
          fullName: fullName ? fullName : "",
          documentType:
            documentType && documentType !== "passport" ? documentType : "",
          document: document && documentType !== "passport" ? document : "",
          statusKyc: status
        });
      }
    }
  };
  componentDidMount() {
    const { depositGetStates,clearSettings } = this.props;
    this.setInputValue();
    clearSettings();
    depositGetStates("BR");
  }
  componentDidUpdate(prevProps, prevState) {
    const { country, document, documentType, zipcode } = this.state;
    const { cep } = this.props;
    if (cep.cep !== prevProps.cep.cep) {
      if (!cep.cep) {
        this.setState({ invalidCEP: true, state: "", city: "", address: "",  errorMsg: i18n.t("INVALID_CEP") });
      } else {
        this.setState({
          state: cep.estado ? cep.estado : "",
          city: cep.cidade ? cep.cidade : "",
          address: cep.logradouro ? cep.logradouro : "",
          invalidCEP: false
        });
      }
    }else if (prevState.document !== document) {
      if (documentType === "cpf" && document.length === 11) {
        this.setState({ invalidCPF: !isCPF(document),  errorMsg: i18n.t("INVALID_CPF") });
      } else if (documentType === "cnpj" && document.length === 14) {
        this.setState({ invalidCNPJ: !isCNPJ(document),  errorMsg: i18n.t("INVALID_CNPJ") });
      }
    }
  }
  checkAllInputs = () => {
    const { fullName, document, state, city, zipcode, address } = this.state;

    return fullName && document && state && city && zipcode && address;
  };

  searchStatesName = value => {
    const { states } = this.props;
    let name = null;
    states.forEach((element, index) => {
      if (element.shortName === value) {
        name = element.name;
      }
    });
    if (name !== null) {
      return name;
    }
    return;
  };
  handleInput = property => e => {
    let value = null;
    const { validateDepositCep, cep } = this.props;
    switch (property) {
      case "fullName":
        value = e.target.value.replace(/[^0-9a-zà-ú A-ZÀ-Ú-]/, "");
        break;
      case "zipcode":
        value = e.target.value.replace(/[^0-9]/, "");
        if (value.length > 7) {
          validateDepositCep(value);
        }
        break;
      case "state":
        value = e.target.value;
        this.setState({ state: value });
        break;
      case "city":
        value = e.target.value.replace(/[^0-9a-zà-ú A-ZÀ-Ú-]/, "");
        break;
      case "address":
        if (cep.cep) {
          value = e.target.value.replace(/[^0-9a-zà-ú A-ZÀ-Ú-]/, "");
          // this.setState({
          //   state: cep.estado ? cep.estado : "",
          //   city: cep.cidade ? cep.cidade : ""
          // });
        }
        break;
      default:
        value = e.target.value;
        break;
    }
    this.setState({
      [property]: value
    });
  };

  validateForm = () => {
    const { setLoading, setUserData, setModalSteps, cep } = this.props;
    let {
      fullName,
      documentType,
      document,
      state,
      city,
      zipcode,
      address
    } = this.state;
    let stateName = this.searchStatesName(state);
    let user = {
      fullName,
      documentType,
      document,
      state,
      stateName,
      city,
      zipcode,
      address
    };

    if (documentType === "cpf" && !isCPF(document)) {
      this.setState({ invalidCPF: true, errorMsg: i18n.t("INVALID_CPF") });
      return;
    } else if (documentType === "cnpj" && !isCNPJ(document)) {
      this.setState({ invalidCNPJ: true, errorMsg: i18n.t("INVALID_CNPJ") });
      return;
    } else if (zipcode.length < 8) {
      this.setState({ invalidCEP: true, errorMsg: i18n.t("INVALID_CEP") });
      return;
    } else if (cep.cep === false) {
      return;
    }

    setLoading(true);
    setModalSteps(2);

    // remove in the future
    setUserData(user);
  };
  handleRadioChange = event => {
    this.setState({ documentType: event.target.value, document: "" });
  };
  listStates = () => {
    const { classes, states } = this.props;
    if (states) {
      return states.map((item, index) => (
        <MenuItem
          value={item.shortName}
          key={index}
          classes={{
            root: classes.menuItemRoot
          }}
        >
          {item.name}
        </MenuItem>
      ));
    }
    return "";
  };

  render() {
    const {
      classes,
      loading,
      selectedValue,
      userData,
      loadingState,
      cep,
      loadingAddress,
      methods
    } = this.props;
    const {
      documentType,
      disabled,
      statusKyc,
      checkInputs,
      invalidCNPJ,
      invalidCPF,
      invalidCEP,
      errorMsg,
      state,
      city,
      address
    } = this.state;
    const MenuProps = {
      PaperProps: {
        style: {
          color: "#fff",
          maxHeight: 40 * 4.5,
          marginTop: "45px",
          backgroundColor: "#473088",
          width: "10%"
        }
      }
    };
    let isDisabled =
      statusKyc === "confirmed" && disabled
        ? true
        : selectedValue === 0
        ? true
        : false;
    let inputMask = null;
    if (documentType === "cnpj") {
      inputMask = CnpjMask;
    } else if (documentType === "cpf") {
      inputMask = CpfMask;
    }
    let infoMessage = i18n.t("DEPOSIT_INF_MODAL_TITLE");
    if (selectedValue === 0) {
      infoMessage = i18n.t("DEPOSIT_INF_MODAL_NO_SELECTED_VALUE");
    } else if (
      selectedValue > methods[this.returnPaymentMethodIndex()].limitKycAmount &&
      statusKyc === "rejected"
    ) {
      infoMessage = (
        <div className={style.clickHere}>
          {i18n.t("DEPOSIT_INF_MODAL_KYC_REJECTED")}

          <Link to="/KYC">
            <span className={style.clickHere}>
              {i18n.t("DEPOSIT_INF_MODAL_KYC_REJECTED_CLICK_HERE")}
            </span>
          </Link>
        </div>
      );
    } else if (
      selectedValue > methods[this.returnPaymentMethodIndex()].limitKycAmount &&
      statusKyc === "waiting"
    ) {
      infoMessage = i18n.t("DEPOSIT_INF_MODAL_KYC_WAITING");
    }
    let message = errorMsg;
    if (invalidCEP) message = i18n.t("INVALID_CEP");
    return (
      <div>
        {invalidCNPJ || invalidCPF || invalidCEP ? (
          <ModalBar type="error" message={message} timer clock={"6000"} />
        ) : null}
        <Grid container className={style.container}>
          <Grid item xs={12}>
            <div className={style.formGroup}>{infoMessage}</div>
          </Grid>
          <Grid container direction="row" className={style.formGroup}>
            <Grid item xs={12} sm={12}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_FULLNAME")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter,
                  disabled: classes.disabled
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_FULLNAME")}
                value={this.state.fullName}
                onChange={this.handleInput("fullName")}
                disabled={isDisabled}
                error={checkInputs && this.state.fullName === ""}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <div className={style.textGreen}>
                {i18n.t("SECURITY_INSERT_DOC")}
              </div>
              <Grid item xs={12} sm={12} md={12}>
                <FormControl component="fieldset" className={style.labelRadio}>
                  <RadioGroup
                    aria-label="Documentos"
                    name="documentos"
                    value={documentType}
                    onChange={this.handleRadioChange}
                    row={true}
                    classes={{ root: classes.rootRadioGroup }}
                  >
                    <FormControlLabel
                      value="cpf"
                      control={
                        <Radio
                          icon={<Lens />}
                          checkedIcon={<Lens />}
                          classes={{
                            root: classes.rootRadio,
                            checked: classes.checked
                          }}
                          disabled={
                            isDisabled &&
                            userData.data.documentType !== "passport"
                              ? true
                              : false
                          }
                        />
                      }
                      label="CPF"
                      classes={{ label: classes.rootLabel }}
                    />
                    <FormControlLabel
                      value="cnpj"
                      control={
                        <Radio
                          icon={<Lens />}
                          checkedIcon={<Lens />}
                          classes={{
                            root: classes.rootRadio,
                            checked: classes.checked
                          }}
                          disabled={
                            isDisabled &&
                            userData.data.documentType !== "passport"
                              ? true
                              : false
                          }
                        />
                      }
                      label="CNPJ"
                      classes={{ label: classes.rootLabel }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter,
                  disabled: classes.disabled
                }}
                placeholder={i18n.t("KYC_DOCUMENT_PLACEHOLDER")}
                value={this.state.document}
                onChange={this.handleInput("document")}
                inputComponent={inputMask}
                disabled={
                  isDisabled && userData.data.documentType !== "passport"
                    ? true
                    : false
                }
                error={
                  (checkInputs && this.state.document === "") ||
                  invalidCNPJ ||
                  invalidCPF
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            className={style.formGroup}
          >
            <Grid item xs={12} sm={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_CEP")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter,
                  disabled: classes.disabled
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_CEP")}
                value={this.state.zipcode}
                onChange={this.handleInput("zipcode")}
                inputProps={{ maxLength: 8 }}
                disabled={isDisabled}
                error={(checkInputs && this.state.zipcode === "") || invalidCEP}
              />
              
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12} sm={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_STATE")}
              </div>
              {loadingState || loadingAddress ? (
                <Loading />
              ) : (
                <Select
                  classes={{ selectMenu: classes.underlineItems }}
                  MenuProps={MenuProps}
                  value={state}
                  renderValue={value => this.searchStatesName(value)}
                  input={
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss,
                        disabled: classes.disabled
                      }}
                    />
                  }
                  inputProps={{
                    classes: {
                      icon: classes.icon
                    }
                  }}
                  onChange={this.handleInput("state")}
                  disabled={
                    isDisabled
                      ? true
                      : cep.estado && state && this.state.zipcode.length === 8
                      ? true
                      : false
                  }
                  error={checkInputs && this.state.state === ""}
                >
                  {this.listStates()}
                </Select>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="space-around"
            className={style.formGroup}
          >
            <Grid item xs={12} sm={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_CITY")}
              </div>
              {loadingAddress ? (
                <Loading />
              ) : (
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCssCenter,
                    disabled: classes.disabled
                  }}
                  placeholder={i18n.t("DEPOSIT_INF_MODAL_CITY")}
                  value={city}
                  onChange={this.handleInput("city")}
                  disabled={
                    isDisabled
                      ? true
                      : cep.cidade && city && this.state.zipcode.length === 8
                      ? true
                      : false
                  }
                  error={checkInputs && this.state.city === ""}
                />
              )}
            </Grid>
            <Grid item sm={2} />
            <Grid item xs={12} sm={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_ADDRESS")}
              </div>
              {loadingAddress ? (
                <Loading />
              ) : (
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCssCenter,
                    disabled: classes.disabled
                  }}
                  placeholder={i18n.t("DEPOSIT_INF_MODAL_ADDRESS")}
                  value={this.state.address}
                  onChange={this.handleInput("address")}
                  disabled={isDisabled}
                  error={checkInputs && this.state.address === ""}
                />
              )}
            </Grid>

            <Grid item sm={1} />
          </Grid>

          <Grid container justify="center">
            <Grid item xs={5}>
              <ButtonContinue
                label={i18n.t("DEPOSIT_INF_MODAL_BTN_CONTINUE")}
                action={
                  this.checkAllInputs()
                    ? this.validateForm
                    : () => this.setState({ checkInputs: !checkInputs })
                }
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InformationModal.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  setUserData: PropTypes.func,
  setModalSteps: PropTypes.func,
  depositGetStates: PropTypes.func.isRequired,
  depositGetCity: PropTypes.func.isRequired,
  states: PropTypes.array,
  city: PropTypes.array,
  userData: PropTypes.object,
  selectedValue: PropTypes.number,
  loadingState: PropTypes.bool,
  validateDepositCep: PropTypes.func,
  cep: PropTypes.object,
  methods: PropTypes.array,
  loadingAddress: PropTypes.bool,
  payloadPayment: PropTypes.object,
  clearSettings: PropTypes.func,
};

const mapStateToProps = store => ({
  loading: store.deposit.loading,
  states: store.deposit.location.states,
  city: store.deposit.location.city,
  loadingState: store.deposit.loadingState,
  userData: store.deposit.kyc,
  selectedValue: store.deposit.selectedValue,
  cep: store.settings.cepValidation,
  loadingAddress: store.settings.loadingAddress,
  methods: store.deposit.paymentMethods,
  payloadPayment: store.deposit.payloadPayment
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLoading,
      setUserData,
      setModalSteps,
      depositGetStates,
      depositGetCity,
      validateDepositCep,
      clearSettings
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(InformationModal));
