import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
  preview: {
    width: '300px',
    height: '300px',
    backgroundSize: ' cover',
    backgroundRepeat: ' no-repeat',
    backgroundPosition: 'center'
  }
};

const StepAddPhoto = props => {
  const { classes, handleChange, file } = props;
  return (
    <Fragment>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="addPhoto" />
          <Input id="addPhoto" type="file" autoFocus onChange={handleChange} />
        </FormControl>
      </form>
      <div
        className={classes.preview}
        style={{ backgroundImage: `url(${file})` }}
      />
    </Fragment>
  );
};

StepAddPhoto.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  file: PropTypes.string
};

export default withStyles(styles)(StepAddPhoto);
