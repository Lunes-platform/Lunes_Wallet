import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// MATERIAL
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

// STYLE
import style from "./style.css";

// UTILS
import { getDefaultFiat, getDefaultCrypto } from "../../../utils/localStorage";

class CustomSelectImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      initialValue: ""
    };
  }

  componentDidMount() {
    let { type } = this.props;
    let initialValue = undefined;

    if (type === "fiat") {
      initialValue = getDefaultFiat();
    } else {
      initialValue = getDefaultCrypto();
    }

    this.setState({
      ...this.state,
      initialValue: initialValue.toUpperCase()
    });
  }

  handleSelect = () => {
    this.setState({ open: !this.state.open });
  };

  renderArrow() {
    if (this.state.open)
      return <KeyboardArrowUp className={style.arrowSelect} />;

    return <KeyboardArrowDown className={style.arrowSelect} />;
  }

  render() {
    let { action, image, value } = this.props;
    return (
      <div className={style.formBlock}>
        <div>
          <button
            className={style.btSelect}
            onClick={() => this.handleSelect()}
          >
            <img src={image} />
            {value}
            {this.renderArrow()}
          </button>
          <div
            className={style.baseSelect}
            style={this.state.open ? { display: "block" } : { display: "none" }}
            onClick={event => this.handleSelect(event.target.value)}
          >
            {action()}
          </div>
        </div>
      </div>
    );
  }
}

CustomSelectImage.propTypes = {
  action: PropTypes.func.isRequired,
  coins: PropTypes.array,
  type: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string
};

const mapStateToProps = store => ({
  coins: store.skeleton.coins,
  user: store.user.user
});

export default connect(
  mapStateToProps,
  null
)(CustomSelectImage);
