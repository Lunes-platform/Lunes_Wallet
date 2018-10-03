import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserSeed } from "../../user/redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";
import { inputValidator } from "../../../utils/inputValidator";

// MATERIAL
import Grid from "@material-ui/core/Grid";

// STYLES
import style from "./style.css";

class SeedWordsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        seed: undefined
      },
      errors: undefined,
      buttonEnable: false
    };
  }

  setSeed = () => {
    let { user, setUserSeed } = this.props;
    setUserSeed(user.password);
  };

  getInput = input => {
    let { name, value } = input;

    this.setState({
      ...this.state,
      inputs: { [name]: value ? input : undefined },
      errors: undefined,
      buttonEnable:
        value.split(" ").length === 12 || value.split(" ").length === 18
          ? true
          : false
    });
  };

  inputValidator = () => {
    let { seed } = this.state.inputs;
    let inputSeed = {
      type: "text",
      name: "seed",
      value: seed == undefined ? "" : seed.value,
      placeholder: i18n.t("PLACEHOLDER_SEED"),
      required: true
    };

    let { errorInput, setUserSeed, user } = this.props;
    let { errors, messageError } = inputValidator({ inputs: inputSeed });

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      setUserSeed(inputSeed.value, user.password);
      this.setState({ ...this.state, redirect: true });
    }
  };

  render() {
    let { seed } = this.state.inputs;
    let { errors } = this.state;

    return (
      <div className={style.box}>
        <Grid container justify="center">
          <Grid item xs={11} md={8} className={style.alignCenter}>
            <span className={style.boldHead}>{i18n.t("SET_SEED_TITLE")}</span>

            <div className={style.boxSeed}>
              <strong>{i18n.t("SEED_INSERT_SEED")}</strong>
              <textarea
                type="textarea"
                name="seed"
                cols="15"
                rows="6"
                placeholder={i18n.t("PLACEHOLDER_SEED")}
                value={!seed ? undefined : seed.value}
                required
                onChange={event => this.getInput(event.target)}
                className={
                  errors ? style.inputTextAreaError : style.inputTextArea
                }
              />
            </div>

            <button
              onClick={() => this.inputValidator()}
              className={style.buttonImport}
            >
              {i18n.t("SET_BUTTON_SEED_IMPORT")}
            </button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SeedWordsPage.propTypes = {
  coins: PropTypes.array,
  user: PropTypes.object,
  errorInput: PropTypes.func,
  setUserSeed: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setUserSeed, errorInput }, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(SeedWordsPage);
