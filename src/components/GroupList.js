import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from './ImageAvatar';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px`,
    cursor: 'pointer'
  }
});

const GroupList = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <ImageAvatar />
      <Typography variant={'subtitle1'}>group name</Typography>
    </Paper>
  );
};

GroupList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupList);
