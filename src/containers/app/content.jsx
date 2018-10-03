import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { errorRequest } from "../errors/redux/errorAction";

//UTILS
import { getUsername, clearAll } from "../../utils/localStorage";

// COMPONENTS
import Login from "./login";
import App from "./app";
import LoadingPage from "../skeleton/loading";
import InternalError from "../errors/500";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      content: undefined,
      type: undefined
    };
  }

  changeContent = (content, type) => {
    this.setState({ content, type });
  };

  componentDidMount() {
    this.renderContent();
  }

  componentDidUpdate() {
    let { type } = this.state;
    let { loading, errors } = this.props.skeleton;
    if (errors) {
      if (type !== "error") {
        errorRequest();
        this.changeContent(<InternalError />, "error");
        setTimeout(() => {
          window.location.reload();
        }, 9000);
      }

      return;
    }

    if (loading) {
      if (type !== "loading") return this.renderLoading();
      return;
    }

    return this.renderContent();
  }

  renderLoading = () => {
    return this.changeContent(<LoadingPage />, "loading");
  };

  renderContent = () => {
    try {
      let { type } = this.state;
      let { username, seed, password } = this.props.user.user;
      let usernameStorage = getUsername();

      if (seed && password && type !== "app" && usernameStorage === username) {
        return this.changeContent(<App />, "app");
      }

      if ((!seed || !password) && type !== "login") {
        return this.changeContent(<Login />, "login");
      }
    } catch (error) {
      clearAll();
      return this.changeContent(<Login />, "login");
    }
  };

  render() {
    let { content } = this.state;

    return <div>{content ? content : <LoadingPage />}</div>;
  }
}

Content.propTypes = {
  errorRequest: PropTypes.func,
  user: PropTypes.object,
  skeleton: PropTypes.object,
  username: PropTypes.string,
  seed: PropTypes.string,
  password: PropTypes.string,
  location: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      errorRequest
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Content);
