import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const styles = {
  description: {
    width: 600
  }
};

const StepAddText = props => {
  const { classes, handleTextChange, description } = props;
  return (
    <TextField
      className={classes.description}
      value={description}
      onChange={handleTextChange}
      placeholder="Write description to your picture"
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

StepAddText.propTypes = {
  classes: PropTypes.object.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
};

export default withStyles(styles)(StepAddText);
