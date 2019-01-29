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
import Tooltip from '@material-ui/core/Tooltip';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';
import { withRouter } from 'react-router-dom';

const styles = {
  list: {
    width: 250
  }
};

const DrawerGroupList = props => {
  const {
    classes,
    user,
    group,
    openCreateGroupDialog,
    fetchGroup,
    history,
    toggleDrawerList,
    openDrawerList
  } = props;

  const changeGroup = groupId => {
    fetchGroup(groupId);
    history.push('/');
  };

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
            onClick={() => changeGroup(g._id)}
          >
            <ListItemIcon>
              {g.image ? (
                <ImageAvatar alt={g.name} image={`/avatarUploads/${g.image}`} />
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
      <Tooltip title="Change Group" aria-label="Change Group">
        <IconButton color="inherit" onClick={() => toggleDrawerList(true)}>
          <GroupIcon />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer
        anchor="right"
        open={openDrawerList}
        onClose={() => toggleDrawerList(false)}
        onOpen={() => toggleDrawerList(true)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => toggleDrawerList(false)}
          onKeyDown={() => toggleDrawerList(false)}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

DrawerGroupList.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  fetchGroup: PropTypes.func.isRequired,
  toggleDrawerList: PropTypes.func.isRequired,
  openDrawerList: PropTypes.bool.isRequired
};

const styled = withStyles(styles)(DrawerGroupList);
export default withRouter(styled);
