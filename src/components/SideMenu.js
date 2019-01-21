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
import AddIcon from '@material-ui/icons/Add';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PersonOutline from '@material-ui/icons/PersonOutline';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';

const styles = theme => ({
  sidemenu: {
    position: 'fixed'
  },
  groupImage: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3
  },
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
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  noUnderLine: {
    textDecoration: 'none'
  }
});

const SideMenu = props => {
  const { classes, group } = props;
  return (
    <Hidden only={['xs', 'sm']}>
      <Grid item md={3} lg={3}>
        <aside className={classes.sidemenu}>
          <div className={classes.currentGroup}>
            <div className={classes.groupImage}>
              {group.image ? (
                <ImageAvatar
                  alt={group.name}
                  image={`/avatarUploads/${group.image}`}
                />
              ) : (
                <LetterAvatar nickname={group.name} color={'default'} />
              )}
            </div>
            <Typography component="h1" variant="h6">
              {group.name}
            </Typography>
          </div>
          <Paper position="fixed">
            <MenuList>
              <Link to="/post" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Add photo" />
                </MenuItem>
              </Link>
              <Link to="/comment" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <ChatBubbleOutline />
                  </ListItemIcon>
                  <ListItemText inset primary="Comment" />
                </MenuItem>
              </Link>
              <Link to="/favorite" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <FavoriteBorder />
                  </ListItemIcon>
                  <ListItemText inset primary="Favorite" />
                </MenuItem>
              </Link>
              <Link to="/myphoto" className={classes.noUnderLine}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon className={classes.icon}>
                    <PersonOutline />
                  </ListItemIcon>
                  <ListItemText inset primary="My photo" />
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
  group: PropTypes.object.isRequired
};

export default withStyles(styles)(SideMenu);
