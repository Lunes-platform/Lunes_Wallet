import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import { Grid, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeAvaliation, closeChat } from "../../redux/p2pAction";
// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

//COMPONENTS
import Starvotes from "../../components/starVotes";

class ConfirmModal extends React.Component {
  close = () => {
    const { closeAvaliation, closeChat } = this.props;
    closeAvaliation();
    closeChat();
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={style.profile}>
            <Avatar
              src={"images/lunio/lunio-user@100x100.jpg"}
              className={style.avatar}
            />
            <div className={style.userName}>
              <span className={style.name}>{i18n.t("P2P_COMING_SOON")}</span>
            </div>
            <div className={style.hr} />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={style.avaliation}>
            <span className={style.spanTitle}>{i18n.t("P2P_TEXT_3")}</span>
            <div className={style.starVotes}>
              <Starvotes />
            </div>
            <div>
              <Input className={style.comment} />
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={style.btnConfirm}>
            <button className={style.buttonCard} onClick={this.close}>
              {i18n.t("P2P_BUTTON_CONFIRM")}
            </button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

ConfirmModal.propTypes = {};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeAvaliation, closeChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmModal);

//Criar um container para centralizar os itens
