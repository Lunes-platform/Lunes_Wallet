import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/rechargeAction";
import { updateUserConsents } from "../../user/redux/userAction";
import { errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

// COMPONENTS
import CustomSwitch from "../../../components/customSwitch";
import ButtonContinue from "../../../components/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";

class DetailsRecharge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      errorMsg: "",
      user: props.user
    };

    this.renderNumber = this.renderNumber.bind(this);
  }

  validateForm = () => {
    const { setModalStep, errorInput, clearMessage } = this.props;
    const { user } = this.state;

    if (user.terms === "unread") {
      errorInput(i18n.t("PAYMENT_TERMS_ERROR"));
      return;
    }

    setModalStep(2);
    clearMessage();
  };

  toogleSwitch = () => {
    const { user } = this.state;
    const { updateUserConsents } = this.props;
    const newStatus = user.terms === "read" ? "unread" : "read";

    this.setState({
      ...this.state,
      user: {
        ...user,
        terms: newStatus
      }
    });

    updateUserConsents({ terms: newStatus });
  };

  renderNumber() {
    const { recharge } = this.props;

    const ddd = recharge.number.substring(0, 2);
    const totalnumero = recharge.number.length;
    const numero = recharge.number.substring(2, totalnumero);

    return `(${ddd}) ${numero}`;
  }

  render() {
    const { loading, recharge } = this.props;
    const { user, error, errorMsg } = this.state;

    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <div>
            {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
          </div>
          {i18n.t("RECHARGE_DETAILS_1")}
          <div className={style.strongText} style={{ marginTop: 20 }}>
            <span className={style.textGreen}>
              {recharge.amount} {recharge.coin.abbreviation.toUpperCase()}
            </span>
            {i18n.t("RECHARGE_DETAILS_2")}
            <span className={style.textGreen}>R$ {recharge.value}</span>

            {i18n.t("RECHARGE_DETAILS_3")}
          </div>

          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              marginTop: 30,
              marginBottom: 30
            }}
          >
            {this.renderNumber()}
          </div>

          <CustomSwitch
            title={i18n.t("PAYMENT_TERMS_TITLE")}
            description={i18n.t("PAYMENT_TERMS_DESC")}
            action={this.toogleSwitch}
            checked={user.terms === "read"}
            value="termsSwitch"
          />

          <ButtonContinue
            label={i18n.t("BTN_CONFIRM")}
            action={() => this.validateForm()}
            loading={loading}
          />
        </div>
      );
    }
  }
}

DetailsRecharge.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  setModalStep: PropTypes.func,
  recharge: PropTypes.object.isRequired,
  updateUserConsents: PropTypes.func.isRequired,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapStateToProps = store => ({
  loading: store.recharge.loading,
  user: store.user.user,
  recharge: store.recharge.recharge
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      updateUserConsents,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsRecharge);
