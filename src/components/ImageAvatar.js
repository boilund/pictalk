import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit
  },
  Lg: {
    margin: theme.spacing.unit,
    width: 100,
    height: 100
  }
});

const ImageAvatar = props => {
  const { classes, size } = props;
  return (
    <Avatar
      alt="raichu"
      src="/imgs/raichu.png"
      className={size === 'Lg' ? `${classes.Lg}` : `${classes.avatar}`}
    />
  );
};

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.string
};

export default withStyles(styles)(ImageAvatar);
