import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

//MATERIAL UI
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";

//STYLE
import style from "./style.css";

//COMPONENTS
import UserControl from "./userControl.jsx";

//UTILS
import { TESTNET } from "../../constants/apiBaseUrl";
import { getDefaultFiat, getDefaultCrypto } from "../../utils/localStorage";
import i18n from "../../utils/i18n";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: 0
    };
  }

  renderNotifications = () => {
    const { notifications } = this.state;

    if (notifications > 0) {
      return (
        <div className={style.iconNotificationActive}>
          <IconButton color="inherit" aria-label="Notifications">
            <Badge badgeContent color="secondary" width="5px" height="5px">
              <img
                src="/images/icons/general/bell@1x.png"
                alt=""
                height="25px"
                width="25px"
                classes={{ width: "50px" }}
              />
              {/* <Notifications  /> */}
            </Badge>
          </IconButton>
        </div>
      );
    } else {
      return (
        <div className={style.iconNotification}>
          <IconButton color="inherit" aria-label="Notifications">
            <img
              src="/images/icons/general/bell@1x.png"
              height="25px"
              width="25px"
              alt=""
            />
          </IconButton>
        </div>
      );
    }
  };

  renderBalance = () => {
    let { coins } = this.props;
    let coinSelected = getDefaultCrypto();
    let fiatSelected = getDefaultFiat();

    let coinName = coins[coinSelected]
      ? coins[coinSelected].abbreviation.toUpperCase()
      : "UNDEFINED";
    let coinBalance = coins[coinSelected]
      ? coins[coinSelected].balance.available
      : 0;
    let coinFiat = coins[coinSelected]
      ? (coins[coinSelected].price[fiatSelected].price * coinBalance).toFixed(2)
      : 0;

    return (
      <div className={style.boxBalance}>
        <Hidden xsDown>
          <span className={style.textGreen}>{i18n.t("WALLET_MY_AMOUNT")}</span>
        </Hidden>
        <span className={style.textBalance}>
          {" "}
          {coinBalance} {coinName}
        </span>
        <span className={style.textBalanceFiat}>${coinFiat}</span>
      </div>
    );
  };

  render() {
    const { actionMenu, actionLogout } = this.props;

    return (
      <AppBar position="static">
        <Toolbar className={style.header}>
          <Hidden lgUp>
            <div className={style.menuHamb}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={actionMenu}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Hidden>
          <div className={style.boxLogo}>
            <img src="../../images/logo.svg" className={style.logo} />
            {!TESTNET || <span className={style.textGreen}>Testnet</span>}
          </div>
          {this.renderBalance()}
          {/* <Hidden xsDown>{this.renderNotifications()}</Hidden> */}

          <Hidden mdDown>
            <UserControl actionLogout={actionLogout} />
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  actionMenu: PropTypes.func.isRequired,
  actionLogout: PropTypes.func.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins
});

export default connect(
  mapSateToProps,
  null
)(Header);
