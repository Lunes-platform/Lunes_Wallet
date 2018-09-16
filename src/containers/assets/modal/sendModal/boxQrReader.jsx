import React, { Component } from "react";
import QrReader from "react-qr-reader";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getValidateAddress,
  setAssetSendModalLoading
} from "../../redux/assetsAction";
import { errorInput } from "../../../errors/redux/errorAction";

class BoxQrReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: ""
    };
  }

  handleScan = data => {
    let { coin, coins, getValidateAddress, setAssetSendModalLoading } = this.props;
    let coinName = coins[coin].name;

    if (data) {
      setAssetSendModalLoading();
      getValidateAddress(coinName, data);
    }
  };

  handleError = error => {
    let { errorInput } = this.props;
    errorInput(error.message);
  };

  render() {
    let { result, delay } = this.state;

    return (
      <div>
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{result}</p>
      </div>
    );
  }
}

BoxQrReader.propTypes = {
  coin: PropTypes.string.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  getValidateAddress: PropTypes.func.isRequired,
  setAssetSendModalLoading: PropTypes.func.isRequired,
  errorInput: PropTypes.func
};

const mapStateToProps = store => ({
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      errorInput,
      getValidateAddress,
      setAssetSendModalLoading
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxQrReader);
