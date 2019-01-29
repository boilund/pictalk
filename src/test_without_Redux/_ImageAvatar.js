import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  md: {
    border: '1px solid lightgray'
  },
  Lg: {
    width: 90,
    height: 90,
    border: '1px solid lightgray'
  }
});

const ImageAvatar = props => {
  const { classes, size, key, image, alt } = props;
  return (
    <Avatar
      key={key}
      alt={alt}
      src={image}
      className={size === 'Lg' ? `${classes.Lg}` : `${classes.md}`}
    />
  );
};

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.string,
  key: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string
};

export default withStyles(styles)(ImageAvatar);
