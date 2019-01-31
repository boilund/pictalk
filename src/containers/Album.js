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
  componentDidMount() {
    const {
      updateUser,
      fetchUsers,
      fetchGroup,
      fetchUnreadPhotos,
      group,
      user
    } = this.props;
    // fetch data
    updateUser(user._id);
    fetchUsers(user._id);
    if (user.groups.length) {
      fetchGroup(group._id || user.latestGroup);
    }
    fetchUnreadPhotos();

    if (user.loggedIn) {
      socket.off('comment');
      socket.on('comment', comment => {
        fetchGroup(comment.room);
      });
    }
  }

  componentWillUnmount() {
    const { user, updateFavoritePhotos } = this.props;
    updateFavoritePhotos(user.favorites);
  }

  render() {
    const { classes, isFetching, user, group, handleFavorite } = this.props;

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
                      handleFavorite={handleFavorite}
                      key={i}
                    />
                  ))
                ) : (
                  <Typography>Let's post something!</Typography>
                )}
              </Grid>
              <SideMenu user={user} group={group} />
            </Grid>
          </div>
        </main>
        <BottomMenuBar user={user} group={group} />
      </React.Fragment>
    );
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchGroup: PropTypes.func.isRequired,
  fetchUnreadPhotos: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  updateFavoritePhotos: PropTypes.func.isRequired
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
    updateUser: userId => dispatch(actions.updateUser(userId)),
    fetchUsers: userId => dispatch(actions.fetchUsers(userId)),
    fetchGroup: groupId => dispatch(actions.fetchGroup(groupId)),
    fetchUnreadPhotos: () => dispatch(actions.fetchUnreadPhotos()),
    handleFavorite: post => dispatch(actions.handleFavorite(post)),
    updateFavoritePhotos: favorites =>
      dispatch(actions.updateFavoritePhotos(favorites))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Album));
