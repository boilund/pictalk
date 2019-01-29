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

class Header extends React.Component {
  state = {
    user: {
      _id: '',
      loggedIn: false,
      nickname: '',
      image: '',
      avatarColor: '',
      favorites: [],
      groups: [],
      photos: [],
      unreadPhotos: [],
      latestGroup: ''
    },
    group: {
      _id: '',
      name: '',
      image: '',
      members: [],
      posts: []
    },
    openDialog: false,
    openDrawerList: false
  };

  constructor(props) {
    super(props);
    this.openCreateGroupDialog = this.openCreateGroupDialog.bind(this);
    this.fetchGroup = this.fetchGroup.bind(this);
    this.toggleDrawerList = this.toggleDrawerList.bind(this);
  }

  handleClick = () => {
    if (user.loggedIn) {
      this.props.history.push('/');
    }
  };

  openCreateGroupDialog = boolean => {
    this.setState({ openDialog: boolean });
  };

  fetchGroup = groupId => {
    socket.emit('joinRoom', { room: groupId });

    axios
      .get(`/api/group/${groupId}`)
      .then(res => {
        if (res.data.success) {
          this.setState({ group: res.data.group });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleDrawerList = boolean => {
    this.setState({ openDrawerList: boolean });
  };

  render() {
    const { classes } = this.props;
    const { user, group, openDrawerList } = this.state;

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
                  openCreateGroupDialog={this.openCreateGroupDialog}
                  fetchGroup={this.fetchGroup}
                  toggleDrawerList={this.toggleDrawerList}
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
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
