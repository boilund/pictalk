import React from 'react';
import PropTypes from 'prop-types';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  addCircle: {
    marginRight: theme.spacing.unit
  }
});

const CreateGroup = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <AddCircleOutline className={classes.addCircle} />
      <Typography variant={'subtitle1'}>Create group</Typography>
    </Paper>
  );
};

CreateGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateGroup);
