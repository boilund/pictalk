import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from './ImageAvatar';

const GroupListContent = props => {
  const { classes } = props;
  return (
    <Fragment>
      <ImageAvatar />
      <Typography variant={'subtitle1'}>group name</Typography>
    </Fragment>
  );
};

GroupListContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default GroupListContent;
