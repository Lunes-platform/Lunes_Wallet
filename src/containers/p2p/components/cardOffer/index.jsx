import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  openChat,
  setCancelOrder,
  openAvaliation
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
import ConfirmModal from "../../modal/confirm";

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

  handleClick = () => {
    const { order } = this.props;
    if (this.props.type == undefined && order.status == "confirmed") {
      this.openAvaliation();
    } else {
      this.handleDetails();
    }
  };

  openChat = order => {
    const { openChat } = this.props;
    openChat(order);
  };

  openAvaliation = () => {
    const { openAvaliation, openChat } = this.props;
    openAvaliation();
    openChat();
  };

  handleCancelOrder = e => {
    e.stopPropagation();
    const { setCancelOrder, order } = this.props;
    setCancelOrder(order.id);
  };

  renderBtClose = () => {
    const { order, userEmail } = this.props;
    if (userEmail == order.sell.user.email && order.status != "confirmed") {
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

  rederPictureGravatar(email) {
    const defaultImg = "https://luneswallet.app/images/icons/p2p/lunio-user300x300.jpg";
    return "https://s.gravatar.com/avatar/" + encryptMd5(email.toLowerCase()) + "?s=300" + "&d=" + defaultImg;
  }

  render() {
    const { order, userEmail, type } = this.props;
    const { openDetails } = this.state;
    const dateCreate = formatDate(order.createdAt, "DM");
    const hourCreate = formatDate(order.createdAt, "HM");

    let defaultFiat = getDefaultFiat();
    const unitValue = order.unitValue[defaultFiat.toLowerCase()];
    const total = unitValue * order.sell.amount;

    return (
      <div className={style.baseUser} onClick={this.handleClick}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              alt="avatar"
              src={this.rederPictureGravatar(order.sell.user.email)}
              className={style.avatar}
            />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name}>
              {order.sell.user.name} {order.sell.user.surname}
            </span>
            <span className={style.textSmall}>{dateCreate}</span>
            <span className={style.numberText}>{order.sell.amount}</span>
            <span className={style.textSmall}>{i18n.t("P2P_OFFER")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.sell.coin}.png`} />
              {order.sell.coin.toUpperCase()}
            </div>
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: 10 }}>
            <div className={style.boxStar}>
              <StarVotes votes={order.sell.user.rating} />
              {userEmail == order.sell.user.email &&
                order.status != "confirmed" ? (
                  order.status != "canceled" ? (
                    <button
                      className={style.btnClose}
                      onClick={this.handleCancelOrder}
                    >
                      <img
                        className={style.btnCloseImg}
                        src="images/icons/p2p/btn-CloseP2p.png"
                        alt="closep2p"
                      />
                    </button>
                  ) :
                    <img
                      className={style.closeImg}
                      src="images/icons/p2p/btn-CloseP2p.png"
                      alt="closep2p"
                    />
                ) : null}
            </div>
            <span className={style.textSmall}>
              {i18n.t("P2P_VALUE_UNITY")} {defaultFiat}{" "}
              {parseFloat(unitValue).toFixed(2)}
            </span>
            <ArrowForward className={style.arrowPrice} />
            <span className={style.numberText}>
              {defaultFiat} {parseFloat(total).toFixed(2)}
            </span>
            <span className={style.textSmall}>{i18n.t("P2P_SELLS")}</span>
            <div className={style.offerText}>
              <img src={`images/icons/coins/${order.buy.coin}.png`} />
              {order.buy.coin.toUpperCase()}
            </div>
            <span className={style.hours}>{hourCreate}</span>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={10}
            className={style.boxDetails}
            style={openDetails ? { display: "block" } : null}
          >
            <div className={style.textDetails}>{order.description}</div>
            {userEmail != order.sell.user.email && type != "myhistory" ? (
              <button
                className={style.btContinue}
                onClick={() => this.openChat(order)}
              >
                {i18n.t("P2P_BUTTON_NEGOTIATE")}
              </button>
            ) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CardOffer.propTypes = {
  openChat: PropTypes.func.isRequired,
  order: PropTypes.object,
  setCancelOrder: PropTypes.func,
  userEmail: PropTypes.string,
  type: PropTypes.string
};

const mapStateToProps = store => ({
  userEmail: store.user.user.email,
  p2pStore: store.p2p
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openChat, setCancelOrder, openAvaliation }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardOffer);
