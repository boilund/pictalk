import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  addCircle: {
    fontSize: '40px',
    marginLeft: theme.spacing.unit
  }
});

const CreateGroup = props => {
  const { classes } = props;
  return (
    <Fragment>
      <ListItem button>
        <ListItemIcon>
          <AddCircleOutline className={classes.addCircle} color="action" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant={'subtitle1'}>Create group</Typography>
        </ListItemText>
      </ListItem>
    </Fragment>
  );
};

CreateGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateGroup);
