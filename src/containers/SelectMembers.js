import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ImageAvatar from '../components/ImageAvatar';
import SeletedMembers from '../components/SeletedMembers';
import SearchUserForm from '../components/SearchUserForm';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LetterAvatar from '../components/LetterAvatar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const SelectMembers = props => {
  const {
    classes,
    isFetching,
    user,
    candidates,
    members,
    setGroupMembers
  } = props;

  const handleCheckboxToggle = value => {
    const { members: checked } = props;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setGroupMembers(newChecked);
  };

  if (isFetching) {
    return <Loading />;
  }
  return (
    <Fragment>
      <SeletedMembers checked={members} />
      <SearchUserForm />
      <List dense className={classes.root}>
        {candidates.map((candidate, i) => {
          return (
            <ListItem key={i} button>
              <ListItemAvatar>
                {candidate.image ? (
                  <ImageAvatar key={i} image={user.image} alt={user.nickname} />
                ) : (
                  <LetterAvatar key={i} nickname={candidate.nickname} />
                )}
              </ListItemAvatar>
              <ListItemText primary={candidate.nickname} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={() => handleCheckboxToggle(candidate)}
                  checked={members.indexOf(candidate) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
};

SelectMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  user: PropTypes.object.isRequired,
  candidates: PropTypes.array.isRequired,
  setGroupMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isFetching: state.app.isFetching,
    user: state.user,
    candidates: state.app.candidates,
    members: state.group.members
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroupMembers: members => dispatch(actions.setGroupMembers(members))
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SelectMembers));

export default withRouter(connected);
