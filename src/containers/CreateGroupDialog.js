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
import UploadImage from '../components/UploadImage';
import GroupNameInput from '../components/GroupNameInput';
import SelectMembers from '../components/SelectMembers';

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

const initialState = {
  groupName: '',
  groupImage: '',
  groupMembers: []
};

class CreateGroupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    const { user, open, openCreateGroupDialog } = this.props;
    // Set user as group members at first
    this.handleGroupMembers([user]);
    // if user has no group, open the dialog to create a group
    if (open) {
      openCreateGroupDialog(true);
    }
  };

  handleGroupName = e => {
    this.setState({ groupName: e.target.value });
  };

  handleGroupMembers = members => {
    this.setState({ groupMembers: members });
  };

  handleGroupImage = e => {};

  createGroup = () => {
    const { openCreateGroupDialog, changeGroup } = this.props;
    const { groupName, groupImage, groupMembers } = this.state;

    const milliseconds = Date.now();
    axios
      .post(`/api/creategroup`, {
        groupname: groupName,
        members: groupMembers,
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
      openCreateGroupDialog,
      group,
      candidates,
      isFetching
    } = this.props;
    const { groupName, groupImage, groupMembers } = this.state;

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
            <UploadImage setGroupImage={this.handleGroupImage} />
            <GroupNameInput
              groupname={groupName}
              handleGroupName={this.handleGroupName}
            />
          </div>
          <SelectMembers
            isFetching={isFetching}
            user={user}
            members={groupMembers}
            candidates={candidates}
            handleGroupMembers={this.handleGroupMembers}
          />
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
  group: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  candidates: PropTypes.array.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
  open: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    user: state.user,
    group: state.group,
    openDialog: state.app.openDialog,
    isFetching: state.app.isFetching,
    candidates: state.app.candidates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateGroupDialog: boolean =>
      dispatch(actions.openCreateGroupDialog(boolean)),
    changeGroup: groupId => dispatch(actions.changeGroup(groupId))
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateGroupDialog));

const routed = withRouter(connected);
export default withMobileDialog()(routed);
