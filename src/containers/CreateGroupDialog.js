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

const defaultImg = '/images/default-group.svg';

const styles = () => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const initialState = {
  file: defaultImg,
  formData: {},
  groupName: '',
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

  handleGroupImage = e => {
    // for preview
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });

    // make formData to save in database
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.setState({ formData });
  };

  handleGroupName = e => {
    this.setState({ groupName: e.target.value });
  };

  handleGroupMembers = members => {
    this.setState({ groupMembers: members });
  };

  createGroup = async () => {
    const { openCreateGroupDialog, changeGroup } = this.props;
    const { formData, groupName, groupMembers } = this.state;
    const milliseconds = Date.now();

    formData.append('groupname', groupName);
    groupMembers.forEach(member => {
      formData.append('members', member._id);
    });
    formData.append('latestUpdateTime', milliseconds);
    this.setState({ formData });

    try {
      const response = await axios.post(`/api/create-group`, formData);
      console.log(response);
      if (response.data.success) {
        changeGroup(response.data.groupId);
        openCreateGroupDialog(false);
      }
    } catch (error) {
      console.error(new Error(error));
    }
  };

  render() {
    const {
      classes,
      fullScreen,
      user,
      openDialog,
      openCreateGroupDialog,
      candidates,
      isFetching
    } = this.props;
    const { file, groupName, groupImage, groupMembers } = this.state;

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
            <UploadImage file={file} handleFileChange={this.handleGroupImage} />
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
  isFetching: PropTypes.bool,
  candidates: PropTypes.array.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
  open: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    user: state.user,
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
