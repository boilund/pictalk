import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ToggleMenu from './ToggleMenu';
import AddIcon from '@material-ui/icons/Add';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PersonOutline from '@material-ui/icons/PersonOutline';

const styles = theme => ({
  currentGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px 0`
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  noUnderLine: {
    textDecoration: 'none'
  }
});

const SideMenu = props => {
  const { classes, user, group, openCreateGroupDialog, fetchGroup } = props;
  return (
    <Hidden only={['xs', 'sm']}>
      <Grid item md={3} lg={3}>
        <aside>
          <div className={classes.currentGroup}>
            <ToggleMenu
              user={user}
              group={group}
              openCreateGroupDialog={openCreateGroupDialog}
              fetchGroup={fetchGroup}
            />
            <Typography component="h1" variant="h6">
              {group.name}
            </Typography>
          </div>
          <Paper>
            <MenuList>
              <Link to="/post" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Add photo"
                  />
                </MenuItem>
              </Link>
              <Link to="/comment" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <ChatBubbleOutline />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Comment"
                  />
                </MenuItem>
              </Link>
              <Link to="/favorite" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <FavoriteBorder />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Favorite"
                  />
                </MenuItem>
              </Link>
              <Link to="/myphoto" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <PersonOutline />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="My photo"
                  />
                </MenuItem>
              </Link>
            </MenuList>
          </Paper>
        </aside>
      </Grid>
    </Hidden>
  );
};

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  fetchGroup: PropTypes.func.isRequired
};

export default withStyles(styles)(SideMenu);
