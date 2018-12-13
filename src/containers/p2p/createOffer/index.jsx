import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOfferWhenSelling, clearOffer } from "../redux/p2pAction";

// MATERIAL
import {
  Grid,
  Avatar,
  Radio,
  withStyles,
  FormControlLabel
} from "@material-ui/core/";
import { ArrowForward } from "@material-ui/icons/";
import ClearIcon from "@material-ui/icons/Clear";

// ICONS
import { Lens } from "@material-ui/icons";

// COMPONENTS
import Select from "../../../components/select";
import StarVotes from "../components/starVotes";
import Loading from "../../../components/loading";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

const stylesCustom = {
  root: {
    color: "#654fa4",
    "&$checked": {
      color: "#68f285"
    }
  },
  rootLabel: {
    fontSize: "11px",
    color: "#fff"
  },
  checked: {
    color: "#68f285"
  }
};

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinSell: {
        name: "Select",
        img: ""
      },
      coinBuy: {
        name: "Select",
        img: ""
      },

      selectedValue: "",

      order: {
        coin: "",
        type: "",
        paymentMethodId: "",
        amount: "",
        amountPayment: "",
        addressSeller: "",
        description: ""
      },
      errors: [],
      descriptionTotal: 250
    };

    this.handleFields = this.handleFields.bind(this);
  }

  coinSelectedSell = (value, title, img = undefined) => {
    this.setState({
      ...this.state,
      coinSell: {
        name: title,
        value,
        img
      },
      order: {
        ...this.state.order,
        coin: value
      }
    });
  };

  coinSelectedBuy = (value, title, img = undefined) => {
    const { coinsEnabled } = this.props;
    let idMethod = 0;
    coinsEnabled.map(val => {
      if (val.value == value) {
        idMethod = val.id;
      }
    });

    this.setState({
      ...this.state,
      coinBuy: {
        name: title,
        value,
        img
      },
      order: {
        ...this.state.order,
        paymentMethodId: idMethod
      }
    });
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      order: {
        ...this.state.order,
        type: event.target.value
      },
      selectedValue: event.target.value
    });
  };

  handleFields = e => {
    const { name, value } = e.target;

    switch (name) {
      case "coin":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            coin: value
          }
        });
        break;
      case "type":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            type: value
          }
        });
        break;
      case "paymentMethodId":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            paymentMethodId: value
          }
        });
        break;
      case "amount":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            amount: value
          }
        });
        break;
      case "amountPayment":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            amountPayment: value
          }
        });
        break;
      case "addressSeller":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            addressSeller: value
          }
        });
        break;
      case "description":
        this.setState({
          ...this.state,
          order: {
            ...this.state.order,
            description: value
          }
        });
        break;
    }
  };

  validateForm = () => {
    const { createOfferWhenSelling } = this.props;
    const { order } = this.state;
    const {
      coin,
      type,
      paymentMethodId,
      amount,
      amountPayment,
      addressSeller,
      description
    } = this.state.order;
    let error = [];

    if (!type) error.push(i18n.t("P2P_ERROR_1"));
    if (!coin) error.push(i18n.t("P2P_ERROR_2"));
    if (!paymentMethodId) error.push(i18n.t("P2P_ERROR_3"));
    if (!amount) error.push(i18n.t("P2P_ERROR_4"));
    if (!amountPayment) error.push(i18n.t("P2P_ERROR_5"));
    if (!addressSeller) error.push(i18n.t("P2P_ERROR_6"));
    if (!description) error.push(i18n.t("P2P_ERROR_7"));

    if (error.length > 0) {
      this.setState({
        ...this.state,
        errors: error
      });
    } else {
      this.setState({
        ...this.state,
        errors: []
      });
      createOfferWhenSelling(order);
    }
  };
  renderErros = () => {
    let { errors } = this.state;
    return Object.keys(errors).map((value, key) => {
      if (errors[key]) {
        return (
          <div className={style.textErrorSmall}>
            <ClearIcon
              className={style.iconListValid}
              style={{ color: "red" }}
            />
            {errors[key]}
          </div>
        );
      }
    });
  };
  render() {
    const { coinBuy, coinSell } = this.state;
    const {
      classes,
      coinsEnabled,
      user,
      loadingCreateOrder,
      createDone,
      createError,
      clearOffer
    } = this.props;

    const username = user.name + " " + user.surname;

    if (createDone)
      return (
        <div>
          <span className={style.textSuccess}>{i18n.t("P2P_TEXT_1")}</span>
          <button className={style.btContinue} onClick={clearOffer}>
            {i18n.t("P2P_TEXT_2")}
          </button>
        </div>
      );

    if (createError)
      return (
        <div>
          <span className={style.textError}>{i18n.t("P2P_ERROR")} </span>
          <button className={style.btContinue} onClick={clearOffer}>
            {i18n.t("P2P_TRY_AGAIN")}
          </button>
        </div>
      );

    return (
      <div className={style.baseUser}>
        <div className={style.headerUser}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                alt="avatar"
                src={user.profilePicture}
                className={style.avatar}
              />
            </Grid>
            <Grid item xs={6}>
              <span className={style.name}>{username}</span>
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: 10 }}>
              <div className={style.boxStar}>
                <StarVotes votes={0} />
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={style.formBase}>
          <div className={style.formGroup}>
            <div className={style.textSmall}>
              {i18n.t("P2P_CREATE_OFFER_COIN_VALUES")}
            </div>
            <Grid container>
              <Grid item xs={5}>
                <input
                  type="text"
                  name="amount"
                  placeholder="0.0000"
                  className={style.inputDefault}
                  value={this.state.order.amount}
                  onChange={e => this.handleFields(e)}
                />
              </Grid>
              <Grid item xs={2}>
                <ArrowForward className={style.arrowPrice} />
              </Grid>
              <Grid item xs={5}>
                <input
                  type="text"
                  name="amountPayment"
                  placeholder="0.0000"
                  className={style.inputDefault}
                  value={this.state.order.amountPayment}
                  onChange={e => this.handleFields(e)}
                />
              </Grid>
            </Grid>
          </div>

          <div className={style.formGroup}>
            <Grid container>
              <Grid item xs={4}>
                <div className={style.textSmall}>
                  {i18n.t("P2P_CREATE_OFFER_COIN_ANNOUNCED")}
                </div>
                <Select
                  list={coinsEnabled}
                  title={coinSell.name}
                  titleImg={coinSell.img}
                  selectItem={this.coinSelectedSell}
                  error={null}
                  width={"120%"}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={5}>
                <div className={style.textSmallCoinPayment}>
                  {i18n.t("P2P_CREATE_OFFER_COIN_PAYMENT")}
                </div>
                <Select
                  list={coinsEnabled}
                  title={coinBuy.name}
                  titleImg={coinBuy.img}
                  selectItem={this.coinSelectedBuy}
                  error={null}
                  width={"100%"}
                />
              </Grid>
            </Grid>
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>
              {i18n.t("P2P_CREATE_OFFER_NEGOTIATION")}
            </div>
            <FormControlLabel
              value="p2p"
              className={style.labelRadio}
              classes={{ label: classes.rootLabel }}
              control={
                <Radio
                  checked={this.state.selectedValue === "p2p"}
                  icon={<Lens />}
                  checkedIcon={<Lens />}
                  onChange={this.handleChange}
                  classes={{ root: classes.root, checked: classes.checked }}
                />
              }
              label="P2P (Peer to Peer)"
              labelPlacement="end"
            />
            <FormControlLabel
              value="escroow"
              className={style.labelRadio}
              classes={{ label: classes.rootLabel }}
              control={
                <Radio
                  checked={this.state.selectedValue === "escroow"}
                  icon={<Lens />}
                  checkedIcon={<Lens />}
                  onChange={this.handleChange}
                  classes={{ root: classes.root, checked: classes.checked }}
                />
              }
              label="Escroow"
              labelPlacement="end"
            />
            <hr />
          </div>

          <div className={style.formGroup}>
            <div className={style.textSmall}>
              {i18n.t("P2P_CREATE_OFFER_ADDRESS")}
            </div>
            <input
              type="text"
              name="addressSeller"
              placeholder={i18n.t("P2P_CREATE_OFFER_ADDRESS_PLACEHOLDER")}
              className={style.inputDefault}
              value={this.state.order.addressSeller}
              onChange={e => this.handleFields(e)}
            />
          </div>
          <hr />
          <div className={style.formGroup}>
            <div className={style.textSmall}>
              {i18n.t("P2P_CREATE_OFFER_DESCRIPTION")}
            </div>
            <span className={style.counterDescription}>
              {this.state.order.description.length} /{" "}
              {this.state.descriptionTotal}
            </span>
            <textarea
              className={style.textArea}
              name="description"
              placeholder={i18n.t("P2P_CREATE_OFFER_DESCRIPTION_PLACEHOLDER")}
              onChange={e => this.handleFields(e)}
              maxLength={this.state.descriptionTotal}
              value={this.state.order.description}
            >
              {this.state.order.description}
            </textarea>
            {this.renderErros()}
            <button className={style.btContinue} onClick={this.validateForm}>
              {loadingCreateOrder ? (
                <Loading />
              ) : (
                i18n.t("P2P_CREATE_OFFER_BUTTON_CONFIRMATION")
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CreateOffer.propTypes = {
  classes: PropTypes.object.isRequired,
  coinsEnabled: PropTypes.any,
  user: PropTypes.object,
  loadingCreateOrder: PropTypes.bool,
  createDone: PropTypes.bool,
  createError: PropTypes.bool,
  clearOffer: PropTypes.func,
  createOfferWhenSelling: PropTypes.func
};

const mapStateToProps = store => ({
  coinsEnabled: store.p2p.coinsEnabled || [],
  user: store.user.user,
  loadingCreateOrder: store.p2p.loadingCreateOrder,
  createDone: store.p2p.createDone,
  createError: store.p2p.createError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createOfferWhenSelling,
      clearOffer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(stylesCustom)(CreateOffer));
