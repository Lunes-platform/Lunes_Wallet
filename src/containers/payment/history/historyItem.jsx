import React from "react";
import PropTypes from "prop-types";

import style from "./style.css";
import { Grid } from "@material-ui/core";

class HistoryItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {item} = this.props;

    return (
      <Grid container>
        <Grid item xs={12} className={style.row}>
          <div className={style.itemLeft}>
            <p className={style.description}>{item.name}</p>
            <p className={style.defaultText}>{item.date}</p>
            <p className={style.statusConfirmed}>{item.status}</p>
          </div>
          <div className={style.itemRight}>
            <p className={style.icon}><img src={`/images/icons/coins/${item.coin}.png`} alt={item.coin}/> {item.coin}</p>
            <p className={style.coinValue}>{item.amount}</p>
            <p>R$ {item.value}</p>
          </div>
        </Grid>
        <div className={style.line}></div>
      </Grid>
    );
  }
}

HistoryItem.propTypes = {
  item: PropTypes.object
}

export default HistoryItem;
