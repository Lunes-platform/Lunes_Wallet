import React from "react";
import PropTypes from "prop-types";

import QrCode from "qrcode.react";

// UTILS
import i18n from "../../../../utils/i18n";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  acceptOfferWhenBuying,
  closeChat,
  closeDeposit,
  handleConfirmSell
} from "../../redux/p2pAction";
import { successRequest } from "../../../errors/redux/errorAction";

import style from "./style.css";

class DepositModal extends React.Component {
  cleanChat = () => {
    const { closeChat, closeDeposit, handleConfirmSell } = this.props;
    closeChat();
    closeDeposit();
    handleConfirmSell(false);
  };

  copyCoinAddress = () => {
    let { order, successRequest } = this.props;
    const element = document.createElement("textarea");
    element.value = order.sell.address;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
  };

  render() {
    const { order } = this.props;
    return (
      <div className={style.depositContainer}>
        <div className={style.textDeposit}>{i18n.t("P2P_TEXT_4")}</div>
        <QrCode
          className={style.imgQrCodeDeposit}
          value={order.sell.address}
          size={176}
          bgColor={"#fff"}
          fgColor={"#000"}
          level={"L"}
          renderAs="svg"
        />
        <div className={style.inputCopyBtnDeposit}>
          <input className={style.inputDeposit} value={order.sell.address} readOnly/>
          <button
            className={style.copyCodeDeposit}
            onClick={() => this.copyCoinAddress()}
          >
            {i18n.t("P2P_TEXT_5")}
          </button>
          <button className={style.btnDeposit} onClick={this.cleanChat}>
            {i18n.t("P2P_TEXT_6")}
          </button>
        </div>
      </div>
    );
  }
}

DepositModal.propTypes = {
  closeChat: PropTypes.func,
  closeDeposit: PropTypes.func,
  order: PropTypes.object,
  successRequest: PropTypes.func,
  handleConfirmSell: PropTypes.func
};

const mapStateToProps = store => ({
  order: store.p2p.chatDetails.currentOrder
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      acceptOfferWhenBuying,
      closeChat,
      closeDeposit,
      handleConfirmSell,
      successRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositModal);
