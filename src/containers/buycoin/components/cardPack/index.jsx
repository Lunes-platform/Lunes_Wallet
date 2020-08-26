import React from "react";
import PropTypes from "prop-types";


// UTILS
import {convertBiggestCoinUnit} from "../../../../utils/numbers";
import i18n from "../../../../utils/i18n";

// STYLES
import style from "./style.css";

class CardPack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {buypack, onSelect, active, selectedCoin} = this.props;
    const styleactive = active ? style.cardBuyActive : style.cardBuy;
    //let defaultCoin = getDefaultFiat();
    let defaultCoin = "BRL";
    let fiatAmount = buypack.fiatAmount[defaultCoin.toUpperCase()];

    return (
      <div className={styleactive} onClick={()=>onSelect(buypack.id, buypack.coinAmount, fiatAmount)}>
        <img
          src={active ? `/images/icons/coins/${selectedCoin.abbreviation}.png` : `/images/icons/coins/whiteIcons/${selectedCoin.abbreviation}.png`}
          className={style.cardIcon}
        />
        <div className={style.hrCard} />
        <p className={style.paragraph}> {i18n.t("COINSALE_PACK_TEXT_PREFIX")} <b>{`${defaultCoin} ${parseFloat(fiatAmount).toFixed(2)}`}</b> {i18n.t("COINSALE_PACK_TEXT_SUFIX")} </p>
        <h1 className={style.amount}>{convertBiggestCoinUnit(buypack.coinAmount,8)}</h1>
        <div className={style.valueCard}>
          <span className={style.dollarSign}>R$</span>
          <span className={style.value}>{parseFloat(fiatAmount).toFixed(0)}</span>
          <span className={style.decimals}>,00</span>
        </div>
      </div>
    );
  }
}

CardPack.propTypes = {
  buypack: PropTypes.object.isRequired,
  selectedCoin: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default CardPack;
