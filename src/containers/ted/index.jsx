import React from "react";

// COMPONENTS
import Tabs from "../../components/tabs";
import TED from "./tedItems/ted";
import History from "./historyItems/history";

// MATERIAL
import { Grid, Hidden } from "@material-ui/core";

// UTILS
import i18n from "../../utils/i18n";

// STYLES
import style from "./style.css";

const titles = [
  i18n.t("PAYMENT_TED_TITLE_ABA_1"),
  i18n.t("PAYMENT_TED_TITLE_ABA_2")
];

class Ted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const contents = [
      <TED openModal={this.handleModal} key="1" />,
      <History openModal={this.handleModal} key="2" />
    ];
    return (
      <Grid>
        <Grid container className={style.containerTED}>
          <Hidden smUp>
            <Grid item xs={12}>
              <center>
                <h3 className={style.TittleTED}>
                  {" "}
                  {i18n.t("PAYMENT_TED_TITLE_2")}{" "}
                </h3>
                <h4>{i18n.t("PAYMENT_TED_INSTRUCTION_3")}</h4>
              </center>
              <text>{i18n.t("PAYMENT_TED_INSTRUCTION_2")}</text>
            </Grid>
          </Hidden>
          <Hidden xsDown>
            <Grid item xs={11} sm={7} md={6}>
              <center>
                <h3 className={style.TittleTED}>
                  {" "}
                  {i18n.t("PAYMENT_TED_TITLE_1")}{" "}
                </h3>
                <h4>{i18n.t("PAYMENT_TED_INSTRUCTION_1")}</h4>
              </center>
              <text>{i18n.t("PAYMENT_TED_INSTRUCTION_2")}</text>
            </Grid>
          </Hidden>
        </Grid>

        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </Grid>
    );
  }
}

export default Ted;
