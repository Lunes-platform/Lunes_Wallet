import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import i18n from "../../../utils/i18n";

// import Select from "../../../components/select";
import { Grid, Avatar, Input } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { Done, Close } from "@material-ui/icons";
import style from "./style.css";
import colors from "../../../components/bases/colors";

// MATERIAL UI
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import Select from "./select";

const customStyle = {
  img: {
    width: "60%",
    height: "auto"
  },
  inputRoot: {
    color: colors.messages.info,
    marginBottom: "1rem",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  inputCss: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px"
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  selectRoot: {
    color: colors.messages.info,
    "&:before": {
      marginBottom: "1rem"
    },
    "&:before, &:after": {
      borderColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderColor: `${colors.purple.dark} !important`
    }
  },
  underlineItems: {
    selected: {
      backgroundColor: 'red !important',
    },
    borderBottom: '1px solid ',
    borderBottomColor: `${colors.purple.dark} !important`,
    "&:hover": {
      borderBottom: '2px solid',
    },
    "&:before, &:after": {
      borderBottom: '5px solid',
    },
  },
  disabled: {},
  error: {},
  focused: {},
};

const days = [...Array(31).keys()].map(day => day + 1);
const months = [...Array(12).keys()].map(month => month + 1);
const years = [...Array(70).keys()].map(year => year + 1949);

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      verified: undefined,
      birth_day: undefined,
      birth_month: undefined,
      birth_year: undefined
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleBirthDayChange = this.handleBirthDayChange.bind(this);
    this.handleBirthMonthChange = this.handleBirthMonthChange.bind(this);
    this.handleBirthYearChange = this.handleBirthYearChange.bind(this);
  }

  changeAvatar = () => {
    alert("Avatar changed!");
  };

  handleSelectChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleBirthDayChange = value => this.handleSelectChange("birth_day", value);
  handleBirthMonthChange = value =>
    this.handleSelectChange("birth_month", value);
  handleBirthYearChange = value => this.handleSelectChange("birth_year", value);

  render() {
    const { classes } = this.props;
    const { verified, birth_day, birth_month, birth_year } = this.state;

    return (
      <div>
        <Grid item xs={12} className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("SETTINGS_USER")} </h3>
              </Grid>
            </Hidden>
            <Grid item sm={1} />

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

            <Grid item xs={8} sm={6} id={"hr"}>
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
                  src="http://www.achieveaim.com/media/images/user/4.jpg"
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
                  {`${i18n.t("SETTINGS_USER_STATUS")}: `}
                  <span
                    className={
                      verified ? style.successStatus : style.errorStatus
                    }
                  >
                    {verified
                      ? i18n.t("SETTINGS_USER_ACCOUNT_VERIFIED")
                      : i18n.t("SETTINGS_USER_ACCOUNT_NOT_VERIFIED")}
                  </span>
                </p>
                <p
                  className={style.textDefault}
                  style={{ margin: "1rem 0 0 0" }}
                >
                  {verified ? (
                    <Done className={style.successDefault} />
                  ) : (
                      <Close className={style.errorDefault} />
                    )}
                  <span className={style.statusItem}>
                    {i18n.t("SETTINGS_USER_EMAIL_VERIFIED")}
                  </span>
                </p>
                <p className={style.textDefault} style={{ marginTop: "0" }}>
                  {verified ? (
                    <Done className={style.successDefault} />
                  ) : (
                      <Close className={style.errorDefault} />
                    )}
                  <span className={style.statusItem}>
                    {i18n.t("SETTINGS_USER_2FA_VERIFIED")}
                  </span>
                </p>
              </div>
            </Grid>

            {/* PASSWORD */}
            <Grid item xs={12} className={style.row}>
              <div className={style.content}>
                <p className={style.whiteTitle}>
                  {i18n.t("SETTINGS_USER_PASSWORD")}
                </p>
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_CURRENT_PASSWORD")}
                  inputProps={{ required: false }}
                />
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  inputProps={{ required: false }}
                />
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  inputProps={{ required: false }}
                />
              </div>
            </Grid>
            <Grid item xs={12} className={style.buttonContainer}>
              <button
                className={style.buttonEnable}
                onClick={() => alert("Password changed!")}
              >
                {i18n.t("SETTINGS_USER_CHANGE_PASSWORD")}
              </button>
            </Grid>
          </Grid>

          {/* USER INFO */}
          <Grid item xs={12} sm={6} md={7}>
            <Grid item xs={12} className={style.row}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_FIRST_NAME")}
                    </p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      inputProps={{ required: false }}
                    />
                  </div>

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
                              selectMenu: classes.underlineItems,
                            }}
                            items={days}
                            value={birth_day}
                            action={this.handleBirthDayChange}
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>


                      <Grid item xs={4} className={style.selectItem}>
                        <div className={style.selectLabel}>
                          {i18n.t("SETTINGS_USER_MONTH")}
                        </div>
                        <FormControl className={classes.formControl}>

                          <Select
                            classes={{
                              selectMenu: classes.underlineItems,
                            }}
                            items={months}
                            value={birth_month}
                            action={this.handleBirthMonthChange}
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            <MenuItem value={"jan"}>jan</MenuItem>
                            <MenuItem value={"fev"}>fev</MenuItem>
                            <MenuItem value={"mar"}>mar</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} className={style.selectItem}>
                        <FormControl className={classes.formControl}>
                          <div className={style.selectLabel}>
                            {i18n.t("SETTINGS_USER_YEAR")}
                          </div>

                          <Select
                            classes={{
                              selectMenu: classes.underlineItems,
                            }}
                            items={years}
                            value={birth_year}
                            action={this.handleBirthMonthChange}
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            <MenuItem value={"2018"}>2018</MenuItem>
                            <MenuItem value={"2017"}>2017</MenuItem>
                            <MenuItem value={"2016"}>2016</MenuItem>

                          </Select>
                        </FormControl>
                      </Grid>




                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_SURNAME")}
                    </p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                    />
                  </div>

                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_CONTACT")}
                    </p>
                    <div
                      style={{ float: "left", width: "40%" }}
                    >
                      <Input
                        type="number"
                        classes={{
                          root: classes.inputRoot,
                          underline: classes.inputCssUnderline,
                          input: classes.inputCss
                        }}
                        style={{ width: "30%", float: "left", marginTop: "15px" }}
                      />

                    </div>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      style={{ width: "50%", float: "right", marginTop: "15px" }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12} >
              <Grid item xs={12} className={style.rowAdress}>
                <Grid item xs={12}>
                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_ADDRESS")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      inputProps={{ required: false }}
                    />
                  </div>

                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_CITY")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_ZIP_CODE")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                    />
                  </div>

                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_STATE")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} className={style.buttonContainer}>
                <button
                  className={style.buttonEnable}
                  onClick={() => alert("Data stored!")}
                >
                  {i18n.t("SETTINGS_USER_SAVE_DATA")}
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div >
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(customStyle)(User);
