import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';
import CreateGroupContent from './CreateGroupContent';
import GroupListContent from './GroupListContent';

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

  changeGroup = groupId => {
    this.props.changeGroup(groupId);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, user, group, openCreateGroupDialog } = this.props;
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
            <ImageAvatar
              alt={group.name}
              image={`/avatarUploads/${group.image}`}
            />
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
              onClick={() => this.changeGroup(g._id)}
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

export default withStyles(styles)(ToggleMenu);
