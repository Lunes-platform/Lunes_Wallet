import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setPaymentMethod,
  setKycValidation,
  setSelectedValue
} from "../redux/depositAction";

// COMPONENTS
import CardPack from "../cardPack";
import CustomCheckbox from "../../../components/checkBox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Loading from "../../../components/loading";
// MATERIAL UI
import { Grid, Hidden, IconButton } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";
import colors from "../../../components/bases/colors";

const customStyle = theme => ({
  underlineItems: {
    color: "white",
    borderBottomColor: `${colors.green.default} !important`,
    fontSize: "1em",
    width: "8em",
    [theme.breakpoints.down("sm")]: {
      width: "6em"
    },
    icon: {
      fill: "green"
    }
  },
  selectDate: {
    color: "white",
    fontSize: "1em",
    width: "8em",
    [theme.breakpoints.down("sm")]: {
      width: "5em",
      color: "white"
    }
  },
  menuItemRoot: {
    color: colors.messages.info
  }
});

const settings = {
  arrows: false,
  draggable: true,
  dots: false,
  infinite: false,
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 599,
      settings: {
        slidesToShow: 2
      }
    }
  ]
};

class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      checkBox: false,
      dayPayment: i18n.t("DEPOSIT_SELECT_DATE"),
      days: [...Array(31).keys()],
      payment: i18n.t("DEPOSIT_INVOICE"),
      paymentMethods: [i18n.t("DEPOSIT_INVOICE"), i18n.t("DEPOSIT_DEBIT")],
      paymentName: i18n.t("DEPOSIT_INVOICE"),
      activeCard: undefined,
      depositValue: ""
    };
  }


  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };
  handleSelectedValue = (amount) =>{
    const {setSelectedValue} = this.props;
    
    setSelectedValue(amount);
  };
  handleCard = (id, amount) => {
    this.setState({
      ...this.state,
      activeCard: id,
      depositValue: amount
    });
    
    this.handleSelectedValue(amount);
  };
  renderPacks = () => {
    const { packages } = this.props;
    const { activeCard } = this.state;
    
    return packages.map((val, index) => {
      const active = val.status;
      const selected = val.id === activeCard ? true : false;
      return (
        <CardPack
          key={index}
          pack={val}
          onSelect={this.handleCard}
          selected={selected}
          active={active}
        />
      );
    });
  };

  listPaymentMethods = () => {
    const { classes, methods } = this.props;
    const { paymentMethods } = this.state;

    return paymentMethods.map((method, index) => (
      <MenuItem
        value={methods ? methods[index].id : ""}
        key={index}
        classes={{
          root: classes.menuItemRoot
        }}
      >
        {method}
      </MenuItem>
    ));
  };

  listDays = () => {
    const { classes } = this.props;
    const { days } = this.state;

    return days.map((day, index) => (
      <MenuItem
        key={index}
        value={day + 1}
        classes={{
          root: classes.menuItemRoot
        }}
      >
        {day + 1}
      </MenuItem>
    ));
  };

  handleChange = value => {
    this.setState({
      ...this.state,
      dayPayment: value
    });
  };

  handleChangeRecurrent() {
    const { checkBox } = this.state;

    this.setState({
      ...this.state,
      checkBox: !checkBox,
      dayPayment: i18n.t("DEPOSIT_SELECT_DATE")
    });
  }

  handleChangePaymentMethod = value => {
    const {methods} = this.props;
    const {paymentMethods} = this.state
    let index = 0;
    for(let i = 0; i < methods.length; i++){
      if(methods[i].id === value){
        index = i;
      }
    }
    
    let name = paymentMethods[index];

    this.setState({
      ...this.state,
      payment: value,
      paymentName: name
    });
  };

  renderPaymentMethods = () => {
    const { classes } = this.props;
    const { checkBox } = this.state;
    const imgUri = "./images/icons/arrow/expand-more@1x.png";

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

    return (
      <div>
        <Grid item xs={12} className="payments">
          <h4>{i18n.t("DEPOSIT_PAYMENT_METHODS")}</h4>
        </Grid>

        <Grid container spacing={8}>
          <Grid item xs={12} sm={12}>
            <div className={style.containerInput}>
              <Select
                classes={{
                  selectMenu: classes.underlineItems
                }}
                MenuProps={MenuProps}
                value={this.state.payment}
                renderValue={() => this.state.paymentName}
                onChange={event =>
                  this.handleChangePaymentMethod(event.target.value)
                }
                displayEmpty={true}
                name="payment"
                disableUnderline={true}
                IconComponent={props => <img {...props} src={imgUri} />}
              >
                {this.listPaymentMethods()}
              </Select>
            </div>
          </Grid>

          {/* <Grid item xs={6} sm={4}>
            <div className={style.containerInput}>
              <CustomCheckbox onChange={() => this.handleChangeRecurrent()} />
              <div className={style.paddingTop}>
                {i18n.t("DEPOSIT_RECURRENT")}
              </div>
            </div>
          </Grid> */}

          {/* <Grid item xs={6} sm={4}>
            <div className={style.containerInput}>
              <Grid item className={style.selectImageDate}>
                <div className={!checkBox ? style.desable : ""}>
                  <img
                    src="images/icons/deposit/calendar@25x28.png"
                    alt="Calendar"
                  />

                  <FormControl
                    className={classes.formControl}
                    disabled={!checkBox}
                  >
                    <div className={style.paddingTop}>
                      <Select
                        classes={{
                          selectMenu: classes.selectDate
                        }}
                        MenuProps={MenuProps}
                        value={this.state.dayPayment}
                        renderValue={value => value}
                        onChange={event =>
                          this.handleChange(event.target.value)
                        }
                        name="day"
                        disableUnderline={true}
                        IconComponent={props => <img {...props} src={imgUri} />}
                        style={{ fontSize: ".9em", paddingLeft: "25px" }}
                      >
                        {this.listDays()}
                      </Select>
                    </div>
                  </FormControl>
                </div>
              </Grid>
            </div>
          </Grid> */}
        </Grid>
      </div>
    );
  };

  inputValidator = () => {
    const { openModal, setPaymentMethod, setKycValidation } = this.props;
    const { paymentName, depositValue } = this.state;
    setPaymentMethod(paymentName);
    if (depositValue > 100) {
      setKycValidation();
    }
    //validações
    openModal();
  };

  render() {
    const { payment, depositValue } = this.state;
    const { packages, loading } = this.props;

    if (loading) return <Loading />;
    if (!packages.length)
      return (
        <div className={style.boxContainer}>
          <div className={style.box1}>
            <h1 className={style.textCenter}>
              {i18n.t("DEPOSIT_INF_NOT_FOUND")}
            </h1>
          </div>
        </div>
      );
    return (
      <div>
        <Grid container direction="row" justify="center">
          <Grid
            item
            xs={12}
            sm={7}
            className={style.box}
            style={{ padding: 5 }}
          >
            <Grid container style={{ justifyContent: "center" }}>
              <Hidden xsDown>
                <Grid item xs={1} className={style.arrowControl}>
                  <IconButton
                    color="inherit"
                    aria-label={i18n.t("TEXT_PREV")}
                    onClick={() => this.moveSlide("prev")}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </Grid>
              </Hidden>

              <Grid item xs={12} sm={10} style={{ minHeight: 300 }}>
                <Slider ref={c => (this.slider = c)} {...settings}>
                  {this.renderPacks()}
                </Slider>
              </Grid>

              <Hidden xsDown>
                <Grid item xs={1} className={style.arrowControl}>
                  <IconButton
                    color="inherit"
                    aria-label={i18n.t("TEXT_PREV")}
                    onClick={() => this.moveSlide()}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </Grid>
              </Hidden>

              <Grid
                item
                xs={12}
                className={style.transparentBox}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                {this.renderPaymentMethods()}
              </Grid>

              <Grid
                item
                xs={12}
                className={style.transparentBox}
                style={{ marginTop: "10px" }}
              >
                <button
                  className={style.buttonBorderGreen}
                  onClick={() => this.inputValidator()}
                >
                  {i18n.t("DEPOSIT_TAB_TITLE")}
                </button>
              </Grid>
              <Grid
                item
                xs={12}
                className={style.transparentBox}
                style={{ marginTop: "10px" }}
              >
                <div className={style.information}>
                  <a href="#">
                    {i18n.t("COUPON_INSTRUCTIONS")}
                    <img
                      src="/images/icons/recharge/ic_instrucoes.png"
                      alt={i18n.t("COUPON_INSTRUCTIONS")}
                    />
                  </a>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Invoice.propTypes = {
  openModal: PropTypes.func,
  setPaymentMethod: PropTypes.func,
  openModal: PropTypes.func,
  setKycValidation: PropTypes.func.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  methods: PropTypes.array
};

const mapStateToProps = store => ({
  packages: store.deposit.packages,
  loading: store.deposit.loading,
  methods: store.deposit.paymentMethods
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPaymentMethod,
      setKycValidation,
      setSelectedValue,
      setPaymentMethod
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customStyle)(Invoice));
