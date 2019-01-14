import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const GroupNameInput = props => {
  const { classes, groupname, setGroupName } = props;

  const handleNameChange = e => {
    setGroupName(e.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Group name"
        className={classes.textField}
        value={groupname}
        onChange={e => handleNameChange(e)}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

GroupNameInput.propTypes = {
  classes: PropTypes.object.isRequired,
  groupname: PropTypes.string,
  setGroupName: PropTypes.func.isRequired
};

export default withStyles(styles)(GroupNameInput);
