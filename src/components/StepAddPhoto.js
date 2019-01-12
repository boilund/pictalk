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
  const { classes, handleChange, files } = props;
  return (
    <Fragment>
      <form action="/image-upload" method="post" encType="multipart/form-data">
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="addPhoto" />
          <input
            id="addPhoto"
            name="image"
            type="file"
            multiple
            autoFocus
            onChange={handleChange}
          />
        </FormControl>
      </form>
      {files.map((file, i) => {
        return (
          <div
            key={i}
            className={classes.preview}
            style={{ backgroundImage: `url(${file})` }}
          />
        );
      })}
    </Fragment>
  );
};

StepAddPhoto.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(StepAddPhoto);
