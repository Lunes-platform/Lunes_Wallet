import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//MATERIAL UI
import Avatar from "@material-ui/core/Avatar";

//UTILS
import i18n from "../../utils/i18n";

//STYLE
import style from "./style.css";

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBox: false,
      avatar: "images/icons/lunio/lunio-user@100x100.jpg"
    };
  }

  handleClick = () => {
    this.setState({ ...this.state, openBox: !this.state.openBox });
  };

  renderPopup = () => {
    const { openBox } = this.state;
    const { actionLogout } = this.props;

    if (openBox) {
      setTimeout(() => {
        this.setState({ ...this.state, openBox: false });
      }, 10000);

      return (
        <div className={style.menuUser}>
          <div className={style.arrowUp} />
          <Link
            to="/settings"
            className={style.linkPopMenu}
            onClick={() => this.handleClick()}
          >
            <div className={style.boxIcon}>
              <img src="../../images/icons/settings/settings.png" />
            </div>
            {i18n.t("MENU_SETTING")}
          </Link>

          {/* <Link to="/" className={style.linkPopMenu}> */}
          <a
            href="mailto:support@lunes.io"
            className={style.linkPopMenu}
            onClick={() => this.handleClick()}
          >
            <div className={style.boxIcon}>
              <img src="../../images/icons/question/question.png" />
            </div>
            {i18n.t("MENU_SUPPORT")}
          </a>
          {/* </Link> */}
          <Link to="/" onClick={actionLogout} className={style.linkPopMenu}>
            <div className={style.boxIcon}>
              <img src="../../images/icons/exit/exit.png" />
            </div>
            {i18n.t("MENU_LOGOUT")}
          </Link>
        </div>
      );
    }
  };

  render() {
    const { user } = this.props.user;
    return (
      <div>
        <Avatar
          alt="Avatar"
          src={user.profilePicture}
          className={style.avatarHeader}
          onClick={() => this.handleClick()}
        />

        {this.renderPopup()}
      </div>
    );
  }
}

UserControl.propTypes = {
  actionLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

export default connect(
  mapSateToProps,
  null
)(UserControl);
