import React from "react";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPaymentMethodsWhenBuying, setTabIcon } from "./redux/p2pAction";

//MATERIAL
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

//COMPONENTS
import Offers from "./offers";
import TabIcons from "./components/tabIcons";
import UserProfile from "./userProfile";
import ConfirmModal from "./modal/confirm";
import SellConfirmModal from "./modal/sellConfirm";

//STYLE
import style from "./style.css";
import CreateOffer from "./createOffer";
import Chat from "./chat";

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

  componentDidMount = () => {
    const { getPaymentMethodsWhenBuying } = this.props;
    getPaymentMethodsWhenBuying("lunes");
  };

  render() {
    const contentTabIcons = ["tag", "user-star","user", "newoffer" ];
    const { chatOpened, openAvaliation } = this.props.p2pStore;
    const { openP2P } = this.state;

    const showBox = openP2P ? style.baseWidget : style.baseWidgetClose;

    return (
      <div className={showBox}>
        {/* <Hidden smDown>

        </Hidden> */}
        <div className={style.headerP2P}>{this.renderArrow()}</div>

        {chatOpened == false ? (
          <div>
            <div className={style.baseContent}>{this.renderContent()}</div>
            <TabIcons content={contentTabIcons} handle={this.handleTabIcon} />
          </div>
        ) : openAvaliation == true ? (
          <ConfirmModal />
        ) : (
          <div>
            <Chat />
          </div>
        )}
      </div>
    );
  }
}

P2P.propTypes = {
  p2pStore: PropTypes.object.isRequired,
  getPaymentMethodsWhenBuying: PropTypes.func,
  setTabIcon: PropTypes.func
};

const mapStateToProps = store => ({
  p2pStore: store.p2p,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPaymentMethodsWhenBuying,
      setTabIcon
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P2P);
