import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';

const styles = theme => ({
  avatar: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const GroupListContent = props => {
  const { classes, group } = props;

  return (
    <Fragment>
      <div className={classes.avatar}>
        {group.image ? (
          <ImageAvatar
            alt={group.name}
            image={`/avatarUploads/${group.image}`}
          />
        ) : (
          <LetterAvatar nickname={group.name} color={'default'} />
        )}
      </div>
      <Typography variant={'subtitle1'}>{group.name}</Typography>
    </Fragment>
  );
};

GroupListContent.propTypes = {
  classes: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupListContent);
