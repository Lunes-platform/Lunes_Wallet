import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeChat,setUserProfile } from "../../redux/p2pAction";

// UTILS
import { formatDate } from "../../../../utils/numbers";
import { getDefaultFiat } from "../../../../utils/localStorage";
import { encryptMd5 } from "../../../../utils/cryptography";

// MATERIAL UI
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import { ArrowForward } from "@material-ui/icons/";
import { ArrowBack } from "@material-ui/icons/";
import { KeyboardArrowDown } from "@material-ui/icons";

// COMPONENTS
import StarVotes from "../starVotes";
import HeaderDetails from "../headerDetails/index";

// STYLE
import style from "./style.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeaderDetails: true,
      arrowDown: false
    };
  }
  onClickPerfil() {
    const { order, setUserProfile } = this.props;
    setUserProfile(order.sell.user);
    console.log("teste");
    console.log(order);
  }
  closeChat = () => {
    const { closeChat } = this.props;
    closeChat();
  };

  showHeaderDetails = () => {
    this.setState({
      showHeaderDetails: !this.state.showHeaderDetails,
      arrowDown: !this.state.arrowDown
    });
  };

  rederPictureGravatar(email){
    const defaultImg = "https://luneswallet.app/images/icons/p2p/lunio-user300x300.jpg";
    return "https://s.gravatar.com/avatar/"+encryptMd5(email.toLowerCase())+"?s=300"+"&d="+defaultImg;
  }

  render() {
    const { order } = this.props;
    const dateCreate = formatDate(order.createdAt, "DM");

    let defaultFiat = getDefaultFiat();
    const unitValue = order.unitValue[defaultFiat.toLowerCase()];
    const total =  unitValue * order.sell.amount;

    return (
      <div className={style.topBar}>
        <div className={style.header}>
          <Grid container>
            <Grid item xs={1}>
              <ArrowBack className={style.arrowBack} onClick={this.closeChat} />
            </Grid>
            <Grid item xs={2} sm={2}>
              <Avatar
                alt="Avatar"
                className={style.avatar}
                src={this.rederPictureGravatar(order.sell.user.email)}
              />
            </Grid>
            <Grid item xl={5}>
              <span
                className={style.textGreen}
                onClick={() => this.onClickPerfil()}
              >
                {order.sell.user.name} {order.sell.user.surname}
              </span>
              <span className={style.textSmall}>{dateCreate}</span>
            </Grid>
            <Grid item xl={4} style={{ paddingLeft: 10 }}>
              <div className={style.boxStar}>
                <StarVotes votes={order.sell.user.rating} />
              </div>
            </Grid>
            </Grid>

            <Grid container>

            <Grid item xs={3} />
            <Grid item xs={4}>
              <div className={style.card}>{order.sell.amount}</div>
            </Grid>
            <Grid item xs={1}>
              <ArrowForward className={style.arrowPrice} />
            </Grid>
            <Grid item xs={4}>
              <div className={style.card}>{defaultFiat} {total.toFixed(2)}</div>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              {this.state.arrowDown && (
                <KeyboardArrowDown
                  onClick={this.showHeaderDetails}
                  className={style.arrowDown}
                />
              )}
            </Grid>
          </Grid>
          {this.state.showHeaderDetails && (
            <HeaderDetails
              showHeaderDetails={this.showHeaderDetails}
              order={order}
            />
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  closeChat: PropTypes.func.isRequired,
  order: PropTypes.object,
  setUserProfile: PropTypes.func
};

const mapStateToProps = store => ({
  order: store.p2p.chat.iduser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeChat,setUserProfile }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
