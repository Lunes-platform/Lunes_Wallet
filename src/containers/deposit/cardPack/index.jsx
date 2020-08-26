import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class CardPack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pack, onSelect, selected, active } = this.props;
    const styleCard = selected ? style.cardActive : style.card;
    console.log("Aqui -- "+ active);
    return (
      <div
        className={styleCard}
         onClick={active === "active" ? () => onSelect(pack.id, pack.value) : () => onSelect(0,0)}
      >
        <img
          src={selected ? "/images/icons/coins/lbrl.png" : "/images/icons/coins/whiteIcons/lbrl.png" }
          alt={"lbrl"}
          className={style.cardIcon}
        />
        <p className={style.paragraph}>{i18n.t("DEPOSIT_PACK_TEXT")}</p>
        <div className={style.valueCard}>
          <span className={style.dollarSign}>R$</span>
          <span className={style.value}>{pack.value}</span>
          <span className={style.decimals}>,00</span>
        </div>
      </div>
    );
  }
}

CardPack.propTypes = {
  pack: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  active: PropTypes.string
};

export default CardPack;
