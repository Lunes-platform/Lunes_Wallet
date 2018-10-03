import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadWalletInfo } from "../../skeleton/redux/skeletonAction";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import Loading from "../../../components/loading";

class DoneRecharge extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadWalletInfo, user } = this.props;
    loadWalletInfo(user.password);
  }

  render() {
    const {loading} = this.props;
    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      )
    } else {
      return (
        <div className={style.modalBox}>
          <img
            src="/images/icons/confirm/confirm.png"
            className={style.imageResult}
          />
          <div>
            {i18n.t("RECHARGE_SUCCESS_1")}
            {i18n.t("RECHARGE_SUCCESS_2")}
          </div>

          <div className={style.smallDescription}>
            {i18n.t("PAYMENT_TEXT_HISTORY")}
          </div>
        </div>
      );
    }
  }
}

DoneRecharge.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = store => ({
  loading: store.recharge.loading,
  user: store.user.user
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { loadWalletInfo },
  dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoneRecharge);
