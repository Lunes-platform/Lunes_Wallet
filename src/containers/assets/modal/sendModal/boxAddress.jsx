import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAssetModalStep
} from "../../redux/assetsAction";

import { errorInput } from "../../../errors/redux/errorAction";

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

  changeAddress = address => this.setState({ address });

  validateAddress = () => {    
    let {setAssetModalStep} = this.props;
    setAssetModalStep(1);
    return;
  };

  handleQrCodeReader = () => {
    let { address } = this.state;
    let { modal } = this.props;
    let { asset: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let token = assets[selectedCoin];
    console.log(token);
    return (
      <div>
        <div className={style.modalBox}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/modal-wallet/carteira.png"
              className={style.icon}
            />
            <div>
              {i18n.t("MODAL_SEND_ADDRESS")} {token.tokenName.toUpperCase()}
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
  asset: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  setAssetModalStep: PropTypes.func.isRequired,
  errorInput: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.asset.modal,
  asset: store.asset
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAssetModalStep,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAddress);
