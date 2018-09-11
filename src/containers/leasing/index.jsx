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
    let { getLeasingInfo, coins, setLeasingLoading } = this.props;
    setLeasingLoading(true);
    getLeasingInfo(coins.lunes.abbreviation, coins.lunes.address, coins.lunes.decimalPoint);
  }

  handleModalLeasing = () => this.setState({ isOpen: !this.state.isOpen });

  renderContent = () => {
    let { isOpen } = this.state;
    let { isLoading } = this.props;
    return isLoading ? (
      <div>
        <Loading color="wallet" height="80vh" width="100px" />
      </div>
    ) :
      (
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
  }
  render() {
    return this.renderContent();
  }
}

Leasing.propTypes = {
  isLoading: PropTypes.bool,
  getLeasingInfo: PropTypes.func,
  setLeasingLoading: PropTypes.func,
  coins: PropTypes.array.isRequired,
}

const mapStateToProps = store => ({
  balance: store.skeleton.coins.lunes.balance.available,
  isLoading: store.leasing.isLoading,
  coins: store.skeleton.coins,
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
