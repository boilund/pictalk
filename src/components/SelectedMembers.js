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
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const SelectedMembers = props => {
  const { classes, checked } = props;

  return (
    <div className={classes.container}>
      {checked.map((user, i) => {
        return user.image ? (
          <div className={classes.margin} key={i}>
            <ImageAvatar image={user.image} alt={user.nickname} />
          </div>
        ) : (
          <div className={classes.margin} key={i}>
            <LetterAvatar nickname={user.nickname} color={user.avatarColor} />
          </div>
        );
      })}
    </div>
  );
};

SelectedMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.array.isRequired
};

export default withStyles(styles)(SelectedMembers);
