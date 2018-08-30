import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import style from "../style.css";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nodeName: "Nodes Profissionais",
      classLabel: style.btNode
    }
  }

  handleSelect = (value, address) => {
    let { handleAddress } = this.props;

    if (value) {
      this.setState({ open: !this.state.open, nodeName: value, classLabel: style.btNodeSelected });
      handleAddress(address);
    }
    else {
      this.setState({ open: !this.state.open, nodeName: "Nodes Profissionais", classLabel: style.btNode });
      handleAddress("");
    }
  }

  loadNodes = () => {
    let { professionalNodes } = this.props;

    return professionalNodes.map((node, index) => (
      <div key={index} onClick={() => this.handleSelect(node.domain, node.address)}>{node.domain}</div>)
    );
  }
  renderArrow() {
    if (this.state.open)
      return <ArrowDropUp className={style.arrowSelect} />

    return <ArrowDropDown className={style.arrowSelect} />
  }

  render() {
    let { nodeName, classLabel } = this.state;
    return (
      <div className={style.formBlock}>
        <button className={classLabel} onClick={() => this.handleSelect()}>
          {nodeName}
          {this.renderArrow()}
        </button>
        <div className={style.baseSelect} style={this.state.open ? { display: "block" } : { display: "none" }}>
          {this.loadNodes()}
        </div>
      </div>
    )
  }
}

CustomSelect.propTypes = {
  professionalNodes: PropTypes.array,
  handleAddress: PropTypes.func
}

const mapSateToProps = store => ({
  professionalNodes: store.leasing.professionalNode
});

export default connect(
  mapSateToProps,
  null
)(CustomSelect); 