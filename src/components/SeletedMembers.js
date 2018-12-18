import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageAvatar from './ImageAvatar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2
  }
});

const SeletedMembers = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      {[0, 1, 2, 3, 4].map(value => {
        return <ImageAvatar key={value} />;
      })}
    </div>
  );
};

SeletedMembers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SeletedMembers);
