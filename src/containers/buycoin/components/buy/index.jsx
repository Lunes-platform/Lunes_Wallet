import React from "react";

// COMPONENTS
import PaymentBar from "../paymentBar";
import CoinsBar from "../coinsBar";
import PackCoins from "../packCoins";
import Instructions from "../instructions";
import Grid from "@material-ui/core/Grid";

// STYLES
import style from "./style.css";

class Buy extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Grid item xs={12} id={"hr"}>
            <hr align="left" />
            <span>
              <b>Créditos</b>
            </span>
            <span className={style.credit}>&nbsp;$ 500.00000000</span>
          </Grid>
        </div>
        <div>
          <CoinsBar />
        </div>
        <div>
          <PackCoins />
        </div>
        <PaymentBar />

        <div>
          <button className={style.buttonBorderGreen}>COMPRAR</button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Instructions />
        </div>
      </div>
    );
  }
}

export default Buy;
