import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageAvatar from './ImageAvatar';
import CreateGroupContent from './CreateGroupContent';
import GroupListContent from './GroupListContent';

// temporary
const options = [1, 2, 3, 4, 5];
const ITEM_HEIGHT = 48;

const styles = theme => ({
  avatarButton: {
    padding: 0
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
    const { classes } = this.props;
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
          <ImageAvatar />
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
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={this.handleClose}
            >
              <GroupListContent />
            </MenuItem>
          ))}
          <MenuItem>
            <CreateGroupContent />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ToggleMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToggleMenu);
