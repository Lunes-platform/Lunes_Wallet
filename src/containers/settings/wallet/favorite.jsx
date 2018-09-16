import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {} from "../redux/settingsAction";

// STYLES
import style from "./style.css";

// COMPONENTS
import WalletRow from "./walletRow";

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderWallets() {
    let { coins } = this.props;
    return Object.keys(coins).map((val, key) => {
      let coin = coins[val];
      if (coin.status !== "active") {
        return;
      }

      return (
        <div key={key}>
          <WalletRow coin={coin} />
        </div>
      );
    });
  }

  render() {
    return <div className={style.box}>{this.renderWallets()}</div>;
  }
}

FavoritePage.propTypes = {
  coins: PropTypes.array.isRequired,
  getFavoritesCrypto: PropTypes.func
};

const mapStateToProps = store => ({
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePage);
