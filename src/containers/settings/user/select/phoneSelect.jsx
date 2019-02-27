import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "@material-ui/core/Select";
import { withStyles, MenuItem } from "@material-ui/core";
import colors from "../../../../components/bases/colors";
import InputLabel from '@material-ui/core/InputLabel';

const customStyle = {
  img: {
    width: "60%",
    height: "auto"
  },
  underlineItems: {
    color: "white",
    borderBottom: "1px solid ",
    borderBottomColor: `${colors.purple.dark} !important`,
    fontSize: "16px !important"
  },
  menuItemRoot: {
    color: colors.messages.info
  },
  disabled: {},
  error: {},
  focused: {}
};

const MenuProps = {
  PaperProps: {
    style: {
      color: "#fff",
      maxHeight: 40 * 4.5,
      marginTop: "4%",
      backgroundColor: "#473088",
      minWidth: "20%",
      width: "300px"
    }
  }
};

class CountrySelectNative extends Component {
  static defaultProps = {
    selectArrowComponent: () => (
      <div className="react-phone-number-input__country-select-arrow" />
    )
  };

  onChange = event => {
    const { onChange } = this.props;
    const value = event.target.value;
    onChange(value === "ZZ" ? undefined : value);
  };

  render() {
    const {
      name,
      value,
      options,
      onFocus,
      onBlur,
      disabled,
      tabIndex,
      className,
      classes,
      selectArrowComponent: SelectArrow
    } = this.props;

    let selectedOption;
    for (const option of options) {
      if (!option.divider && option.value === value) {
        selectedOption = option;
      }
    }

    return (
      <div
        className={classNames(
          className,
          "react-phone-number-input__country--native"
        )}
      >
          {selectedOption &&
            React.createElement(selectedOption.icon, { value })}


        <Select
          name={name}
          value={value || "ZZ"}
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          tabIndex={tabIndex}
          aria-label={this.props["aria-label"]}
          className="react-phone-number-input__country-select"
          MenuProps={MenuProps}
        >
          {options.map(({ value, label, divider }) => (
            <MenuItem
              classes={{
                root: classes.menuItemRoot
              }}
              key={divider ? "|" : value || "ZZ"}
              value={divider ? "|" : value || "ZZ"}
              disabled={divider ? true : false}
              className={
                divider
                  ? "react-phone-number-input__country-select-divider"
                  : undefined
              }
            >
              {label}
            </MenuItem>
          ))}
        </Select>

        <SelectArrow />
      </div>
    );
  }
}

CountrySelectNative.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      divider: PropTypes.bool
    })
  ).isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  selectArrowComponent: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(customStyle)(CountrySelectNative);
