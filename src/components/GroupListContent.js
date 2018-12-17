import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from './ImageAvatar';

const GroupListContent = props => {
  return (
    <Fragment>
      <ImageAvatar />
      <Typography variant={'subtitle1'}>group name</Typography>
    </Fragment>
  );
};

export default GroupListContent;
