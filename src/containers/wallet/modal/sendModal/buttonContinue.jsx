import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

// COMPONENTS
import Loading from "../../../../components/loading";

class ButtonContinue extends React.Component {
  render() {
    const { action, loading, label = i18n.t("BTN_CONFIRM"), error } = this.props;
    return (
      <button
        className={!error ? style.btContinueDisable : style.btError}
        onClick={action}
      >
        {loading ? <Loading /> : label}
      </button>
    );
  }
}

ButtonContinue.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default ButtonContinue;
