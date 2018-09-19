import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { setLeasingLoading, getLeasingInfo } from "./redux/leasingAction";

// COMPONENTS
import Loading from "../../components/loading";
import Modal from "../../components/modal";
import LeasingHistory from "./leasingHistory";
import StartLeasing from "./modal/startLeasing";

// UTILS
import i18n from "../../utils/i18n";
class Leasing extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    let { getLeasingInfo, coins, setLeasingLoading, user } = this.props;
    setLeasingLoading(true);
    setTimeout(() => {
      getLeasingInfo(
        coins.lunes.abbreviation,
        coins.lunes.address,
        coins.lunes.decimalPoint,
        user.password
      );
    }, 4000);
  }

  handleModalLeasing = () => {
    let { isOpen } = this.state;
    let {
      getLeasingInfo,
      coins,
      setLeasingLoading,
      leasing,
      user
    } = this.props;

    if (isOpen && leasing.reload) {
      setLeasingLoading(true);
      setTimeout(() => {
        getLeasingInfo(
          coins.lunes.abbreviation,
          coins.lunes.address,
          coins.lunes.decimalPoint,
          user.password
        );
      }, 4000);
    }

    this.setState({ isOpen: !this.state.isOpen });
  };

  renderContent = () => {
    let { isOpen } = this.state;
    let { leasing } = this.props;

    return leasing.isLoading ? (
      <div>
        <Loading color="wallet" height="80vh" width="100px" />
      </div>
    ) : (
      <div>
        <div>
          <LeasingHistory openModal={this.handleModalLeasing} />
        </div>
        <Modal
          title={i18n.t("MODAL_TITLE_START_LEASING")}
          content={<StartLeasing close={() => this.handleModalLeasing()} />}
          show={isOpen}
          close={() => this.handleModalLeasing()}
        />
      </div>
    );
  };
  render() {
    return this.renderContent();
  }
}

Leasing.propTypes = {
  leasing: PropTypes.object,
  getLeasingInfo: PropTypes.func,
  setLeasingLoading: PropTypes.func,
  coins: PropTypes.array.isRequired,
  user: PropTypes.object
};

const mapStateToProps = store => ({
  balance: store.skeleton.coins.lunes.balance.available,
  leasing: store.leasing,
  coins: store.skeleton.coins,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLeasingLoading,
      getLeasingInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leasing);
