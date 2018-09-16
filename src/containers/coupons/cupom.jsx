import React from "react";
import i18n from "../../utils/i18n";
import { Grid } from "@material-ui/core";
import style from "./style.css";
import Instructions from "./instructions";

class Cupom extends React.Component {
  constructor() {
    super();

    this.state = {
      code: "",
      errors: undefined
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      code: event.target.value
    });
  };

  render() {
    const { code } = this.state;

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box}>
          <div className={style.cupomRow}>
            <label>{i18n.t("VOUCHER_CODE")}</label>
            <input
              className={style.inputTextDefault}
              value={code}
              placeholder="1234-1234-1234-1234"
              maxLength={16}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className={style.row}>
            <Instructions />
          </div>

          <div className={style.row}>
            <button
              className={style.buttonBorderGreen}
              onClick={() => this.inputValidator()}
            >
              {i18n.t("VOUCHER_BUTTON")}
            </button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Cupom;
