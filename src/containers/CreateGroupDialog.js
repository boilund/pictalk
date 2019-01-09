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
import UploadImage from './UploadImage';
import GroupNameInput from './GroupNameInput';
import SelectMembers from './SelectMembers';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = () => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

class CreateGroupDialog extends React.Component {
  componentDidMount = () => {
    const { setGroupMembers, user, open, openCreateGroupDialog } = this.props;
    // Set user as group members at first
    setGroupMembers([user]);
    // if user has no group, open the dialog to create a group
    if (open) {
      openCreateGroupDialog(true);
    }
  };

  createGroup = () => {
    const {
      user,
      groupimage,
      groupname,
      members,
      openCreateGroupDialog
    } = this.props;

    const milliseconds = Date.now();
    axios
      .post(`/api/${user._id}/creategroup`, {
        groupname,
        members,
        latestUpdateTime: milliseconds
      })
      .then(res => {
        console.log(res);
        if (res.success) {
          console.log('image', groupimage.get('id'));
          // TODO: if image is not defined, use default image
          if (groupimage) {
            axios
              .post('/api/upload', {
                groupimage
              })
              .then(res => {
                console.log(res.path);
                openCreateGroupDialog(false);
                // this.props.updateProfile("image", res.path);
              });
          }
        }
      })
      .catch(err => {
        console.error(new Error(err));
      });
  };

  render() {
    const {
      classes,
      fullScreen,
      user,
      openDialog,
      openCreateGroupDialog
    } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Make new group</DialogTitle>
        <DialogContent>
          <div className={classes.row}>
            <UploadImage />
            <GroupNameInput user={user} />
          </div>
          <SelectMembers user={user} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => openCreateGroupDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button onClick={() => this.createGroup()} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateGroupDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  openDialog: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  groupname: PropTypes.string.isRequired,
  // groupimage: PropTypes.object, //TODO: warning
  members: PropTypes.array.isRequired,
  setGroupMembers: PropTypes.func.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  open: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    user: state.user,
    groupname: state.group.name,
    groupimage: state.group.image,
    members: state.group.members,
    openDialog: state.app.openDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroupMembers: members => dispatch(actions.setGroupMembers(members)),
    openCreateGroupDialog: boolean =>
      dispatch(actions.openCreateGroupDialog(boolean))
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateGroupDialog));

const routed = withRouter(connected);
export default withMobileDialog()(routed);
