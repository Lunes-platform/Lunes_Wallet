import React from "react";
import { Link } from "react-router-dom";

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
    title: "Definicoes padroes por regiao",
    description: "O idioma selecionado sera automaticamente exibido",
    name: "check1"
  },
  {
    title: "Alerta de Criptomoedas",
    description: "Lorem ipsum asdasdasd as asd s dsdsds ds ds dsdsds d sds.",
    name: "check2"
  }
];

class Consent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
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

            <Grid item xs={8} sm={6} id={"hr"}>
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

export default Consent;
