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
    this.props.fetchUsers(this.props.user._id);
  }

  render() {
    const { classes, isFetching, user, group, posts } = this.props;

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
          <CreateGroupDialog />
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              <Grid item xs={12} md={9}>
                {posts.length ? (
                  posts.map((post, i) => <PostCard post={post} key={i} />)
                ) : (
                  <Typography>Please post something</Typography>
                )}
              </Grid>
              <SideMenu group={group} />
            </Grid>
          </div>
        </main>
        <BottomMenuBar />
      </React.Fragment>
    );
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  user: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isFetching: state.app.isFetching,
    user: state.user,
    group: state.group,
    openDialog: state.app.openDialog,
    posts: state.group.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: userId => dispatch(actions.fetchUsers(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Album));
