import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import GroupImageName from './GroupImageName';
import SeletedMembers from './SeletedMembers';
import SearchUserForm from './SearchUserForm';
import UserList from '../containers/UserList';

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

  render() {
    const { fullScreen, openDialog } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Make new group</DialogTitle>
        <DialogContent>
          <GroupImageName />
          <SeletedMembers />
          <SearchUserForm />
          <UserList />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateGroupDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  openDialog: PropTypes.bool.isRequired
};

export default withMobileDialog()(CreateGroupDialog);
