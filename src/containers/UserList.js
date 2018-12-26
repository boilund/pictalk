import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ImageAvatar from '../components/ImageAvatar';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class UserList extends React.Component {
  state = {
    checked: [1]
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes, isFetching, users } = this.props;

    if (isFetching) {
      return <Loading />;
    }
    return (
      <List dense className={classes.root}>
        {users.map((user, i) => {
          return (
            <ListItem key={i} button>
              <ListItemAvatar>
                <ImageAvatar />
              </ListItemAvatar>
              <ListItemText primary={user.nickname} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(user)}
                  checked={this.state.checked.indexOf(user) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  users: PropTypes.array
};

const mapStateToProps = state => {
  return {
    isFetching: state.app.isFetching,
    users: state.app.users
  };
};

const connected = connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserList));

export default withRouter(connected);
