import React from "react";
import i18n from "../../utils/i18n";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

class InternalError extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 10
    };
  }

  counter = () => {
    let { timer } = this.state;
    if (timer > 0) {
      this.setState({
        ...this.state,
        timer: this.state.timer - 1
      });
    } else if (timer <= 0) {
      location.reload();
    }
  };

  componentDidMount() {
    setInterval(() => this.counter(), 1000);
  }

  render() {
    let { timer } = this.state;
    return (
      <Grid item xs={12}>
        <Grid className={style.alignMainError}>
          <Grid className={style.mainError}>
            <Grid item xs={11} className={style.contentError}>
              <h1> {"5"} </h1>
              <h1> {"0"} </h1>
              <h1> {"0"} </h1>
              <img src="./images/lunio-error@1x.gif" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.alignItemsError}>
          <Grid item xs={11} className={style.itemsError500}>
            <h3> {i18n.t("PAGE_ERROR_500")} </h3>
            <div className={style.counter500}>{timer}</div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default InternalError;
