import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { Grid } from "@material-ui/core";
import style from "./style.css";
import textBase from "../textBase.css";

const styles = {
    dot: {
        background: "#907db2",
        width: 10.2,
        height: 10,
        marginRight: 10,
        cursor: 'pointer'
    },
    dots: {

    },
    dotActive: {
        background: "#fff"
    },
    root: {
        marginTop: 40,
        background: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0
        };
    }

    stepChange = activeStep => {
        this.setState({ activeStep });
    };

    changeStepTo = (step) => {
      this.setState({activeStep: step});
    }
    componentDidMount() {
      setTimeout(() => {
        let dots = document.querySelectorAll('[class*="MuiMobileStepper-dot-"]');
        Array.from(dots).map((dot, key) => {
          dot.onclick = () => {
            this.changeStepTo(key)
          }
        })
      }, 200)
    }

    render() {
        const { classes } = this.props;
        const props = this.props;
        return (
            <Grid container>
              <Grid item xs={12} sm={12}>
                <AutoPlaySwipeableViews
                  className={style.center}
                  index={this.state.activeStep}
                  onChangeIndex={this.stepChange}
                enableMouseEvents>

                  {props.imageSteps.map((item, index) => (
                    <div className={style.paragraph} key={index}>
                      <img className={style.imageResponsive} src={item.imgPath} alt={item.label} />
                      <p className={textBase.defaultP}>
                        <label>{item.label}</label>
                      </p>
                    </div>
                  ))}

                </AutoPlaySwipeableViews>
                <MobileStepper
                  steps={props.maxDot}
                  position="static"
                  activeStep={this.state.activeStep}
                  classes={{
                    dots: classes.dots,
                    dot: classes.dot,
                    dotActive: classes.dotActive,
                    root: classes.root
                  }}
                />
              </Grid>
            </Grid>
        );
    }
}

Carousel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carousel);
