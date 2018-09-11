import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import style from "./style.css";
import colors from "../../components/bases/colors";

/**
 * COMPONENT PROPS:
 * tabTitles: Array of strings [Required],
 * tabContents: Array of content components [Required],
 * justify: String - 'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'
 */

const tabStyles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: "98%",
    margin: theme.spacing.unit * 2
  },
  tabsRoot: {
    margin: "-5px"
  },
  tabsIndicator: {
    backgroundColor: colors.green.dark,
    height: "3px"
  },
  tabRoot: {
    fontWeight: 600,
    marginRight: "1px",
    opacity: 1,
    borderRadius: "5px 5px 0 0",
    textTransform: "none",
    backgroundColor: colors.purple.default
  },
  tabSelected: {}
});

const gridStyle = { maxWidth: "100%" };

class CustomTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderTabs = () => {
    let { value } = this.state;
    let { classes, tabTitles, tabContents, justify } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify={justify ? justify : "flex-start"}
        zeroMinWidth
      >
        <Grid item style={gridStyle}>
          <Tabs
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="off"
          >
            {tabTitles.map((title, key) => (
              <Tab
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected
                }}
                key={key}
                label={title}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} className={style.tabContainer}>
          {tabContents.map(
            (content, key) =>
              value === key ? (
                <div className={style.tabContents} key={key}>
                  {content}
                </div>
              ) : (
                ""
              )
          )}
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>{this.renderTabs()}</div>;
  }
}

CustomTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabTitles: PropTypes.array.isRequired,
  tabContents: PropTypes.array.isRequired,
  justify: PropTypes.string
};

export default withStyles(tabStyles)(CustomTabs);
