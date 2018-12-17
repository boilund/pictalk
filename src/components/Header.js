import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1
  }
};

const Header = props => {
  const { classes } = props;

  return (
    <header className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            align="inherit"
            color="textPrimary"
            gutterBottom
          >
            Talkalbum
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
