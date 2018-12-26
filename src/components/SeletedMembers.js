import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';

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
        return user.image ? (
          <ImageAvatar key={i} image={user.image} />
        ) : (
          <LetterAvatar key={i} nickname={user.nickname} />
        );
      })}
    </div>
  );
};

SeletedMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.array.isRequired
};

export default withStyles(styles)(SeletedMembers);
