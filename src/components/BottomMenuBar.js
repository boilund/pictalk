import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PersonOutline from '@material-ui/icons/PersonOutline';
import ToggleMenu from '../containers/ToggleMenu';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 3
  },
  noLinkColor: {
    color: 'inherit'
  }
});

const BottomMenuBar = props => {
  const { classes } = props;
  return (
    <Hidden only={['md', 'lg']}>
      <footer className={classes.footer}>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div aria-label="Open drawer">
              <ToggleMenu />
            </div>
            <Link to="/comment" className={classes.noLinkColor}>
              <IconButton color="inherit">
                <ChatBubbleOutline />
              </IconButton>
            </Link>
            <div>
              <Fab
                color="secondary"
                aria-label="Add"
                className={classes.fabButton}
              >
                <Link to="/post" className={classes.noLinkColor}>
                  <AddIcon />
                </Link>
              </Fab>
            </div>
            <Link to="/favorite" className={classes.noLinkColor}>
              <IconButton color="inherit">
                <FavoriteBorder />
              </IconButton>
            </Link>
            <Link to="/myphoto" className={classes.noLinkColor}>
              <IconButton color="inherit">
                <PersonOutline />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </footer>
    </Hidden>
  );
};

BottomMenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomMenuBar);
