import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

// MATERIAL UI
import CloseIcon from "@material-ui/icons/Close";

//STYLE
import style from "./style.css";

class Modal extends React.Component {
  renderHeader = () => {
    let { back, close } = this.props;
    let { title } = this.props;
    let closeButton = close ? <CloseIcon /> : null;
    let backButton = back ? (
      <img src="/images/icons/arrow/arrow-white-left@2x.png" alt="Back" />
    ) : null;
    
    return (
      <div className={style.header}>
        <div className={style.headerImage} onClick={back ? () => back() : null}>
          {backButton}
        </div>
        <div className={style.headerTitle}>{title}</div>
        <div
          className={style.headerImageClose}
          onClick={close ? () => close() : null}
        >
          {closeButton}
        </div>
      </div>
    );
  };

  renderContent = () => {
    let { content, show } = this.props;
    return (
      <div>
        <ReactModal
          isOpen={show}
          ariaHideApp={false}
          className={style.modalBox}
          overlayClassName={style.overlay}
        >
          <div>
            {this.renderHeader()}
            <div className={style.content}>{content}</div>
          </div>
        </ReactModal>
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  back: PropTypes.func,
  close: PropTypes.func,
  show: PropTypes.bool,
  content: PropTypes.object.isRequired
};

export default Modal;
