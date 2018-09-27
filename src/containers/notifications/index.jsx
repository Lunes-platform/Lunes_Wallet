import React from "react";
import PropTypes from "prop-types";

import Notification from "./notification";

import style from "./style.css";

class Notifications extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Notification />
      </div>
    );
  }
}

export default Notifications;
