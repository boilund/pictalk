import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

import * as actions from '../actions';
import { connect } from 'react-redux';

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
        onChange={handleNameChange}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

GroupNameInput.propTypes = {
  classes: PropTypes.object.isRequired,
  groupname: PropTypes.string.isRequired,
  setGroupName: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    groupname: state.group.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroupName: groupname => dispatch(actions.setGroupName(groupname))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GroupNameInput));
