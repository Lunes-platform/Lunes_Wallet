import React, { Component } from "react";
import Loadable from "react-loadable";
import path from "path";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import i18n from "../../../utils/i18n";

// COMPONENTS
import Loading from "../../../components/loading";
import fakeDelay from "../../../components/fakeDelay";
import Carousel from "../../../components/carousel/carousel";
import ModalBar from "../../../components/modalBar";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "../style.css";

function Transition({ error }) {
  if (error) {
    return "Error!";
  } else {
    return <Loading color="lunes" width="35px" />;
  }
}

/* eslint-disable */
let login = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../user/login")),
  loading: Transition,
  serverSideRequirePath: path.resolve(__dirname, "../../user/login")
});

let reset = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../user/reset")),
  loading: Transition,
  serverSideRequirePath: path.resolve(__dirname, "../../user/reset")
});

let resetNewPassword = Loadable({
  loader: () =>
    fakeDelay(400).then(() => import("../../user/reset/newPassword")),
  loading: Transition,
  serverSideRequirePath: path.resolve(__dirname, "../../user/reset/newPassword")
});

let create = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../user/create")),
  loading: Transition,
  serverSideRequirePath: path.resolve(__dirname, "../../user/create")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../errors/404")),
  loading: Transition,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../errors/500")),
  loading: Transition,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
});
/* eslint-enable */

const imagePath = "/images/carousel/";

const carouselSteps = [
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_1"),
    imgPath: imagePath + "Slider-Boleto.png"
  },
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_2"),
    imgPath: imagePath + "/Slider-TED.png"
  },
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_3"),
    imgPath: imagePath + "/Slider-Recarga.png"
  },
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_4"),
    imgPath: imagePath + "/Slider-Wallet.png"
  }
];

const maxDots = carouselSteps.length;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: false
    };
  }

  componentDidMount() {
    this.newPasswordAuth();
  }

  newPasswordAuth = () => {
    let newPassword = true;
    if (newPassword) {
      this.setState({ newPassword: true });
    }

    return;
  };

  render() {
    const { error } = this.props;

    return (
      <Router>
        <div>
          <Grid container>
            <div>
              {error.active ? (
                <ModalBar type={error.type} message={error.message} timer />
              ) : null}
            </div>
            <Grid item xs={12} sm={12} md={5} className={style.colLeft}>
              <Switch>
                {/* INSIDE ROUTES */}
                <Route exact path="/" component={login} />
                <Route exact path="/login" component={login} />
                <Route exact path="/reset" component={reset} />
                <Route exact path="/create" component={create} />
                {/* ERRORS PAGE */}
                <Route path="/404" component={errorNotFound} />
                <Route path="/500" component={errorInternal} />
                <Route path={"**"} component={login} />
              </Switch>
            </Grid>

            <Hidden smDown>
              <Grid item md={7} className={style.colRight}>
                <Carousel imageSteps={carouselSteps} maxDot={maxDots} />
              </Grid>
            </Hidden>
          </Grid>
        </div>
      </Router>
    );
  }
}

Login.propTypes = {
  error: PropTypes.object
};

const mapSateToProps = store => ({
  error: store.error.message
});

export default connect(mapSateToProps)(Login);

