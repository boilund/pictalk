import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import BottomMenuBar from '../components/BottomMenuBar';
import SideMenu from '../components/SideMenu';
import CreateGroupDialog from './CreateGroupDialog';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import axios from 'axios';
import { socket } from '../components/App';

import * as actions from '../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  }
});

class Album extends React.Component {
  state = { unreadPost: '', unreadCount: 0 };

  componentDidMount() {
    const { fetchUsers, changeGroup, group, user } = this.props;

    // fetch data
    fetchUsers(user._id);
    changeGroup(group._id);

    if (user.loggedIn) {
      socket.off('comment');
      socket.on('comment', comment => {
        changeGroup(comment.room);
        this.setState({
          unreadPost: comment.post,
          unreadCount: this.state.unreadCount + 1
        });
      });
    }
  }

  resetUnreadCount() {
    this.setState({ unreadPost: '', unreadCount: 0 });
  }

  render() {
    const {
      classes,
      isFetching,
      user,
      group,
      openCreateGroupDialog,
      changeGroup
    } = this.props;
    const { unreadPost, unreadCount } = this.state;

    if (isFetching) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Header />
        <main>
          {/* if user desn't have any group, show this dialog */}
          {user.groups.length ? (
            <CreateGroupDialog open={false} />
          ) : (
            <CreateGroupDialog open={true} />
          )}
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              <Grid item xs={12} md={9}>
                {group.posts.length ? (
                  group.posts.map((post, i) => (
                    <PostCard
                      post={post}
                      user={user}
                      unreadCount={unreadPost === post._id ? unreadCount : 0}
                      resetUnreadCount={() => this.resetUnreadCount()}
                      key={i}
                    />
                  ))
                ) : (
                  <Typography>Let's post something!</Typography>
                )}
              </Grid>
              <SideMenu
                user={user}
                group={group}
                openCreateGroupDialog={openCreateGroupDialog}
                changeGroup={changeGroup}
              />
            </Grid>
          </div>
        </main>
        <BottomMenuBar
          user={user}
          group={group}
          openCreateGroupDialog={openCreateGroupDialog}
          changeGroup={changeGroup}
        />
      </React.Fragment>
    );
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  openCreateGroupDialog: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isFetching: state.app.isFetching,
    user: state.user,
    group: state.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: userId => dispatch(actions.fetchUsers(userId)),
    openCreateGroupDialog: boolean =>
      dispatch(actions.openCreateGroupDialog(boolean)),
    changeGroup: groupId => dispatch(actions.changeGroup(groupId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Album));
