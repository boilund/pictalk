import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';

const styles = {
  list: {
    width: 250
  }
};

class DrawerGroupList extends React.Component {
  state = {
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const {
      classes,
      user,
      group,
      openCreateGroupDialog,
      fetchGroup
    } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => openCreateGroupDialog(true)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Create Group</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          {user.groups.map((g, index) => (
            <ListItem
              button
              key={index}
              selected={g._id === group._id}
              onClick={() => fetchGroup(g._id)}
            >
              <ListItemIcon>
                {g.image ? (
                  <ImageAvatar
                    alt={g.name}
                    image={`/avatarUploads/${g.image}`}
                  />
                ) : (
                  <LetterAvatar nickname={g.name} color={'default'} />
                )}
              </ListItemIcon>
              <ListItemText primary={g.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <IconButton color="inherit" onClick={this.toggleDrawer('right', true)}>
          <GroupIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

DrawerGroupList.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  fetchGroup: PropTypes.func.isRequired
  // unreadGroup: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(DrawerGroupList);
