import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from './ImageAvatar';
import CreateGroup from './CreateGroup';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const GroupList = props => {
  const { classes } = props;
  return (
    <List dense className={classes.root}>
      <ListItem button>
        <ListItemAvatar>
          <ImageAvatar />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant={'subtitle1'}>group name</Typography>
        </ListItemText>
      </ListItem>
      <CreateGroup />
    </List>
  );
};

GroupList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupList);
