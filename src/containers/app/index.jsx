import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store";

// COMPONENTS
import Content from "./content";

// STYLE
import style from "./style.css";

class Routes extends Component {
  render() {
    return (
      <div className={style.textDefault}>
        <Provider store={Store}>
          <Content />
        </Provider>
      </div>
    );
  }
}

export default Routes;
