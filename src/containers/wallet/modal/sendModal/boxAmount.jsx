import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletSendModalAmount,
  getWalletSendModalFee,
  setWalletSendModalLoading,
  setWalletSendModalDescribe
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

class BoxAmount extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      descripton: ""
    };
  }

  setAmount = amount => {
    let regex = new RegExp("^[0-9,.]+$");
    amount = amount.replace(",", ".");
    if (!amount || regex.test(amount.toString())) {
      this.setState({ ...this.state, amount });
    }
  };

  setDescrption = descripton => {
    this.setState({ ...this.state, descripton });
  };

  calcPercent = value => {
    let { coins, coin } = this.props;
    let coinBalance = coins[coin].balance.available;
    let calcPercent = ((coinBalance / 100) * value).toFixed(
      coins[coin].decimalPoint
    );
    this.setAmount(calcPercent.toString());
  };

  confirmAmount = () => {
    let { amount,descripton } = this.state;
    let {
      modal,
      coins,
      coin,
      errorInput,
      setWalletSendModalLoading,
      getWalletSendModalFee,
      setWalletSendModalAmount,
      setWalletSendModalDescribe
    } = this.props;
    let coinBalance = coins[coin].balance.available;

    if (coin !== "lunes" && coin !== "eth" && amount < 0.00020000) {
      return errorInput(i18n.t("MODAL_SEND_MIN_AMOUNT") + " Min: 0.00020000");
    }

    if (parseFloat(amount) <= coinBalance) {
      setWalletSendModalLoading();
      setWalletSendModalAmount(parseFloat(amount));
      setWalletSendModalDescribe(descripton);
      getWalletSendModalFee(
        coin,
        coins[coin].address,
        modal.address,
        parseFloat(amount),
        coins[coin].decimalPoint
      );
      return;
    }

    return errorInput(i18n.t("MESSAGE_INVALID_AMOUNT"));
  };

  render() {
    let { amount,descripton } = this.state;
    let { modal, coin } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/" + coin + ".png"}
          className={style.modalIconCoin}
        />
        <div>{i18n.t("MODAL_SEND_AMOUNT")}</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          placeholder="0"
          value={amount}
          onChange={event => this.setAmount(event.target.value)}
        />

        <div className={style.boxPercent}>
          <span onClick={() => this.calcPercent(25)}>25%</span>
          <span onClick={() => this.calcPercent(50)}>50%</span>
          <span onClick={() => this.calcPercent(75)}>75%</span>
          <span onClick={() => this.calcPercent(100)}>Max</span>
        </div>

        <div className={style.textHelp}>
          {i18n.t("MODAL_SEND_AMOUNT_INSTRUCTIONS")}
        </div>
        <label className={style.txtDescriptionLabel}>{i18n.t("MODAL_SEND_DESCRIPTION")}</label><br />
        <input
          className={style.txtDescription}
          type="text"
          name="inputDescription"
          value={descripton}
          onChange={event => this.setDescrption(event.target.value)}
        />

        <div className={style.paddingTop8}>
          <ButtonContinue
            action={() => this.confirmAmount()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  }
}

BoxAmount.propTypes = {
  modal: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
  getWalletSendModalFee: PropTypes.func.isRequired,
  setWalletSendModalAmount: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired,
  setWalletSendModalDescribe: PropTypes.func.isRequired,
};

const mapSateToProps = store => ({
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWalletSendModalFee,
      setWalletSendModalAmount,
      setWalletSendModalLoading,
      errorInput,
      setWalletSendModalDescribe
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAmount);
