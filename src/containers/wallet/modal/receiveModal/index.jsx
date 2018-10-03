import QrCode from "qrcode.react";
import PropTypes from "prop-types";

// REDUX
import { bindActionCreators } from "redux";
import React from "react"; import { connect } from "react-redux";
import { successRequest } from "../../../errors/redux/errorAction";
import { shareCoinAddress } from "../../redux/walletAction"

// STYLE
import style from "../../style.css";

// UTILS
import i18n from "../../../../utils/i18n";

// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";

class Receive extends React.Component {

    copyCoinAddress = () => {
        let { coin, successRequest } = this.props;
        const element = document.createElement("textarea");
        element.value = coin.address;
        document.body.appendChild(element);
        element.select();
        document.execCommand("copy");
        document.body.removeChild(element);
        successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
    }

    sendCoinAddressEmail = (coinName, address) => {
        return window.location.href = "mailto:" + "?body=" + coinName + ":" + address;
    }

    hasAddress = () => {
        let { coin, shareCoinAddress } = this.props;
        let coinAddress = coin.address;
        let coinName = coin.name;
        return coinAddress ?
            <div>
              <div className={style.qrCodeReceive}>
                <QrCode
                  className={style.bgQrCode}
                  value={coinAddress}
                  size={176}
                  bgColor={"#fff"}
                  fgColor={"#000"}
                  level={"L"}
                  renderAs="svg"
                />
              </div>
              <p className={style.address}>{coinAddress}</p>

              <div className={style.spacingBox}>
                <div className={style.alignButtons}>
                  <div
                    className={style.buttonReceive}
                    onClick={() => this.copyCoinAddress()}>
                    <img src="/images/icons/modal-receive/ic_copy@1x.png" />
                    <p>
                      <span className={style.spanCopy}>{i18n.t("BTN_RECEIVE_COPY")}</span>
                    </p>
                  </div>

                  <div className={style.buttonReceive} onClick={() => this.sendCoinAddressEmail(coinName, coinAddress)}>
                    <img src="/images/icons/modal-receive/ic_email@1x.png" />
                    <p>
                      <span className={style.spanEmail}>{i18n.t("BTN_RECEIVE_EMAIL")}</span>
                    </p>
                  </div>
                  <Hidden smUp>
                    <div
                      className={style.buttonReceive}
                      onClick={() => shareCoinAddress(coinName, coinAddress)}>
                      <img src="/images/icons/modal-receive/ic_shared@1x.png" />
                      <p>
                        <span className={style.spanShared}>{i18n.t("BTN_RECEIVE_SHARE")}</span>
                      </p>
                    </div>
                  </Hidden>
                </div>

              </div>
            </div> : ""
    };

    render() {
        return (
            <div className={style.boxReceive}>
              {this.hasAddress()}
            </div>
        );
    }
}

Receive.propTypes = {
    email: PropTypes.string,
    coin: PropTypes.object,
    shareCoinAddress: PropTypes.func,
    successRequest: PropTypes.func
};

const mapStateToProps = store => ({
    email: store.user.user.email
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ successRequest, shareCoinAddress }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Receive);
