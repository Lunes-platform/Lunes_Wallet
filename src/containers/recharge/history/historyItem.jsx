import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

import style from "./style.css";
import { Grid } from "@material-ui/core";

import { convertBiggestCoinUnit, formatDate } from "../../../utils/numbers";

class HistoryItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { item, skeleton } = this.props;
    let decimalPoint = skeleton.coins[item.coin.toLowerCase()].decimalPoint;
    let date =
      formatDate(item.date, "DMY", true) + " " + formatDate(item.date, "HM");

    return (
      <Grid container>
        <Grid item xs={12} className={style.row}>
          <div className={style.itemLeft}>
            <p className={style.description}>{`${item.describe} (${item.ddd}) ${item.phone}`}</p>
            <p className={style.defaultText}>{date}</p>
            <p className={style.statusConfirmed}>{item.status}</p>
          </div>
          <div className={style.itemRight}>
            <p className={style.icon}>
              <img
                src={`/images/icons/coins/${item.coin.toLowerCase()}.png`}
                alt={item.coin}
              />{" "}
              <span className={style.coinName}>{item.coin}</span>
            </p>
            
            <p className={style.coinValue}>
              {convertBiggestCoinUnit(item.amountCripto, decimalPoint).toFixed(
                decimalPoint
              )}
            </p>
            <p>R$ {parseFloat(item.amountFiat).toFixed(2)}</p>
          </div>
        </Grid>
        <div className={style.line} />
      </Grid>
    );
  }
}

HistoryItem.propTypes = {
  item: PropTypes.object,
  skeleton: PropTypes.object
};

const mapSateToProps = store => ({
  skeleton: store.skeleton
});

export default connect(mapSateToProps)(HistoryItem);
