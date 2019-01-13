import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const styles = {
  description: {
    width: 600
  },
  preview: {
    margin: '0 auto',
    width: '200px',
    height: '200px',
    backgroundSize: ' contain',
    backgroundRepeat: ' no-repeat',
    backgroundPosition: 'center'
  }
};

const StepAddText = props => {
  const { classes, handleTextChange, description, files } = props;
  return (
    <Fragment>
      {files.map((file, i) => {
        return (
          <div
            key={i}
            className={classes.preview}
            style={{ backgroundImage: `url(${file})` }}
          />
        );
      })}
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
    </Fragment>
  );
};

StepAddText.propTypes = {
  classes: PropTypes.object.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(StepAddText);
