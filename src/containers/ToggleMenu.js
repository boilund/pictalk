import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageAvatar from '../components/ImageAvatar';
import LetterAvatar from '../components/LetterAvatar';

import CreateGroupContent from '../components/CreateGroupContent';
import GroupListContent from '../components/GroupListContent';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  avatarButton: {
    padding: 0,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class ToggleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      user,
      group,
      openCreateGroupDialog,
      changeGroup
    } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.avatarButton}
        >
          {group.image ? (
            <ImageAvatar alt={group.name} />
          ) : (
            <LetterAvatar nickname={group.name} color={'default'} />
          )}
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {user.groups.map((g, index) => (
            <MenuItem
              key={index}
              selected={g.name === group.name}
              onClick={() => changeGroup(g)}
            >
              <GroupListContent group={g} />
            </MenuItem>
          ))}
          <MenuItem onClick={() => openCreateGroupDialog(true)}>
            <CreateGroupContent />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ToggleMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    group: state.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateGroupDialog: boolean =>
      dispatch(actions.openCreateGroupDialog(boolean)),
    changeGroup: groupObj => dispatch(actions.changeGroup(groupObj))
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ToggleMenu));

export default withRouter(connected);
