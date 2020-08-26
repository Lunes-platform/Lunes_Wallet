import React from "react";
import BoxQrReader from "./boxQrReader";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getValidateAddress } from "../../redux/assetsAction";

// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

class BoxAddress extends React.Component {
  constructor() {
    super();
    this.state = { address: "", isVisible: false };
  }

  changeAddress = address => this.setState({ address: address.replace(/\s/g,'') });

  showQrCodeReader = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  validateAddress = () => {
    let { address } = this.state;
    let { coin, getValidateAddress} = this.props;

    getValidateAddress(coin, address);

    return;
  };

  renderQrCodeReader = () => {
    let IosApp = false;

    if (
      navigator.userAgent.search("iPhone") !== -1 &&
      navigator.userAgent.search("Mobile") !== -1 &&
      navigator.userAgent.search("Safari") === -1
    ) {
      IosApp = true;
    }

    if (IosApp) return;

    return (
      <Hidden lgUp>
        <div className={style.boxQr} onClick={() => this.showQrCodeReader()}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/qrcode/qrcode.png"
              className={style.hoverShow}
            />
            <div>{i18n.t("MODAL_SEND_QR_CODE")}</div>
          </div>
          <div className={style.textHelp}>
            {i18n.t("MODAL_SEND_QR_CODE_INSTRUCTIONS")}
          </div>
        </div>
      </Hidden>
    );
  };

  handleQrCodeReader = () => {
    let { isVisible, address } = this.state;
    let { coin, modal } = this.props;

    if (isVisible) {
      return (
        <div className={style.boxQr}>
          <div className={style.qrCode}>
            <div style={{ width: "50vh" }}>
              <BoxQrReader coin={coin} />
            </div>
          </div>
          <ButtonContinue
            label={i18n.t("BTN_BACK")}
            action={() => this.showQrCodeReader()}
            loading={modal.loading}
          />
        </div>
      );
    }

    return (
      <div>
        {this.renderQrCodeReader()}
        <div className={style.modalBox}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/modal-wallet/carteira.png"
              className={style.icon}
            />
            <div>
              {i18n.t("MODAL_SEND_ADDRESS")} {coin.toUpperCase()}
            </div>
          </div>

          <input
            type="text"
            name="txtaddress"
            value={address}
            onChange={event => this.changeAddress(event.target.value)}
            placeholder={i18n.t("PLACEHOLDER_EX_ADDRESS")}
            className={style.inputClear}
          />
        </div>

        <ButtonContinue
          action={() => this.validateAddress()}
          loading={modal.loading}
        />
      </div>
    );
  };

  render() {
    return <div>{this.handleQrCodeReader()}</div>;
  }
}

BoxAddress.propTypes = {
  coin: PropTypes.string.isRequired,
  modal: PropTypes.object.isRequired,
  getValidateAddress: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.assets.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getValidateAddress
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAddress);
