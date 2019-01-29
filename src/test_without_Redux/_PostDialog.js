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
import { withRouter } from 'react-router-dom';

const PostDialog = props => {
  const {
    fullScreen,
    open,
    post,
    user,
    handleFavorite,
    closePhotoDialog,
    fetchGroup,
    history
  } = props;

  const goToTheGroup = () => {
    fetchGroup(post.postedGroup._id);
    // need to wait for a while
    setTimeout(() => history.push('/'), 500);
  };

  return (
    <Dialog fullScreen={fullScreen} fullWidth={true} maxWidth="md" open={open}>
      <DialogContent>
        <PostCard post={post} user={user} handleFavorite={handleFavorite} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closePhotoDialog}>
          Close
        </Button>
        <Button color="primary" autoFocus onClick={() => goToTheGroup()}>
          Go to this group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PostDialog.propTypes = {
  history: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  closePhotoDialog: PropTypes.func.isRequired,
  fetchGroup: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired
};

const routed = withRouter(PostDialog);
export default withMobileDialog()(routed);
