import React from "react";
import PropTypes from "prop-types";

// MATERIAL 
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

import style from "./style.css";

class CustomSelectImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleSelect = () => {
    this.setState({ open: !this.state.open });
  }

  selectItem = () => {
    // const {action} = this.props;
    this.handleSelect();
  }

  renderArrow() {
    if (this.state.open)
      return <KeyboardArrowUp className={style.arrowSelect} />

    return <KeyboardArrowDown className={style.arrowSelect} />
  }

  render() {
    return (
      <div className={style.formBlock}>
        <button className={style.btSelect} onClick={() => this.handleSelect()}>
          <img src='images/lang/brasil.png' /> item
          {this.renderArrow()}
        </button>
        <div className={style.baseSelect} style={this.state.open ? { display: "block" } : { display: "none" }}>
          {/* popular com um props  */}
          <div onClick={this.selectItem}>
            <img src='images/lang/brasil.png' />
            item selecionar
          </div>
        </div>
      </div>
    )
  }
}

CustomSelectImage.propTypes = {
  action: PropTypes.func.isRequired
}

export default CustomSelectImage;