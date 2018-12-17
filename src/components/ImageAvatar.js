import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit
  }
});

const ImageAvatar = props => {
  const { classes } = props;
  return (
    <Avatar alt="raichu" src="/imgs/raichu.png" className={classes.avatar} />
  );
};

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatar);
