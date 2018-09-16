import React from "react";
import {Link} from "react-router-dom";

// REDUX
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updateUserConsents} from "../../user/redux/userAction";

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS
import CustomSwitch from "./customSwitch";

// MATERIAL
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLES
import style from "./style.css";

const configs = [
  {
    title: "GDPR",
    description: i18n.t("SETTINGS_CONSENTS_GDPR_DESCRIPTION"),
    name: "gdpr"
  },
];

class Consent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gdpr: props.user.gdpr || 'unread',
    };
  }

  handleSwitch = name => event => {
    const {updateUserConsents} = this.props;
    const newStatus = event.target.checked ? 'read' : 'unread';

    this.setState({
      [name]: newStatus
    });

    updateUserConsents({
      [name]: newStatus
    });
  };

  renderSwitch = () => {
    return configs.map((val, key) => {
      return (
        <CustomSwitch
          key={key}
          title={val.title}
          description={val.description}
          action={this.handleSwitch(val.name)}
          checked={this.state[val.name]}
          value={val.name}
        />
      );
    });
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid container className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("CONSENT_TITLE")} </h3>
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
                <h3>{i18n.t("CONSENT_TITLE")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={11}>
          {this.renderSwitch()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserConsents
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Consent);
