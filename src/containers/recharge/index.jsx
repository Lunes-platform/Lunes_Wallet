import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep,getCoinsEnabled } from "./redux/rechargeAction";

// UTILS
import i18n from "../../utils/i18n";

// COMPONENTS
import Modal from "../../components/modal";
import RechargeModal from "./modal/rechargeModal";
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";

// STYLE
import style from "./style.css";

class Recharge extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  closeModal(){
    const {setModalStep, getCoinsEnabled} = this.props;
    this.handleModal();
    setModalStep(1);
    getCoinsEnabled();
  }

  render() {
    let { isOpen } = this.state;

    const {modalStep, setModalStep} = this.props;

    const titles = [i18n.t("RECHARGE_TAB_TITLE_RECHARGE"), i18n.t("RECHARGE_TAB_TITLE_HISTORY")];
    const contents = [<Invoice openModal={this.handleModal} key={1} />, <History key={2} />]

    return (
      <div>
        <div className={style.header}>
          <h1>{i18n.t("RECHARGE_TITLE_INVOICE")}</h1>
          <p>{i18n.t("RECHARGE_DESCRIPTION")}</p>
        </div>

        <Tabs tabTitles={titles} tabContents={contents} justify="center" />

        <Modal
          title={i18n.t("RECHARGE_TITLE")}
          content={<RechargeModal />}
          show={isOpen}
          close={
            modalStep === 5 || modalStep === 1 || modalStep === 6 ? ()=>this.closeModal() : null
          }
          back={
            modalStep === 2 || modalStep === 3 || modalStep === 4 ? () => setModalStep(modalStep-1) : null
          }
        />
      </div>
    );
  }
}

Recharge.propTypes = {
  modalStep: PropTypes.number.isRequired,
  setModalStep: PropTypes.func.isRequired,
  getCoinsEnabled: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  modalStep: store.recharge.modalStep, 
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    setModalStep,
    getCoinsEnabled
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recharge);
