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
  const { classes, checked } = props;

  return (
    <div className={classes.container}>
      {checked.map((user, i) => {
        return <ImageAvatar key={i} image={user.image} />;
      })}
    </div>
  );
};

SeletedMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.array.isRequired
};

export default withStyles(styles)(SeletedMembers);
