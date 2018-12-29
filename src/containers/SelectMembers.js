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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LetterAvatar from '../components/LetterAvatar';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
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
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
      </div>
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