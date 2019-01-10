import React from "react";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPaymentMethodsWhenBuying, setTabIcon } from "./redux/p2pAction";
import { getSignature } from "../../containers/settings/redux/settingsAction";

//MATERIAL
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

//COMPONENTS
import Offers from "./offers";
import TabIcons from "./components/tabicons";
import UserProfile from "./userProfile";
import ConfirmModal from "./modal/confirm";
import DepositConfirm from "./modal/depositConfirm";

//STYLE
import style from "./style.css";
import CreateOffer from "./createOffer";
import Chat from "./chat";

import i18n from "../../utils/i18n";

class P2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openP2P: true
    };
  }

  handleTabIcon = key => {
    const { setTabIcon } = this.props;
    setTabIcon(key);
  };

  handleP2P = () => {
    const { openP2P } = this.state;
    this.setState({
      ...this.state,
      openP2P: !openP2P
    });
  };

  renderArrow = () => {
    const { openP2P } = this.state;

    if (openP2P) {
      return (
        <KeyboardArrowDown
          className={style.arrowHeader}
          onClick={this.handleP2P}
        />
      );
    } else {
      return (
        <KeyboardArrowUp
          className={style.arrowHeader}
          onClick={this.handleP2P}
        />
      );
    }
  };

  renderContent = () => {
    const { tabIcon } = this.props.p2pStore;

    const contents = [
      <Offers key={1} type="general" />,
      <Offers key={2} type="myhistory" />,
      <UserProfile key={3} />,
      <CreateOffer key={4} />
    ];
    return contents[tabIcon];
  };

  renderModals = () => {
    const {
      openAvaliation,
      depositConfirmIsOpen,
      isDepositBuy,
      chatDetails
    } = this.props.p2pStore;
    const isOpen = chatDetails.open;
    const contentTabIcons = ["tag", "user-star", "user", "newoffer"];

    const depositText = isDepositBuy
      ? i18n.t("P2P_TEXT_14")
      : i18n.t("P2P_TEXT_13");

    if (depositConfirmIsOpen) return <DepositConfirm textValue={depositText} />;

    if (openAvaliation) return <ConfirmModal />;

    if (!isOpen) {
      return (
        <div style={{height: '100%'}}>
          <div className={style.baseContent}>{this.renderContent()}</div>
          <TabIcons content={contentTabIcons} handle={this.handleTabIcon} />
        </div>
      );
    }
    return (
      <div>
        <Chat />
      </div>
    );
  };
  componentDidMount = () => {
    const { getPaymentMethodsWhenBuying, getSignature } = this.props;
    getPaymentMethodsWhenBuying("lunes");
    getSignature();
  };

  render() {
    const { openP2P } = this.state;

    const showBox = openP2P ? style.baseWidget : style.baseWidgetClose;

    return (
      <div className={showBox + " p2pContainer jsShowBox"}>
        <div className={style.headerP2P}>{this.renderArrow()}</div>
        {this.renderModals()}
      </div>
    );
  }
}

P2P.propTypes = {
  p2pStore: PropTypes.object.isRequired,
  getPaymentMethodsWhenBuying: PropTypes.func,
  setTabIcon: PropTypes.func,
  getSignature: PropTypes.func,
  mySignature: PropTypes.object
};

const mapStateToProps = store => ({
  p2pStore: store.p2p,
  skeleton: store.skeleton,
  mySignature: store.settings.mySignature
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPaymentMethodsWhenBuying,
      setTabIcon,
      getSignature
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P2P);
