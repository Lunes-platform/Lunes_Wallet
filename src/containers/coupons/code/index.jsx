import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import style from "./style.css";

class Code extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (id) => event => {
    this.props.onHandleChange(id, event);
  }

  renderCodeInputs = () => {
    const { values } = this.props;
    let dic = ['first','second','third','fourth']
    return (
      [...Array(4).keys()].map((id) => {
        return (
          <Grid key={id} item xs={6} sm={3}>
            <input key={id}
              className={style.inputTextDefault+' '+dic[id]}
              placeholder="1234"
              value={values[id]}
              maxLength={4}
              onKeyDown={this.handleChange(id)}
              onChange={this.handleChange(id)}
              required
            />
          </Grid>
        );
      })
    )
  }

  render() {
    return (
      <Grid container>
        {this.renderCodeInputs()}
      </Grid>
    );
  }
}

Code.propTypes = {
  values: PropTypes.array.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default Code;
