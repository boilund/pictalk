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
    const { classes, isFetching, user, candidates } = this.props;

    if (isFetching) {
      return <Loading />;
    }
    return (
      <List dense className={classes.root}>
        {candidates.map((candidate, i) => {
          return (
            <ListItem key={i} button>
              <ListItemAvatar>
                <ImageAvatar />
              </ListItemAvatar>
              <ListItemText primary={candidate.nickname} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(candidate)}
                  checked={this.state.checked.indexOf(candidate) !== -1}
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
  user: PropTypes.object.isRequired,
  candidates: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    isFetching: state.app.isFetching,
    user: state.user,
    candidates: state.app.candidates
  };
};

const connected = connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserList));

export default withRouter(connected);
