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

class AddPhotoStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });

    // TODO: Save image to database
    // const formData = new FormData();
    // formData.append('id', user._id);
    // formData.append('file', e.target.files[0]);
    // this.props.setGroupImage(formData);
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <form>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="addPhoto" />
            <Input
              id="addPhoto"
              type="file"
              autoFocus
              className={classes.input}
              onChange={this.handleChange}
            />
          </FormControl>
        </form>
        <div
          className={classes.preview}
          style={{ backgroundImage: `url(${this.state.file})` }}
        />
      </Fragment>
    );
  }
}

AddPhotoStep.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddPhotoStep);
