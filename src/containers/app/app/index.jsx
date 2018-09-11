import React, { Component } from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import path from "path";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Loading from "../../../components/loading";
import Skeleton from "../../skeleton";
import ModalBar from "../../../components/modalBar";

function loading({ error }) {
  if (error) {
    return "Error!";
  } else {
    return <Loading color="wallet" height="80vh" width="100px" />;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../home")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../home")
});

let wallet = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../wallet")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../wallet")
});

let leasing = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../leasing")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../leasing")
});

let coupons = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../coupons")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../coupons")
});

let settings = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings")
});

let user = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/user")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/user")
});

let security = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/security")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/security")
});

let walletSettings = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/wallet")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/wallet")
});

let definitions = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/definitions")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/definitions")
});

let consent = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/consent")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/consent")
});

let payment = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../payment")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../payment")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/404")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/500")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
});
/* eslint-enable */

class App extends Component {
  render() {
    const { error } = this.props;
    return (
      <Router>
        <div>
          <div>
            {error.active ? (
              <ModalBar type={error.type} message={error.message} timer />
            ) : null}
          </div>
          <Skeleton>
            <Switch>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={home} />
              <Route path="/home" component={home} />
              <Route path="/wallet" component={wallet} />
              <Route path="/coupons" component={coupons} />
              <Route path="/leasing" component={leasing} />
              <Route path="/settings" component={settings} />
              <Route path="/user" component={user} />
              <Route path="/security" component={security} />
              <Route path="/wallet-settings" component={walletSettings} />
              <Route path="/definitions" component={definitions} />
              <Route path="/consent" component={consent} />
              <Route path="/payment" component={payment} />

              {/* ERRORS PAGE */}
              <Route path="/404" component={errorNotFound} />
              <Route path="/500" component={errorInternal} />
              <Route path={"**"} component={errorNotFound} />
            </Switch>
          </Skeleton>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  error: PropTypes.object
};

const mapSateToProps = store => ({
  error: store.error.message
});

export default connect(mapSateToProps)(App);
