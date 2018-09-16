import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { clearMessage } from "../containers/errors/redux/errorAction";

// MATERIAL UI
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

// STYLE
import colorBase from "./bases/colorBase.css";

/*
Component Props
type: string -    default: info
message: string - default: "NO TEXT MESSAGE"
timer: boolean -   default: disabled / enabled: 6000ms
*/

// IMAGES
const imagePath = "/images/modal/";

const style = {
  modal: {
    borderRadius: "4px",
    flexWrap: "wrap",
    pointerEvents: "initial"
  },
  modalContent: {
    alignItems: "center",
    display: "flex"
  },
  typeIcon: {
    color: "#000000"
  },
  message: {
    color: "#000000",
    fontSize: "17px",
    opacity: "0.4",
    margin: "0 50px 0 20px"
  },
  closeIcon: {
    color: "#000000",
    fontSize: "24px",
    opacity: "0.54",
    float: "right"
  }
};

class ModalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      type: undefined,
      message: undefined
    };
  }

  componentDidMount() {
    this.validateContent();
  }

  // VALIDATE CONTENT
  validateContent = () => {
    let { type, message, timer } = this.props;

    if (!type) type = "info";
    if (!message) message = "NO TEXT MESSAGE";
    if (timer)
      setTimeout(() => {
        this.modalClose();
      }, 4000);
    this.setState({ type, message });
  };

  // MANUAL CLOSE
  modalClose() {
    let { clearMessage } = this.props;

    this.setState(...this.state, { show: false });
    clearMessage();
  }

  render() {
    let { classes } = this.props;
    let { type, message } = this.state;
    let { bgInfo, bgSuccess, bgError } = colorBase;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.show}
        >
          <div
            className={[
              classes.modal,
              type === "info"
                ? bgInfo
                : type === "success"
                  ? bgSuccess
                  : bgError
            ].join(" ")}
          >
            <SnackbarContent
              style={{ borderRadius: "4px", backgroundColor: "transparent" }}
              message={
                <div className={classes.modalContent}>
                  <img
                    className={classes.typeIcon}
                    src={imagePath + "/" + type + ".png"}
                  />
                  <span className={classes.message}>{message}</span>
                  <CloseIcon
                    className={classes.closeIcon}
                    onClick={() => {
                      this.modalClose();
                    }}
                  />
                </div>
              }
            />
          </div>
        </Snackbar>
      </div>
    );
  }
}

ModalBar.propTypes = {
  clearMessage: PropTypes.func,
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  message: PropTypes.string,
  timer: PropTypes.bool
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearMessage
    },
    dispatch
  );

export default compose(
  withStyles(style),
  connect(
    null,
    mapDispatchToProps
  )
)(ModalBar);
