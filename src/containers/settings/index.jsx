import React from "react";
import Settings from "./settings";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTwoFactorAuth } from "./redux/settingsAction";
import { errorInput } from "../errors/redux/errorAction";
import PropTypes from "prop-types";

class Configuration extends React.Component {
  componentDidMount() {
    let { getTwoFactorAuth, twoFactor } = this.props;
    if (!twoFactor)
      getTwoFactorAuth();
  }
  render() {
    let { settings } = this.props;
    return (
      <div>
        {
          settings.security.urlImage
            ? <link rel="preload" href={settings.security.urlImage}/> : ''
        }
        <Settings />
      </div>
    );
  }
}
Configuration.propTypes = {
  getTwoFactorAuth: PropTypes.func,
  settings: PropTypes.object,
  twoFactor: PropTypes.bool
}
const mapStateToProps = store => ({
  twoFactor: store.user.twoFactor,
  settings: store.settings
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTwoFactorAuth,
      errorInput
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
