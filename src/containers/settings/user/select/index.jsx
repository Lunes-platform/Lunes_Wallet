import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../../utils/i18n";

// MATERIAL
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

// STYLES
import style from "./style.css";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleSelect = () => {
    this.setState({ open: !this.state.open });
  }

  selectItem = (value) => {
    const {action} = this.props;

    this.handleSelect();
    action(value);
  }

  renderItems = () => {
    const {items} = this.props;

    return items.map((item, id) => {
      return (
        <div key={id} onClick={() => {this.selectItem(item)}}>
          {item}
        </div>
      );
    })

  }

  renderArrow() {
    if (this.state.open) {
      return <KeyboardArrowUp className={style.arrowSelect} />
    }

    return <KeyboardArrowDown className={style.arrowSelect} />
  }

  render() {
    const {fullWidth, value} = this.props;

    return (
      <div className={style.formBlock}>
        <button className={style.btSelect} onClick={() => this.handleSelect()} style={{maxWidth: fullWidth ? '100%' : '140px'}}>
          {value ? value : <span className={style.defaultSelect}>{i18n.t("SETTINGS_USER_SELECT")}</span>}
          {this.renderArrow()}
        </button>
        <div className={style.baseSelect} style={this.state.open ? { display: "block" } : { display: "none" }}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

CustomSelect.propTypes = {
  action: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fullWidth: PropTypes.bool,
}

export default CustomSelect;
