import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setInviteModal,
  getInviteAddress,
  sendMailInvite,
  getInviteSent,
  sendWithdraw,
  clearState
} from "./redux/inviteAction";
import { successRequest, errorInput } from "../errors/redux/errorAction";

// MATERIAL UI
import { Grid, withStyles, Input } from "@material-ui/core";

// UTILS
import i18n from "../../utils/i18n";
import { inputValidator } from "../../utils/inputValidator";

//COMPONENTS
import ItemInvite from "./components/itemInvite";
import Modal from "../../components/modal";
import InviteSend from "./modal";
import Loading from "../../components/loading";

//STYLE
import style from "./style.css";
import colors from "../../components/bases/colors";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    marginTop:"15px",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      email: "",
      errors: []
    };
  }
  componentDidMount = () => {
    this.mounted = true;
    const { getInviteAddress, getInviteSent } = this.props;
    getInviteAddress();
    getInviteSent();

  };

  componentWillUnmount = () => {
    const { clearState } = this.props;
    this.state = {};
    clearState();
    this.mounted = false;
  };
  
  setEmail = email => {
    this.setState({ ...this.state, email });
  };

  handleEmail = () => {
    let { email } = this.state;
    let { sendMailInvite, address } = this.props;
    let error = [];

    if (email == "") {
      error.push(i18n.t("INVITE_ERROR_1"));
    }

    let input = {
      type: "email",
      name: "email",
      value: email,
      required: true
    };
    let { errors } = inputValidator({ inputs: input });
    if (errors.length > 0) {
      error.push(i18n.t("INVITE_ERROR_3"));
    }
    
    if(address.link == ""){
      error.push(i18n.t("INVITE_ERROR_2"));
    }
    if (error.length <= 0) {
      sendMailInvite(email);
    }

    this.setState({ ...this.state, errors: error });
  };

  handleWithdraw = () => {
    const { sendWithdraw, address, balance, errorInput } = this.props;
    if (!balance || balance.totalBalance <= 0) {
      errorInput(i18n.t("INVITE_NO_BALANCE"));
    } else {
      sendWithdraw(address);
    }
  };

  copyAddress = address => {
    let { successRequest } = this.props;
    const element = document.createElement("textarea");
    element.value = address;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
  };

  sendCoinAddressEmail = address => {
    const base_email = "email@..."; // mock
    return (window.location.href = "mailto:" + base_email + "?body=" + address);
  };

  handleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      ...this.state,
      modalOpen: !modalOpen
    });
  };

  returnStatus = obj => {
    const { sent, registered, transacted, redeemed } = obj;
    let statusList = "sent";

    if (sent != null) {
      statusList = "sent";
    }

    if (registered != null) {
      statusList = "registered";
    }

    if (transacted != null) {
      statusList = "transacted";
    }

    if (redeemed != null) {
      statusList = "redeemed";
    }

    return statusList.toUpperCase();
  };

  renderInvite = () => {
    const { invite, loadingList } = this.props;

    if (loadingList)
      return <Loading color="lunes" height="100px" width="24px" />;

    if (invite.invites.length <= 0) return;

    return (
      <div>
        {invite.invites &&
          invite.invites.map((email, key) => {
            const status = this.returnStatus(email);
            return (
              <ItemInvite
                key={key}
                email={email.receiptEmail}
                status={status}
              />
            );
          })}
      </div>
    );
  };

  renderErrors = () => {
    const { errors } = this.state;
    return errors.map((val, key) => {
      return (
        <span className={style.errorLabel} key={key}>
          {val}
        </span>
      );
    });
  };

  render() {
    const {
      classes,
      address,
      balance,
      loadingSent,
      loadingAddress,
      loadingWithdraw
    } = this.props;
    const { modalOpen } = this.state;

    const address_code = address.link;
    const address_copy = "https://luneswallet.app/create?=" + address_code;

    let { email } = this.state;

    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("INVITE_TITLE_INVITE")}</h1>
          <p>{i18n.t("INVITE_TEXT_1")}</p>
        </div>

        <Modal
          title="Convites enviados"
          content={<InviteSend />}
          show={modalOpen}
          close={this.handleModal}
        />

        <Grid container className={style.card}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={8}>
              <Grid item>
                <div className={style.iconContent}>
                <img
                  src="/images/icons/email/email@1x.png"
                  className={style.icon}
                />
                </div>
                
              </Grid>
              <Grid item>                
                <div className={style.inviteInput}>                  
                  <Input
                    placeholder="Lunes@gmail.com"
                    classes={{
                      root: classes.root,
                      underline: classes.cssUnderline,
                      input: classes.cssInput
                    }}
                    onChange={event => this.setEmail(event.target.value)}
                    value={email}
                  />
                  {this.renderErrors()}                  
                </div>
              </Grid>
            </Grid>
            <div className={style.linkTitle}>
              {i18n.t("INVITE_LINK_SHARE")}
            </div>
            <div className={style.adressShared}>                    
              {loadingAddress ? <Loading color="lunes" /> : address_copy}
            </div>

            {!loadingAddress ? (
              <div className={style.sharedBox}>
                <div className={style.copyIcon}>
                  <a onClick={() => this.copyAddress(address_copy)}>
                    <img src="/images/icons/modal-receive/ic_copy@1x.png" />
                  </a>
                </div>
                <div
                  onClick={() => this.sendCoinAddressEmail(address_copy)}
                  className={style.shareIcon}
                >
                  <img src="/images/icons/invite/share@1x.png" />
                </div>
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={style.boxButtons}>
              {loadingSent}
              <button
                className={style.btnInviteSent}
                onClick={() => this.handleEmail()}
              >
                {loadingSent ? (
                  <Loading color="lunes" />
                ) : (
                    i18n.t("INVITE_BUTTON_SEND")
                  )}
              </button>

              <div className={style.accumulatedBalance}>
                <span>{i18n.t("INVITE_ACCUMULATED_BALANCE")} </span>
                <p className={style.accumulatedLunes}>
                  {balance && balance.totalBalance} Lunes
                </p>
              </div>

              <button
                className={style.btnInviteSent}
                onClick={() => this.handleWithdraw()}
              >
                {loadingWithdraw ? (
                  <Loading color="lunes" />
                ) : (
                    i18n.t("INVITE_TEXT_BUTTON")
                  )}
              </button>
            </div>
          </Grid>
        </Grid>

        <Grid container className={style.card}>
          <Grid item xs={12}>
            <span className={style.label}>
              {i18n.t("INVITE_CONFIRMED_INVITATIONS")}
            </span>
          </Grid>
          <Grid item xs={12} className={style.cardInviteConfirmation}>
            {this.renderInvite()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Invite.propTypes = {
  classes: PropTypes.object.isRequired,
  invite: PropTypes.object,
  getInviteAddress: PropTypes.func,
  address: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  balance: PropTypes.object,
  getInviteSent: PropTypes.func,
  sendMailInvite: PropTypes.func,
  successRequest: PropTypes.func,
  errorInput: PropTypes.func,
  loadingList: PropTypes.bool,
  loadingSent: PropTypes.bool,
  loadingAddress: PropTypes.bool,
  sendWithdraw: PropTypes.func,
  loadingWithdraw: PropTypes.bool,
  clearState: PropTypes.func
};

const mapStateToProps = store => ({
  invite: store.invite,
  address: store.invite.address,
  balance: store.invite.balance,
  loadingList: store.invite.loadingInvites,
  loadingSent: store.invite.loadingSent,
  loadingAddress: store.invite.loadingAddress,
  loadingWithdraw: store.invite.loadingWithdraw
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setInviteModal,
      getInviteAddress,
      sendMailInvite,
      getInviteSent,
      successRequest,
      sendWithdraw,
      errorInput,
      clearState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(inputStyle)(Invite));
