import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const Loading = props => {
  const { classes } = props;
  return (
    <CircularProgress
      className={classes.progress}
      container
      justify="center"
      alignItems="center"
    />
  );
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
