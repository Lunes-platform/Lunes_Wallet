import React from "react"

// MATERIAL UI
import { Grid } from "@material-ui/core";

// COMPONENTS
import Code from './code';
import Instructions from "./instructions";

// STYLES
import style from "./style.css";

// UTILS
import i18n from "../../utils/i18n";
import { inputValidator } from "../../utils/inputValidator";

class LunesGift extends React.Component {
  constructor() {
    super();

    this.state = {
      code: ['','','',''],
      errors: undefined
    }

    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handleCodeChange = (id, value) => {
    const code = this.state.code;
    code[id] = value;

    this.setState({
      ...this.state,
      code
    });
  }

  inputValidator = () => {
    const {code} = this.state;

    const codeInput = {
      type: "text",
      name: "code",
      placeholder: "Code",
      value: code.join('').replace(/\D/, ''),
      required: true,
      minLength: 16,
      maxLength: 16,
    }

    inputValidator({code: codeInput});
  }

  render() {
    const { code } = this.state;

    return (
      <Grid container
        direction="row"
        justify="center"
      >
        <Grid item
          xs={12}
          className={style.box}
        >
          <div className={style.giftRow}>
            <label>{i18n.t("VOUCHER_CODE")}</label>
            <Code values={code} onHandleChange={this.handleCodeChange} />
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
    )
  }
}

export default LunesGift;


