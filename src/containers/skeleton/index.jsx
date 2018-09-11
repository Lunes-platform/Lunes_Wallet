import React from "react";
import PropTypes from "prop-types";

// COMPONENTS
import Header from "./header";
import Menu from "./menu";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

//UTILS
import { clearAll } from "../../utils/localStorage";

class Skeleton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openMenu: false };
  }

  toggleMenu = () => {
    this.setState({ ...this.state, openMenu: !this.state.openMenu });
  };

  logout = () => {
    clearAll();
    window.location.reload();
  };

  render() {
    const { children } = this.props;
    const { openMenu } = this.state;
    return (
      <div>
        <Header actionMenu={this.toggleMenu} actionLogout={this.logout} />
        <Grid container>
          <Grid item md={2} xl={1}>
            <Menu
              openMenu={openMenu}
              actionMenu={this.toggleMenu}
              actionLogout={this.logout}
            />
          </Grid>
          <Grid item xs={12} lg={10} xl={11}>
            <div className={style.colContainer}>{children}</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Skeleton.propTypes = {
  children: PropTypes.element.isRequired
};

export default Skeleton;
