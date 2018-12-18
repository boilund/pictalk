import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import ImageAvatar from './ImageAvatar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class GroupImageName extends React.Component {
  state = {
    name: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <ImageAvatar size="Lg" />
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Group name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    );
  }
}

GroupImageName.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupImageName);
