import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink, withRouter } from "react-router-dom";

// UTILS
import i18n from "../../utils/i18n";

// REDUX
import { connect } from "react-redux";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";

// STYLE
import style from "./style.css";

// array itens menu
const menuItens = [
  {
    link: "/home",
    label: i18n.t("MENU_HOME"),
    icon: "../../images/icons/general/home@2x.png"
  },

  {
    link: "/wallet",
    label: i18n.t("MENU_WALLET"),
    icon: "../../images/icons/general/wallet@1x.png"
  },
  {
    link: "/leasing",
    label: i18n.t("MENU_LEASING"),
    icon: "../../images/icons/general/leasing@1x.png"
  },
  {
    link: "/assets",
    label: i18n.t("MENU_ASSETS"),
    icon: "../../images/icons/general/wallet@1x.png"
  },

  {
    link: "/payment",
    label: i18n.t("MENU_PAY"),
    icon: "../../images/icons/general/pay@1x.png"
  },
  {
    link: "/recharge",
    label: i18n.t("MENU_RECHARGE"),
    icon: "../../images/icons/general/pay@1x.png"
  },
  {
    link: "/coupons",
    label: i18n.t("MENU_COUPONS"),
    icon: "../../images/icons/general/cupon@1x.png"
  }
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMenu = () => {
    let { pathname } = this.props.location;
    const { actionMenu } = this.props;

    return menuItens.map((item, key) => {
      let classStyle = style.linkMenu;

      if (item.label === "Home" && (pathname === "/" || pathname === "/home")) {
        classStyle = style.linkMenu + " " + style.linkMenuActive;
      }

      return (
        <NavLink
          className={classStyle}
          activeClassName={style.linkMenuActive}
          to={item.link}
          key={key}
          onClick={actionMenu}
        >
          <img src={item.icon} className={style.iconMenu} />
          <div onClick={actionMenu}>{item.label}</div>
        </NavLink>
      );
    });
  };

  render() {
    const { openMenu, user, actionLogout, actionMenu } = this.props;

    return (
      <div
        className={style.colMenu}
        style={{ left: +openMenu ? " 0px " : "-232px" }}
      >
        <Hidden lgUp>
          <Grid container className={style.boxUserMenu}>
            <Grid item xs={4} align="center">
              <Avatar alt="Avatar" src={user.profilePicture} />
            </Grid>
            <Grid item xs={8}>
              <span className={style.userName}>{user.name}</span>
              <br />
              <Link to="/settings" className={style.link} onClick={actionMenu}>
                {i18n.t("MENU_SETTING")}
              </Link>
              <a
                href="mailto:support@lunes.io"
                className={style.link}
                onClick={actionMenu}
              >
                {i18n.t("MENU_SUPPORT")}
                {/* <Link to="/help" className={style.link}></Link> */}
              </a>
              <Link to="/" onClick={actionLogout} className={style.link}>
                {i18n.t("MENU_LOGOUT")}
              </Link>
            </Grid>
          </Grid>
        </Hidden>
        {this.renderMenu()}
      </div>
    );
  }
}

Menu.propTypes = {
  location: PropTypes.object,
  openMenu: PropTypes.bool.isRequired,
  actionMenu: PropTypes.func.isRequired,
  actionLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user.user
});

export default connect(
  mapSateToProps,
  null
)(withRouter(Menu));
