import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadGeneralInfo, balanceCoins } from "./redux/skeletonAction";

// COMPONENTS
import Loading from "../../components/loading";

// STYLE
import style from "./style.css";

class LoadingPage extends Component {
  componentDidMount() {
    this.loadingInfos();
  }

  loadingInfos = () => {
    let { loading } = this.props.skeleton;
    let { loadGeneralInfo } = this.props;
    let { password } = this.props.user;

    if (loading) {
      loadGeneralInfo(password);
    }
  };

  render() {
    return (
      <div className={style.alignLoadingContainer}>
        <div className={style.itemsLoadingContainer}>
          <img
            src="../../images/logo.svg"
            className={style.logoLoading}
            width="250px"
          />

          <div>
            <Loading color="general" width="300px" />
          </div>
        </div>
      </div>
    );
  }
}

LoadingPage.propTypes = {
  errorRequest: PropTypes.func,
  loadGeneralInfo: PropTypes.func,
  balanceCoins: PropTypes.func,
  skeleton: PropTypes.object,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  skeleton: store.skeleton,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadGeneralInfo,
      balanceCoins
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(LoadingPage);
