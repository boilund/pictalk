import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import DrawerGroupList from '../components/DrawerGroupList';
import ImageAvatar from '../components/ImageAvatar';
import LetterAvatar from '../components/LetterAvatar';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 5
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
  const {
    classes,
    user,
    group,
    openCreateGroupDialog,
    fetchGroup,
    toggleDrawerList,
    openDrawerList
  } = props;

  const handleClick = () => {
    if (user.loggedIn) {
      props.history.push('/');
    }
  };

  return (
    <header className={classes.root}>
      <AppBar position="fixed" color="default">
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
                <Tooltip title="Settings" aria-label="Settings">
                  <IconButton color="inherit">
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Link>

              <DrawerGroupList
                user={user}
                group={group}
                openCreateGroupDialog={openCreateGroupDialog}
                fetchGroup={fetchGroup}
                toggleDrawerList={toggleDrawerList}
                openDrawerList={openDrawerList}
              />

              <Tooltip title={user.nickname} aria-label={user.nickname}>
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
              </Tooltip>
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
  toggleDrawerList: PropTypes.func.isRequired,
  openDrawerList: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    group: state.group,
    openDrawerList: state.app.openDrawerList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateGroupDialog: boolean =>
      dispatch(actions.openCreateGroupDialog(boolean)),
    fetchGroup: groupId => dispatch(actions.fetchGroup(groupId)),
    toggleDrawerList: bool => dispatch(actions.toggleDrawerList(bool))
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));

export default withRouter(connected);
