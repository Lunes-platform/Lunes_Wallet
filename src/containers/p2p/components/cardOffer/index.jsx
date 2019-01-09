import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  prepareOrOpenChat,
  setCancelOrder,
  openAvaliation,
  handleConfirmSell,
  setUserProfile,
  openDeposit,
  getProfile
} from "../../redux/p2pAction";

// UTILS
import { formatDate } from "../../../../utils/numbers";
import i18n from "./../../../../utils/i18n";
import { getDefaultFiat } from "../../../../utils/localStorage";
import { encryptMd5 } from "../../../../utils/cryptography";

// MATERIAL
import { Grid, Avatar } from "@material-ui/core/";
import { ArrowForward } from "@material-ui/icons/";

// COMPONENTS
import StarVotes from "../starvotes";

// STYLE
import style from "./style.css";

class CardOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false
    };
  }

  handleDetails = () => {
    this.setState({
      ...this.state,
      openDetails: !this.state.openDetails
    });
  };

  prepareOrOpenChat = order => {
    this.props.prepareOrOpenChat(order);
  };

  toggleCardDetails = bool =>
    this.setState({
      openDetails: bool === undefined ? !this.state.openDetails : bool
    });

  handleClick = () => {
    const { order } = this.props;
    if (order.status != "confirmed") {
      this.handleDetails();
    }
  };

  openUserProfile = e => {
    e.stopPropagation();
    const { user } = this.props.order.sell;
    const { setUserProfile, getProfile } = this.props;

    getProfile(user.id);
    setUserProfile(user);
  };

  handleCancelOrder = e => {
    e.stopPropagation();
    const { setCancelOrder, order } = this.props;
    setCancelOrder(order.id);
  };

  renderBtClose = () => {
    const { order, userEmail } = this.props;
    if (
      userEmail == order.sell.user.email &&
      order.status != "confirmed" &&
      order.status != "confirming"
    ) {
      return (
        <button className={style.btnClose}>
          <img
            className={style.btnCloseImg}
            src="images/icons/p2p/btn-CloseP2p.png"
            alt="closep2p"
          />
        </button>
      );
    }
  };

  showSellConfirm = (order, isDepositBuy) => {
    const { openDeposit, handleConfirmSell } = this.props;
    openDeposit(order);
    handleConfirmSell(true, isDepositBuy);
  };

  renderNegociateButton = user => {
    const { order, userEmail } = this.props;
    const way = order.way;
    const isSameEmail = userEmail === user.email;
    const isCancelOrComplet =
      order.status === "canceled" || order.status === "confirmed";

    if (!isCancelOrComplet && way === "buy") {
      return order.sell.confirmation ? (
        <button
          className={style.btContinue}
          onClick={() => this.showSellConfirm(order, true)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      ) : (
        <button
          className={style.btContinue}
          onClick={() => this.prepareOrOpenChat(order)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      );
    }

    if (!isCancelOrComplet && way === "sell" && !isSameEmail) {
      return (
        <button
          className={style.btContinue}
          onClick={() => this.showSellConfirm(order, false)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      );
    } else if (!isCancelOrComplet && !isSameEmail) {
      return (
        <button
          className={style.btContinue}
          onClick={() => this.prepareOrOpenChat(order)}
        >
          {i18n.t("P2P_BUTTON_NEGOTIATE")}
        </button>
      );
    }
  };

  rederPictureGravatar(email) {
    const validEmail = email ? email.toLowerCase() : email;
    const defaultImg =
      "https://luneswallet.app/images/icons/p2p/lunio-user300x300.jpg";
    return (
      "https://s.gravatar.com/avatar/" +
      encryptMd5(validEmail) +
      "?s=300" +
      "&d=" +
      defaultImg
    );
  }

  validateTypeUser = typeWay => {
    const { order } = this.props;
    if (!order || (order && !order.buy) || (order && !order.sell)) return;

    const user = typeWay === "sell" && order.status !== 'canceled' ? order.buy.user : order.sell.user;

    return user;
  };

  renderRatingButton = () => {
    let { order, userEmail, status, openAvaliation } = this.props;

    if (status !== "confirmed") return;

    let isSeller = userEmail == order.sell.user.email;
    let sellerRating = order.sell.rating; //seller rated the buyer these values <
    let buyerRating = order.buy.rating; //buyer rated the seller these values <

    if (isSeller && order.status === "confirmed") {
      if (!sellerRating) {
        return (
          <button
            className={style.btRating}
            onClick={() => openAvaliation(order)}
          >
            {i18n.t("P2P_BUTTON_RATE_BUYER")}
          </button>
        );
      } else {
        return <StarVotes votes={sellerRating} />;
      }
    } else if (!isSeller && order.status === "confirmed") {
      if (!buyerRating) {
        return (
          <button
            className={style.btRating}
            onClick={() => openAvaliation(order)}
          >
            {i18n.t("P2P_BUTTON_RATE_SELLER")}
          </button>
        );
      } else {
        return <StarVotes votes={buyerRating} />;
      }
    }
  };

  render() {
    const { order, userEmail, mySignature } = this.props;
    const { openDetails } = this.state;
    const user = this.validateTypeUser(order.way);
    const orderBuy = order.buy;
    const orderSell = order.sell;

    const hourCreate = formatDate(order.createdAt, "HM");
    const dateCreate = formatDate(order.createdAt, "DMI").toUpperCase();

    const defaultFiat = getDefaultFiat();
    const unitValue = order.unitValue[defaultFiat.toLowerCase()];
    const total = unitValue * orderSell.amount;

    return (
      <div className={style.baseUser} onClick={this.handleClick}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              alt="avatar"
              src={this.rederPictureGravatar(user.email)}
              className={style.avatar}
              onClick={this.openUserProfile}
            />
          </Grid>

          <Grid item xs={5}>
            {console.warn('cardOffer>>>', {user})}
            <span className={style.name} onClick={this.openUserProfile}>
              {user.name} {user.surname}
            </span>
            <span className={style.dateCreate}>{dateCreate}</span>
            <span className={style.hourCreate}>{hourCreate}</span>
            <span className={style.numberText}>{orderSell.amount}</span>
            <span className={style.textSmall}>{i18n.t("P2P_OFFER")}</span>

            <div className={style.offerText}>
              <img src={`images/icons/coins/${orderSell.coin}.png`} />
              {orderSell.coin.toUpperCase()}
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className={style.boxStar}>
              {this.renderRatingButton()}

              {userEmail === user.email &&
              order.status != "confirmed" &&
              order.status !== "canceled" ? (
                <button
                  className={style.btnClose}
                  onClick={this.handleCancelOrder}
                >
                  <img
                    className={style.cancelOffer}
                    src="images/icons/close/close.png"
                  />
                </button>
              ) : null}
            </div>

            <span className={style.defaultFiat}>
              {i18n.t("P2P_VALUE_UNITY")} {defaultFiat}{" "}
            </span>

            <span className={style.unit}>
              {parseFloat(unitValue).toFixed(2)}
            </span>

            <ArrowForward className={style.arrowPrice} />

            <span className={style.numberText}>
              {defaultFiat} {parseFloat(total).toFixed(2)}
            </span>
            <span className={style.textSmall}>{i18n.t("P2P_SELLS")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${orderBuy.coin}.png`} />
              {orderBuy.coin.toUpperCase()}
            </div>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={10}
            className={style.boxDetails}
            style={openDetails ? { display: "block" } : null}
          >
            <div className={style.textDetails}>{order.description}</div>
            {mySignature && this.renderNegociateButton(user)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CardOffer.propTypes = {
  prepareOrOpenChat: PropTypes.func.isRequired,
  order: PropTypes.object,

  setCancelOrder: PropTypes.func,
  userEmail: PropTypes.string,

  type: PropTypes.string,
  setUserProfile: PropTypes.func,

  openAvaliation: PropTypes.func,
  p2pStore: PropTypes.object,
  handleConfirmSell: PropTypes.func,

  getProfile: PropTypes.func,
  openDeposit: PropTypes.func,

  mySignature: PropTypes.object,
  openChat: PropTypes.func,
  status: PropTypes.string
};

const mapStateToProps = store => ({
  userEmail: store.user.user.email,
  p2pStore: store.p2p,
  mySignature: store.settings.mySignature
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCancelOrder,
      openAvaliation,
      setUserProfile,
      openDeposit,
      handleConfirmSell,
      getProfile,
      prepareOrOpenChat
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardOffer);
