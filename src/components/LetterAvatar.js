import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';

const styles = {
  default: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  pink: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500]
  },
  green: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500]
  }
};

const alternativeColor = [
  'default',
  'orangeAvatar',
  'purpleAvatar',
  'pink',
  'green'
];

const LetterAvatar = props => {
  const { classes, nickname } = props;
  // pick random index
  const index = Math.floor(Math.random() * Math.floor(4));
  const color = alternativeColor[index];
  // make initialLetter
  const initialLetter = nickname.substring(0, 1);

  return <Avatar className={classes[color]}>{initialLetter}</Avatar>;
};

LetterAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  nickname: PropTypes.string.isRequired
};

export default withStyles(styles)(LetterAvatar);