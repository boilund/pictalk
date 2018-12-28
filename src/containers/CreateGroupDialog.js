import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import GroupImageName from './GroupImageName';
import SelectMembers from './SelectMembers';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CreateGroupDialog extends React.Component {
  state = {
    open: false
  };

  componentDidMount = () => {
    this.setState({
      open: this.props.openDialog
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createGroup = () => {
    const { user, groupimage: image, groupname, members } = this.props;
    // TODO: if image is not defined, use default image
    axios
      .post(`/api/${user._id}/creategroup`, {
        // image,
        groupname,
        members
      })
      .then(res => {
        console.log(res);
        if (res.success) {
          this.setState({ open: false });
        }
      })
      .catch(err => {
        console.error(new Error(err));
      });
  };

  render() {
    const { fullScreen, openDialog, user } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Make new group</DialogTitle>
        <DialogContent>
          <GroupImageName user={user} />
          <SelectMembers user={user} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} autoFocus>
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
  fullScreen: PropTypes.bool.isRequired,
  openDialog: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  groupname: PropTypes.string.isRequired,
  // groupimage: PropTypes.object, //TODO: warning
  members: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    groupname: state.group.name,
    groupimage: state.group.image,
    members: state.group.members
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupDialog);

const routed = withRouter(connected);
export default withMobileDialog()(routed);
