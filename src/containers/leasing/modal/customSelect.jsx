import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// MATERIAL UI
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

// STYLES
import style from "../style.css";

// UTILS
import i18next from "../../../utils/i18n";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nodeName: i18next.t("LEASING_SELECT_NODE_DEFAULT"),
      classLabel: style.btNode
    };
  }

  handleSelect = (value, address) => {
    let { handleAddress } = this.props;

    if (value) {
      this.setState({
        open: !this.state.open,
        nodeName: value,
        classLabel: style.btNodeSelected
      });
      handleAddress(address);
    } else {
      this.setState({
        open: !this.state.open,
        nodeName: i18next.t("LEASING_SELECT_NODE_DEFAULT"),
        classLabel: style.btNode
      });
      handleAddress("");
    }
  };

  loadNodes = () => {
    let { professionalNode } = this.props;

    if (!professionalNode) return <div>No node found</div>;

    return professionalNode.map((node, index) => (
      <div
        key={index}
        onClick={() => this.handleSelect(node.domain, node.address)}
      >
        {node.domain}
      </div>
    ));
  };
  renderArrow() {
    if (this.state.open) return <ArrowDropUp className={style.arrowSelect} />;

    return <ArrowDropDown className={style.arrowSelect} />;
  }

  render() {
    let { nodeName, classLabel } = this.state;
    return (
      <div className={style.formBlock}>
        <button className={classLabel} onClick={() => this.handleSelect()}>
          {nodeName}
          {this.renderArrow()}
        </button>
        <div
          className={style.baseSelect}
          style={this.state.open ? { display: "block" } : { display: "none" }}
        >
          {this.loadNodes()}
        </div>
      </div>
    );
  }
}

CustomSelect.propTypes = {
  professionalNode: PropTypes.array,
  handleAddress: PropTypes.func
};

const mapSateToProps = store => ({
  professionalNode: store.leasing.professionalNode
});

export default connect(
  mapSateToProps,
  null
)(CustomSelect);
