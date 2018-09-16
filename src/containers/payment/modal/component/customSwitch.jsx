import React from "react";
import PropTypes from 'prop-types';

// MATERIAL
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

// STYLES
import style from "./style.css";

const materialStyle = theme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: '#ffffff',
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'none',
    backgroundColor: '#ccc',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

class CustomSwitch extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { title, description, action, checked, classes, value } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={11}>
          <div className={style.box}>
            <h3>{title}</h3>
            <div className={style.formSwitch}>
              {description}
              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                disableRipple
                value={value}
                checked={checked}
                onChange={action}
              />
            </div>
          </div>

        </Grid>
      </Grid>
    )
  }
}

CustomSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool || false,
};

export default withStyles(materialStyle)(CustomSwitch);
