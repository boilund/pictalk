import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import DrawerGroupList from '../components/DrawerGroupList';
import ImageAvatar from '../components/ImageAvatar';
import LetterAvatar from '../components/LetterAvatar';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  noLinkColor: {
    color: 'inherit',
    marginLeft: theme.spacing.unit
  },
  userAvatar: {
    marginLeft: theme.spacing.unit
  }
});

const Header = props => {
  const { classes, user, group, openCreateGroupDialog, fetchGroup } = props;

  const handleClick = () => {
    if (user.loggedIn) {
      props.history.push('/');
    }
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
          {/* show this icons when user login */}
          {user.loggedIn && (
            <Fragment>
              <Link to="/settings" className={classes.noLinkColor}>
                <IconButton color="inherit">
                  <Settings />
                </IconButton>
              </Link>
              <DrawerGroupList
                user={user}
                group={group}
                openCreateGroupDialog={openCreateGroupDialog}
                fetchGroup={fetchGroup}
              />
              <div className={classes.userAvatar}>
                {user.image ? (
                  <ImageAvatar
                    alt={user.nickname}
                    image={`/avatarUploads/${user.image}`}
                  />
                ) : (
                  <LetterAvatar
                    nickname={user.nickname}
                    color={user.avatarColor}
                  />
                )}
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  group: PropTypes.object.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  fetchGroup: PropTypes.func.isRequired,
  unreadGroup: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => {
  return {
    user: state.user,
    group: state.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateGroupDialog: boolean =>
      dispatch(actions.openCreateGroupDialog(boolean)),
    fetchGroup: groupId => dispatch(actions.fetchGroup(groupId))
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));

export default withRouter(connected);
