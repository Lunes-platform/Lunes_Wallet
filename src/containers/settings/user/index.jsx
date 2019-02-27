import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  editUserData,
  loading,
  updateUserPassword
} from "../../user/redux/userAction";

// UTILS
import i18n from "../../../utils/i18n";
import compose from "recompose/compose";
import { getProfileImg } from "./../../../utils/user.js";

// STYLE
import colors from "../../../components/bases/colors";
import style from "./style.css";
import "react-phone-number-input/style.css";
//import "react-responsive-ui/style.css";

// COMPONENTS
import Loading from "../../../components/loading";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Avatar } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { Done, Close } from "@material-ui/icons";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";

import CountrySelectNative from "./select/phoneSelect";

// STYLE DO MATERIAL UI (Permitido)
const customStyle = {
  img: {
    width: "60%",
    height: "auto"
  },
  underlineItems: {
    color: "white",
    borderBottom: "1px solid ",
    borderBottomColor: `${colors.purple.dark} !important`,
    fontSize: "16px !important"
  },
  menuItemRoot: {
    color: colors.messages.info
  },
  disabled: {},
  error: {},
  focused: {}
};

// STYLE DO MATERIAL UI (Permitido)
const MenuProps = {
  PaperProps: {
    style: {
      color: "#fff",
      maxHeight: 40 * 4.5,
      marginTop: "45px",
      backgroundColor: "#473088",
      width: "68px"
    }
  }
};

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      emailVerified: true,
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      phone: "",
      address: "",
      city: "",
      zipcode: "",
      state: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      country: ""
    };
  }

  componentDidMount() {
    let { user } = this.props;

    let date = !user.birthday
      ? ""
      : new Date(user.birthday).toISOString().substring(10, 0);
    let day = date.substring(10, 8);
    let month = date.substring(7, 5);
    let year = date.substring(0, 4);
    
    this.setState({
      name: !user.name ? "" : user.name,
      surname: !user.surname ? "" : user.surname,
      phone: !user.phone ? "" : "+"+(user.phone).toString(),
      address: !user.street ? "" : user.street,
      city: !user.city ? "" : user.city,
      zipcode: !user.zipcode ? "" : user.zipcode,
      state: !user.state ? "" : user.state,
      birthDay: !date ? "" : parseInt(day < 10 ? day.replace(0, "") : day),
      birthMonth: !date
        ? ""
        : parseInt(month < 10 ? month.replace(0, "") : month),
      birthYear: !date ? "" : parseInt(year)
    });
  }

  handleSelectChange = (property, value) => {
    switch (property) {
      case "name":
      case "surname":
        value = value.replace(/([\d\\/-])/g, "");
        break;
      case "state":
      case "city":
        value = value.replace(/([\d\\/])/g, "");
        break;
      case "zipcode":
        value = value.replace(/([^\d/])/g, "");
        break;
      case "birthDay":
      case "birthMonth":
      case "birthYear":
      case "address":
        value;
        break;
      case "password":
      case "newPassword":
      case "confirmNewPassword":
        value = value.replace(/\s/, "");
        break;
    }

    this.setState({
      ...this.state,
      [property]: value
    });
    return;
  };

  changeAvatar = () => {
    window.open("https://gravatar.com", "blank");
  };

  updateData = () => {
    let { editUserData, loading } = this.props;
    let {
      name,
      surname,
      phone,
      address,
      city,
      zipcode,
      state,
      birthDay,
      birthMonth,
      birthYear
    } = this.state;

    let userData = {
      name,
      surname,
      birthday: `${birthMonth}/${birthDay}/${birthYear}`,
      phone: phone.toString(),
      street: address,
      city,
      state,
      zipcode
    };

    loading();
    editUserData(userData);
  };

  changeUserPassword = () => {
    const { updateUserPassword, user } = this.props;
    const { password, newPassword, confirmNewPassword } = this.state;

    updateUserPassword(
      user.password,
      password,
      newPassword,
      confirmNewPassword
    );
  };

  loadDays = () => {
    const { classes } = this.props;
    const days = [...Array(31).keys()];

    return days.map((day, index) => (
      <MenuItem
        classes={{
          root: classes.menuItemRoot
        }}
        key={index}
        value={day + 1}
      >
        {day + 1}
      </MenuItem>
    ));
  };

  loadYears = () => {
    const { classes } = this.props;
    let date = new Date();
    let lastEighteenYears = date.getFullYear() - 18;
    let lastOneHundredYears = lastEighteenYears - 100;
    let yearsToGo = [...Array(lastEighteenYears - lastOneHundredYears).keys()];

    return yearsToGo.map((year, index) => (
      <MenuItem
        classes={{
          root: classes.menuItemRoot
        }}
        key={index}
        value={lastEighteenYears - year}
      >
        {lastEighteenYears - year}
      </MenuItem>
    ));
  };

  loadMounth = () => {
    const { classes } = this.props;
    let monthNames = [
      i18n.t("JANUARY"),
      i18n.t("FEBRUARY"),
      i18n.t("MARCH"),
      i18n.t("APRIL"),
      i18n.t("MAY"),
      i18n.t("JUNE"),
      i18n.t("JULY"),
      i18n.t("AUGUST"),
      i18n.t("SEPTEMBER"),
      i18n.t("OCTOBER"),
      i18n.t("NOVEMBER"),
      i18n.t("DECEMBER")
    ];

    return monthNames.map((month, index) => (
      <MenuItem
        classes={{
          root: classes.menuItemRoot
        }}
        key={index}
        value={index + 1}
      >
        {month.substring(0, 3)}
      </MenuItem>
    ));
  };

  handlePhoneNumber = phone => {
    
    const { country } = this.state;
    let phoneNumber;
    try {
      phoneNumber = parsePhoneNumber(phone, country);
    } catch (error) {
      phoneNumber = "";
    }
    this.setState({ phone: phoneNumber.number });
  };

  render() {
    const { classes, user, isLoading, twoFactor } = this.props;
    const {
      emailVerified,
      birthDay,
      birthMonth,
      birthYear,
      name,
      surname,
      city,
      phone,
      address,
      zipcode,
      state,
      password,
      newPassword,
      confirmNewPassword,
      country
    } = this.state;
    
    return (
      <div>
        <Grid item xs={12} className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("SETTINGS_USER")} </h3>
              </Grid>
            </Hidden>
            <Grid item xs={2} />

            <Grid item xs={6} sm={2}>
              <Link to="settings">
                <p>{i18n.t("SETTING_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("SETTINGS_USER")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={style.container}>
          <Grid item xs={12} sm={4} md={3}>
            {/* AVATAR */}
            <Grid item xs={12} className={style.row}>
              <div className={style.avatarAlign}>
                <Avatar
                  src={getProfileImg()}
                  alt={i18n.t("SETTINGS_USER_IMAGE")}
                  className={style.avatar}
                />
              </div>
              <div className={style.avatarAlign}>
                <Avatar
                  classes={{ img: classes.img }}
                  src="/images/icons/camera/camera@2x.png"
                  alt={i18n.t("SETTINGS_USER_IMAGE")}
                  className={style.btnAvatar}
                  onClick={() => this.changeAvatar()}
                />
              </div>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} className={style.row}>
              <div className={style.content}>
                <p className={style.whiteTitle}>
                  {i18n.t("SETTINGS_USER_STATUS")}
                  <span
                    className={
                      emailVerified && twoFactor
                        ? style.successStatus
                        : style.errorStatus
                    }
                  >
                    {emailVerified && twoFactor
                      ? i18n.t("SETTINGS_USER_ACCOUNT_VERIFIED")
                      : i18n.t("SETTINGS_USER_ACCOUNT_NOT_VERIFIED")}
                  </span>
                </p>
                <p className={style.pUserStatus_1}>
                  {emailVerified ? (
                    <React.Fragment>
                      <Done className={style.successDefault} />
                      <span className={style.statusItem}>
                        {i18n.t("SETTINGS_USER_EMAIL_VERIFIED")}
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Close className={style.errorDefault} />
                      <span className={style.statusItem}>
                        {i18n.t("SETTINGS_USER_EMAIL_NOT_VERIFIED")}
                      </span>
                    </React.Fragment>
                  )}
                </p>
                <p className={style.pUserStatus_2}>
                  {twoFactor ? (
                    <React.Fragment>
                      <Done className={style.successDefault} />
                      <span className={style.statusItem}>
                        {i18n.t("SETTINGS_USER_2FA_VERIFIED")}
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Close className={style.errorDefault} />
                      <span className={style.statusItem}>
                        {i18n.t("SETTINGS_USER_2FA_NOT_VERIFIED")}
                      </span>
                    </React.Fragment>
                  )}
                </p>
              </div>
            </Grid>

            {/* PASSWORD */}
            <Grid item xs={12} className={style.row}>
              <div className={style.content}>
                <p className={style.whiteTitle}>
                  {i18n.t("SETTINGS_USER_PASSWORD")}
                </p>
                <input
                  className={style.inputTextDefault}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_CURRENT_PASSWORD")}
                  onChange={event =>
                    this.handleSelectChange("password", event.target.value)
                  }
                  value={password}
                />
                <input
                  className={style.inputTextDefault}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  onChange={event =>
                    this.handleSelectChange("newPassword", event.target.value)
                  }
                  value={newPassword}
                />
                <input
                  className={style.inputTextDefault}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_CONFIRM_NEW_PASSWORD")}
                  onChange={event =>
                    this.handleSelectChange(
                      "confirmNewPassword",
                      event.target.value
                    )
                  }
                  value={confirmNewPassword}
                />
              </div>
            </Grid>
            <Grid item xs={12} className={style.buttonContainer}>
              <button
                className={style.buttonEnable}
                onClick={this.changeUserPassword}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  i18n.t("SETTINGS_USER_CHANGE_PASSWORD")
                )}
              </button>
            </Grid>
          </Grid>

          {/* USER INFO */}
          <Grid item xs={12} sm={6} md={9}>
            <Grid item xs={12} className={style.row}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_FIRST_NAME")}
                    </p>
                    <input
                      className={style.inputTextDefault}
                      onChange={event =>
                        this.handleSelectChange("name", event.target.value)
                      }
                      value={name}
                      pattern="[0-9]+$"
                    />
                  </div>
                  <Hidden mdUp>
                    <div className={style.content}>
                      <p className={style.textDefault}>
                        {i18n.t("SETTINGS_USER_SURNAME")}
                      </p>
                      <input
                        className={style.inputTextDefault}
                        onChange={event =>
                          this.handleSelectChange("surname", event.target.value)
                        }
                        value={surname}
                      />
                    </div>
                  </Hidden>
                </Grid>
                <Grid item xs={6}>
                  <Hidden smDown>
                    <div className={style.content}>
                      <p className={style.textDefault}>
                        {i18n.t("SETTINGS_USER_SURNAME")}
                      </p>
                      <input
                        className={style.inputTextDefault}
                        onChange={event =>
                          this.handleSelectChange("surname", event.target.value)
                        }
                        value={surname}
                      />
                    </div>
                  </Hidden>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_BIRTHDATE")}
                    </p>
                    <Grid container>
                      <Grid item xs={4} className={style.selectItem}>
                        <div className={style.selectLabel}>
                          {i18n.t("SETTINGS_USER_DAY")}
                        </div>
                        <FormControl className={classes.formControl}>
                          <Select
                            classes={{
                              selectMenu: classes.underlineItems
                            }}
                            MenuProps={MenuProps}
                            value={birthDay}
                            onChange={event =>
                              this.handleSelectChange(
                                "birthDay",
                                event.target.value
                              )
                            }
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            {this.loadDays()}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4} className={style.selectItem}>
                        <div className={style.selectLabel}>
                          {i18n.t("SETTINGS_USER_MONTH")}
                        </div>
                        <FormControl>
                          <Select
                            classes={{
                              selectMenu: classes.underlineItems
                            }}
                            MenuProps={MenuProps}
                            value={birthMonth}
                            onChange={event =>
                              this.handleSelectChange(
                                "birthMonth",
                                event.target.value
                              )
                            }
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            {this.loadMounth()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} className={style.selectItem}>
                        <div className={style.selectLabel}>
                          {i18n.t("SETTINGS_USER_YEAR")}
                        </div>
                        <FormControl className={style.selectItem}>
                          <Select
                            classes={{
                              selectMenu: classes.underlineItems
                            }}
                            MenuProps={MenuProps}
                            value={birthYear}
                            onChange={event =>
                              this.handleSelectChange(
                                "birthYear",
                                event.target.value
                              )
                            }
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            {this.loadYears()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Hidden smDown>
                  <Grid item xs={6}>
                    <div className={style.content}>
                      <p className={style.textDefault}>
                        {i18n.t("SETTINGS_USER_CONTACT")}
                      </p>
                      <FormControl className={classes.formControl}>
                        <PhoneInput
                          placeholder=""
                          inputClassName={style.inputTextPhone}
                          countrySelectComponent={CountrySelectNative}
                          className={style.phoneNumberSelect}
                          value={phone}
                          onChange={ phone => this.handlePhoneNumber(phone)}
                          onCountryChange={country =>
                            this.setState({ country })
                          }
                        />
                      </FormControl>
                    </div>
                  </Grid>
                </Hidden>
                <Hidden mdUp>
                  <Grid item xs={12}>
                    <div className={style.content}>
                      <p className={style.textDefault}>
                        {i18n.t("SETTINGS_USER_CONTACT")}
                      </p>
                      <FormControl className={classes.formControl}>
                        <PhoneInput
                          placeholder=""
                          inputClassName={style.inputTextPhone}
                          countrySelectComponent={CountrySelectNative}
                          className={style.phoneNumberSelect}
                          value={phone}
                          onChange={ phone => this.handlePhoneNumber(phone)}
                          onCountryChange={country =>
                            this.setState({ country })
                          }
                        />
                      </FormControl>
                    </div>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12}>
              <Grid item xs={12} className={style.rowAdress}>
                <Grid item xs={12} sm={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_ADDRESS")}
                    </p>
                    <input
                      className={style.inputTextDefault}
                      onChange={event =>
                        this.handleSelectChange("address", event.target.value)
                      }
                      value={address}
                    />
                  </div>

                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_CITY")}
                    </p>
                    <input
                      className={style.inputTextDefault}
                      onChange={event =>
                        this.handleSelectChange("city", event.target.value)
                      }
                      value={city}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_ZIP_CODE")}
                    </p>
                    <input
                      maxLength="8"
                      className={style.inputTextDefault}
                      onChange={event =>
                        this.handleSelectChange("zipcode", event.target.value)
                      }
                      value={zipcode}
                    />
                  </div>

                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_STATE")}
                    </p>
                    <input
                      className={style.inputTextDefault}
                      onChange={event =>
                        this.handleSelectChange("state", event.target.value)
                      }
                      value={state}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} className={style.buttonContainer}>
                <button
                  className={style.buttonEnable}
                  onClick={() => this.updateData()}
                >
                  {isLoading ? <Loading /> : i18n.t("SETTINGS_USER_SAVE_DATA")}
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  twoFactor: PropTypes.bool,
  editUserData: PropTypes.func,
  loading: PropTypes.func,
  isLoading: PropTypes.bool,
  updateUserPassword: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editUserData,
      loading,
      updateUserPassword
    },
    dispatch
  );

const mapStateToProps = store => ({
  user: store.user.user,
  twoFactor: store.user.twoFactor,
  isLoading: store.user.loading
});

export default compose(
  withStyles(customStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(User);
