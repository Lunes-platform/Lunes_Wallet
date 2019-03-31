import React from "react";

// REDUX
import { connect } from "react-redux";
import { setModalSteps, getGeneralInfo } from "./redux/depositAction";
import { bindActionCreators } from "redux";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

// COMPONENTS
import Tabs from "../../components/tabs";
import Invoice from "./invoice";
import History from "./history";
import DepositModal from "./modal/";
import Modal from "../../components/modal";
import Loading from "../../components/loading";

// MATERIAL UI
import { Grid } from "@material-ui/core";


import PropTypes from "prop-types";


class Deposit extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }
  componentDidMount(){
    const {getGeneralInfo} = this.props;
    getGeneralInfo();
  }

  handleSteps = step => {
    const { setModalSteps } = this.props;

    if (step > 1) return setModalSteps(step - 1);
  };

  handleModal = () => {
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  };

  
  closeModal = () => {
    const { setModalSteps } = this.props;

    this.handleModal();
    setModalSteps(1);
  };

  render() {
    const { isOpen } = this.state;
    const { modalStep, loading} = this.props;
    const titles = [
      i18n.t("DEPOSIT_TAB_TITLE"),
      i18n.t("DEPOSIT_TAB_HISTORY_TITLE")
    ]; 
    if (loading) return <Loading color="wallet" height="80vh" width="100px" />;
    const contents = [
      <Invoice openModal={() => this.handleModal()} key={0} />,
      <History key={1} />
    ];
    return (
      <Grid container justify="center">
        <Modal
          title={i18n.t("DEPOSIT_INF_MODAL_HEADER")}
          content={<DepositModal />}
          show={isOpen}
          close={() => this.closeModal()}
          back={() => this.handleSteps(modalStep)}
        />
        <Grid item xs={12} className={style.header}>
          <center>
            <h1>{i18n.t("DEPOSIT_HEADER_TITLE")}</h1>
            <p>{i18n.t("DEPOSIT_HEADER_SUBTITLE")}</p>
          </center>
        </Grid>
        <Tabs tabTitles={titles} tabContents={contents} justify="center" />
      </Grid>
    );
  }
}

Deposit.propTypes = {
  modalStep: PropTypes.number,
  setModalSteps: PropTypes.func,
  getGeneralInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep,
  loading: store.deposit.loadingGeneral
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalSteps,
      getGeneralInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deposit);
