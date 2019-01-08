import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Settings from '@material-ui/icons/Settings';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  noLinkColor: {
    color: 'inherit'
  }
};

const Header = props => {
  const { classes, user } = props;

  const handleClick = () => {
    props.history.push('/');
  };

  return (
    <header className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            align="inherit"
            color="textPrimary"
            gutterBottom
            className={classes.grow}
            onClick={() => handleClick()}
          >
            PicTalk
          </Typography>
          {/* show this icon when user login */}
          {user.nickname && (
            <Link to="/settings" className={classes.noLinkColor}>
              <Settings />
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const connected = connect(
  mapStateToProps,
  null
)(withStyles(styles)(Header));

export default withRouter(connected);
