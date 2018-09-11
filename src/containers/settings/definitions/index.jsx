import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// COMPONENTS 
import CustomSelectImage from "./customSelectImage";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL 
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Hidden from "@material-ui/core/Hidden";


// STYLES
import style from "./style.css";

const materialStyle = theme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: '#ffffff',
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'none',
    backgroundColor: '#ccc',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});


class Definitions extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">

        <Grid container className={style.containerHeaderSettings} >
          <Grid item xs={12} className={style.headerSettingsDefault} >
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("DEFINITIONS_TITLE")} </h3>
              </Grid>
            </Hidden>
            <Grid item sm={1} />

            <Grid item xs={6} sm={2} >
              <Link to="settings">
                <p>{i18n.t("SETTING_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}  >
                <h3>{i18n.t("DEFINITIONS_TITLE")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={8} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={11} sm={10}> 
        <div className={style.box}>

            <h2>{i18n.t("SET_DEFINITIONS_TITLE1")}</h2>
            <div className={style.description}>
              {i18n.t("SET_DEFINITIONS_DESC1")}
            </div>

            <hr className={style.line} />

            <h2>{i18n.t("SET_DEFINITIONS_TITLE2")}</h2>
            <div className={style.formSwitch}>
              {i18n.t("SET_DEFINITIONS_OPTION1")}

              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                disableRipple
                checked={true}
                value="checkedB"
              />

            </div>
            <div className={style.formSwitch}>
              {i18n.t("SET_DEFINITIONS_OPTION2")}
              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                disableRipple
                checked={false}
                value="checkedB"
              />

            </div>

            <hr className={style.line} />

            <Grid container justify="center" className={style.formDefinition}>
              <Grid item xs={11} md={4}>
                {i18n.t("SET_DEFINITIONS_LABEL_LANG")}
                <CustomSelectImage action={() => alert("teste")} />

                {i18n.t("SET_DEFINITIONS_LABEL_CURR")}
                <CustomSelectImage action={() => alert("teste")} />

              </Grid>
              <Grid item xs={11} md={4}>
                {i18n.t("SET_DEFINITIONS_LABEL_COIN")}
                <CustomSelectImage action={() => alert("teste")} />
              </Grid>
            </Grid>

          </div>
        </Grid>
      </Grid>
    )
  }
}

Definitions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyle)(Definitions);