import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PostCard from './PostCard';

const PostDialog = props => {
  const { fullScreen, open, post, user, closePhotoDialog } = props;

  return (
    <Dialog fullScreen={fullScreen} fullWidth={true} maxWidth="md" open={open}>
      <DialogContent>
        <PostCard post={post} user={user} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closePhotoDialog}>
          Close
        </Button>
        <Button color="primary" autoFocus>
          Go to this group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PostDialog.propTypes = {
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  closePhotoDialog: PropTypes.func.isRequired
};

export default withMobileDialog()(PostDialog);
