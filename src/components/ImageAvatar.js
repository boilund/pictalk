import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10
  }
};

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
