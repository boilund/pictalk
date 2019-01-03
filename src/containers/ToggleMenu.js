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
    const { classes, user, group } = this.props;
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
            <ImageAvatar image={group.image} alt={group.name} />
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
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    group: state.group
  };
};

const connected = connect(
  mapStateToProps,
  null
)(withStyles(styles)(ToggleMenu));

export default withRouter(connected);
