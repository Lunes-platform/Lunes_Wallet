import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Footer from "../footer";
import CreateUser from "./createUser";
import Password from "./password";
import Terms from "./terms";
import EmailMessage from "./emailMessage";

// STYLE
import style from "../style.css";

class Create extends React.Component {
  renderContent = () => {
    let { create } = this.props.user.pages;
    if (create === 0) return <CreateUser />;
    if (create === 1) return <Password />;
    if (create === 2) return <Terms />;
    if (create === 3) return <EmailMessage />;
  };

  render() {
    return (
      <div className={style.contGeneral}>
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

Create.propTypes = {
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Create);
