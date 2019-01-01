import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageAvatar from '../components/ImageAvatar';
import CreateGroupContent from '../components/CreateGroupContent';
import GroupListContent from '../components/GroupListContent';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    const { classes, user } = this.props;
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
          {user.groups.map((group, index) => (
            <MenuItem
              key={index}
              selected={group === 'Pyxis'}
              onClick={this.handleClose}
            >
              <GroupListContent group={group} />
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
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const connected = connect(
  mapStateToProps,
  null
)(withStyles(styles)(ToggleMenu));

export default withRouter(connected);
